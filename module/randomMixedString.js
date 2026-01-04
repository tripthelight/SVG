// ESModule 환경 기준
// - 길이 n의 랜덤 문자열 생성
// - 영문소문자/대문자/숫자/특수문자 "모두 최소 1개씩" 포함 보장
// - crypto.getRandomValues 사용(가능하면). 없으면 Math.random 폴백.
//
// 사용: const s = randomMixedString(16);

export function randomMixedString(n) {
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error("n은 1 이상의 정수여야 합니다.");
  }

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "!@#$%^&*()-_=+[]{};:,.<>?/|~";
  const groups = [lower, upper, digits, special];

  // 4종류를 모두 넣으려면 최소 길이 4는 필요
  if (n < groups.length) {
    throw new Error("소문자/대문자/숫자/특수문자를 모두 포함하려면 n은 최소 4여야 합니다.");
  }

  const getCrypto = () => {
    // 브라우저: globalThis.crypto
    // Node(>=15 정도): globalThis.crypto (또는 require('crypto').webcrypto)
    // 여기서는 globalThis.crypto만 사용하고 없으면 폴백
    return globalThis.crypto && typeof globalThis.crypto.getRandomValues === "function"
      ? globalThis.crypto
      : null;
  };

  const cryptoObj = getCrypto();

  const randomInt = (maxExclusive) => {
    if (maxExclusive <= 0) throw new Error("maxExclusive must be > 0");

    // 보안 난수 사용 (가능하면)
    if (cryptoObj) {
      // 편향(bias) 제거를 위해 rejection sampling
      const range = maxExclusive;
      const maxUint32 = 0xffffffff;
      const limit = Math.floor((maxUint32 + 1) / range) * range; // range의 배수
      const buf = new Uint32Array(1);

      while (true) {
        cryptoObj.getRandomValues(buf);
        const x = buf[0];
        if (x < limit) return x % range;
      }
    }

    // 폴백
    return Math.floor(Math.random() * maxExclusive);
  };

  const pick = (str) => str[randomInt(str.length)];

  // 1) 각 그룹에서 최소 1개씩 뽑기
  const chars = groups.map(pick);

  // 2) 나머지(n-4)는 전체 풀에서 랜덤으로 채우기
  const all = groups.join("");
  for (let i = chars.length; i < n; i++) {
    chars.push(pick(all));
  }

  // 3) 셔플 (Fisher–Yates)
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}