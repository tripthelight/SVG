// x, y (Number 또는 BigInt)를 받아 [min, max] 구간에서 랜덤 정수 1개를 리턴합니다. (양끝 포함)
//
// - 브라우저: crypto.getRandomValues 사용
// - crypto가 없으면: 비트연산 기반 xorshift+mix로 fallback (품질은 낮음)

const U64_MASK = (1n << 64n) - 1n;

// splitmix64 계열 비트 믹서(복잡하게 섞기)
function mix64(z) {
  z = (z + 0x9e3779b97f4a7c15n) & U64_MASK;
  z = (z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n & U64_MASK;
  z = (z ^ (z >> 27n)) * 0x94d049bb133111ebn & U64_MASK;
  return (z ^ (z >> 31n)) & U64_MASK;
}

function bytesToBigInt(u8) {
  let r = 0n;
  for (let i = 0; i < u8.length; i++) r = (r << 8n) | BigInt(u8[i]);
  return r;
}

function bitLength(n) {
  // n > 0
  let bits = 0n;
  while (n >> bits) bits++;
  return bits; // BigInt
}

let fallbackState32 = 0x12345678 | 0;
function xorshift32() {
  // 32-bit xorshift (fallback용)
  let x = fallbackState32 | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  fallbackState32 = x | 0;
  return x >>> 0; // uint32
}

function randomU64() {
  // 가능한 경우 crypto로 64비트 생성 후, 일부러 비트 믹싱까지 추가
  const c = globalThis.crypto;
  if (c?.getRandomValues) {
    const u8 = new Uint8Array(8);
    c.getRandomValues(u8);
    let r = bytesToBigInt(u8);         // 0..2^64-1
    // "복잡하게" 한 번 더 섞기 (사실 crypto만으로도 충분하지만 요청 반영)
    r = mix64(r ^ BigInt(u8[0]) << 56n ^ BigInt(u8[7]));
    return r & U64_MASK;
  }

  // fallback: 32비트 2번 뽑아 64로 합친 뒤 mix
  const a = BigInt(xorshift32());
  const b = BigInt(xorshift32());
  const seed = ((a << 32n) | b) ^ BigInt(Date.now()) ^ (BigInt((performance?.now?.() ?? 0) | 0) << 32n);
  return mix64(seed) & U64_MASK;
}

function randomBelow(range) {
  // 0 <= result < range (range > 0)
  // rejection sampling으로 modulo bias 제거
  const bits = bitLength(range - 1n);           // 필요한 비트 수
  const k = bits === 0n ? 1n : bits;            // 최소 1비트
  const bytes = Number((k + 7n) >> 3n);         // ceil(k/8)
  const mask = (1n << k) - 1n;
  const limit = (1n << k) - ((1n << k) % range);

  while (true) {
    // k비트 랜덤 만들기(64비트를 여러 번 섞어서 확장)
    let r = 0n;
    let need = bytes;

    while (need > 0) {
      const chunk = randomU64();                // 64비트
      // chunk를 또 섞어서 붙이기 (복잡도↑)
      const c1 = mix64(chunk ^ (r << 1n)) & U64_MASK;
      r = ((r << 64n) | c1) & ((1n << (BigInt(bytes) * 8n)) - 1n);
      need -= 8;
    }

    r &= mask;                                  // k비트로 자름
    // bias 제거
    if (r < limit) return r % range;
  }
}

export function randomIntBetween(x, y) {
  const xIsBig = typeof x === "bigint";
  const yIsBig = typeof y === "bigint";

  const xb = BigInt(x);
  const yb = BigInt(y);

  const lo = xb < yb ? xb : yb;
  const hi = xb < yb ? yb : xb;

  const range = hi - lo + 1n;                   // 양끝 포함
  if (range <= 0n) return lo;                   // 방어 (사실상 불가능)

  const n = lo + randomBelow(range);

  // 입력이 둘 다 Number였고 안전 정수 범위면 Number로 반환
  if (!xIsBig && !yIsBig && n <= BigInt(Number.MAX_SAFE_INTEGER) && n >= BigInt(Number.MIN_SAFE_INTEGER)) {
    return Number(n);
  }
  return n; // BigInt
}