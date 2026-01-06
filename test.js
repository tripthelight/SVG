const TOKENS = [ // 0 부터 9의 순서로 정렬해서 만들것
  "8917b4cc", // 1
  "b3534d0d", // 2
  "4140d33e", // 3
  "eb5f99e4", // 4
  "29b7d578", // 5
  "bd416fa7", // 6
  "37326fcd", // 7
  "a5670011", // 8
  "d0cd190d", // 9
  "96319eef", // 10
];

// compare 함수에서 사용되는 BLOB 키 생성
function makeBLOB() {
  const SEP = "\u001f";
  const SECRET = ["@ba", "ttletwo", ":cmp", ":v", "1"].join("");
  
  const seedFrom = (s) => {
    let x = 0;
    for (let i = 0; i < s.length; i++) x = (((x << 5) - x) + s.charCodeAt(i)) | 0;
    return x >>> 0;
  };
  
  const xorshift32 = (x) => {
    x ^= (x << 13);
    x ^= (x >>> 17);
    x ^= (x << 5);
    return x >>> 0;
  };
  
  const u8ToB64 = (u8) => {
    // Uint8Array -> base64 (브라우저)
    let bin = "";
    const chunk = 0x8000; // call stack 방지용 chunk
    for (let i = 0; i < u8.length; i += chunk) {
      bin += String.fromCharCode(...u8.subarray(i, i + chunk));
    }
    return btoa(bin);
  };
  
  const encodeTokensToBlob = (tokens, secret) => {
    const payload = tokens.join(SEP);
  
    // payload -> Uint8Array
    const data = new TextEncoder().encode(payload);
  
    let x = seedFrom(secret);
    const ks = new Uint8Array(4);
  
    for (let i = 0; i < data.length; i++) {
      if ((i & 3) === 0) {
        x = xorshift32(x);
        ks[0] = (x >>> 0) & 255;
        ks[1] = (x >>> 8) & 255;
        ks[2] = (x >>> 16) & 255;
        ks[3] = (x >>> 24) & 255;
      }
      data[i] ^= ks[i & 3];
    }
  
    return u8ToB64(data);
  };
  
  // const BLOB = encodeTokensToBlob(TOKENS, SECRET);
  // console.log(BLOB);

  return encodeTokensToBlob(TOKENS, SECRET);;
};

// -------------------------------------------------

const compare = (() => {
  // 숫자 리터럴(0,1,2...)도 직접 쓰기 싫으면 이런 방식으로 만들 수 있습니다.
  const Z = +[];        // 0
  const O = +!+[];      // 1

  // 2,3,4,5,8,13,17 등은 "문자열 길이"로 만들기 (숫자 리터럴 없음)
  const THREE = "xxx".length;
  const FOUR = "xxxx".length;
  const FIVE = "xxxxx".length;
  const EIGHT = "xxxxxxxx".length;
  const S13 = "xxxxxxxxxxxxx".length;
  const S17 = "xxxxxxxxxxxxxxxxx".length;

  // 결과 문자열도 노출 최소화하고 싶으면 조각으로 합치기
  const R_DRAW = "비" + "김";
  const R_WIN = "내" + "가 " + "이" + "김";
  const R_LOSE = "내" + "가 " + "짐";

  // 토큰 목록(약 -> 강 순서)을 숨겨둔 blob (base64)
  // ※ 이 값은 토큰이 바뀔 때마다 다시 생성해서 바꿔 끼우시면 됩니다.
  // const BLOB = "0ZfAPu0chwiDPfoqY+eYGFM1d16pB1aGo6MFxwS5gX/XXFLGf5IlmjhGPFrCVOHopUJIhh3wJrfGp38GTLz/r7l03qb6GUUQ7BfD+8JMYfUF+clQAA==";
  const BLOB = makeBLOB();

  // 복호화 키도 그대로 두기 싫으면 조각내기
  const SECRET = ["@ba", "ttletwo", ":cmp", ":v", "1"].join("");

  // 문자열 -> 32비트 seed (djb2 비슷한 형태, 상수 없이)
  const seedFrom = (s) => {
    let x = Z;
    for (let i = Z; i < s.length; i += O) {
      x = (((x << FIVE) - x) + s.charCodeAt(i)) | Z;
    }
    return x >>> Z;
  };

  // xorshift32 (shift 값도 숫자 리터럴 없이)
  const xorshift32 = (x) => {
    x ^= (x << S13);
    x ^= (x >>> S17);
    x ^= (x << FIVE);
    return x >>> Z;
  };

  // base64 -> Uint8Array (브라우저/Node 호환)
  const b64ToU8 = (b64) => {
    if (typeof atob === "function") {
      const bin = atob(b64);
      const u8 = new Uint8Array(bin.length);
      for (let i = Z; i < bin.length; i += O) u8[i] = bin.charCodeAt(i);
      return u8;
    }
    // Node
    return Uint8Array.from(Buffer.from(b64, "base64"));
  };

  const SEP = "\u001f"; // 구분자(표시 잘 안 나는 문자)

  // blob 복호화 -> 토큰 배열(약->강 순서)
  const decodeTokens = (b64, secret) => {
    const data = b64ToU8(b64);
    const mask = (O << EIGHT) - O;

    let x = seedFrom(secret);
    const ks = new Uint8Array(FOUR);

    // XOR 스트림 복호화 (초기화 1회만)
    for (let i = Z; i < data.length; i += O) {
      if ((i & (FOUR - O)) === Z) {
        x = xorshift32(x);

        // x의 4바이트를 ks에 분해 (리터럴 없이)
        for (let k = Z; k < FOUR; k += O) {
          ks[k] = (x >>> (k * EIGHT)) & mask;
        }
      }
      data[i] = data[i] ^ ks[i & (FOUR - O)];
    }

    // bytes -> string (데이터가 짧으니 단순 변환)
    let s = "";
    for (let i = Z; i < data.length; i += O) s += String.fromCharCode(data[i]);

    return s.split(SEP);
  };

  const tokens = decodeTokens(BLOB, SECRET);

  // token -> 순서 인덱스 Map
  const idx = new Map();
  for (let i = Z; i < tokens.length; i += O) idx.set(tokens[i], i);

  // 최종 compare: Map 조회 + 비교만 함
  return (n1, n2) => {
    if (n1 === n2) return R_DRAW;

    const a = idx.get(n1);
    const b = idx.get(n2);

    // 예상치 못한 값 방어 (원하면 제거 가능)
    if (a === undefined || b === undefined) {
      throw new Error("unknown token");
    }

    // 약->강 순서에서 뒤가 더 강함
    return a > b ? R_WIN : R_LOSE;
  };
})();

// ------------------- 사용 예 -------------------
console.log(compare("b3534d0d", "bd416fa7"));