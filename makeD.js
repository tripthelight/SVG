// 1) 토큰 10개 (여기엔 평문이 들어가지만, 이 파일은 배포하지 않습니다)
const TOKENS = [
  "OEJNIHMKXT",
  "GIZFNPTSVK",
  "OCNLTGMFKS",
  "DKHOXMIVEA",
  "PDBIZUOFMJ",
  "KFOUDBRZVI",
  "MIPGSHDAUF",
  "SJRWTDGUXH",
  "HJZUTOXFQA",
  "JRPFIGSBDN",
];

// #######################################################
// SERVER CODE ———————————————————————————————————————————
// #######################################################

// ———————————————————————————————————————————————————————
// 난수 생성기
// ———————————————————————————————————————————————————————
const rand32 = () => (Math.random() * 0x100000000) >>> 0;
function uniqueRand32(n) {
  if (!Number.isInteger(n) || n < 0) throw new TypeError("n must be a non-negative integer");
  const set = new Set();
  while (set.size < n) set.add(rand32());
  return [...set];
}
// ✅ 사용 예시
// console.log(uniqueRand32(4));


// ———————————————————————————————————————————————————————
// number d - HASHES / PAYLOADS / SEEDS 생성
// ———————————————————————————————————————————————————————

const seeds = uniqueRand32(10);
const items = [
  {
    token: TOKENS[0], 
    data: [[0,0], [0,4], [2,-4], [0,22], [-2,4]], 
    // seed: 0x0F1E2D3C,
  },
  {
    token: TOKENS[1], 
    data: [[0,0], [0,2], [4,-2], [14,0], [-14,24], [14,0], [-4,2], [-14,0], [14,-24]], 
    // seed: 0xA1B2C3D4,
  },
].map((o, i) => ({...o, seed: seeds[i]})); // 모든 원소에 공통으로 seed 추가

const OPEN = -32768;
const CLOSE = 32767;
const SCALE = 10;

const xorshift32 = (x) => {
  x >>>= 0;
  x ^= (x << 13) >>> 0;
  x ^= (x >>> 17) >>> 0;
  x ^= (x << 5) >>> 0;
  return x >>> 0;
};

const cryptInPlace = (u8, seed) => {
  let s = (seed ^ 0x9e3779b9) >>> 0;
  let acc = 0x85ebca6b >>> 0;

  for (let i = 0; i < u8.length; i++) {
    s = xorshift32(s);
    acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
    const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
    u8[i] ^= m; // XOR 이라 encrypt/decrypt 동일
  }
  return u8;
};

// 중첩 배열 -> int16 토큰 스트림
const toTokenStream = (data) => {
  const out = [];

  const emit = (node) => {
    if (Array.isArray(node) && node.length === 2 && typeof node[0] === "number" && typeof node[1] === "number") {
      // [x,y]
      const x = Math.round(node[0] * SCALE);
      const y = Math.round(node[1] * SCALE);
      out.push(x, y);
      return;
    }

    // 중첩 배열
    out.push(OPEN);
    for (const child of node) emit(child);
    out.push(CLOSE);
  };

  emit(data);
  return out;
};

// int16[] -> Uint8Array (little-endian)
const int16ToU8 = (arr) => {
  const buf = new ArrayBuffer(arr.length * 2);
  const dv = new DataView(buf);
  for (let i = 0; i < arr.length; i++) dv.setInt16(i * 2, arr[i], true);
  return new Uint8Array(buf);
};

// Uint8Array -> base64
const u8ToB64 = (u8) => {
  let bin = "";
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  return btoa(bin);
};

// 최종: 원본 배열 + seed -> PAYLOAD 문자열
const buildPayload = (nestedArray, seed) => {
  const tokens = toTokenStream(nestedArray);
  const u8 = int16ToU8(tokens);
  cryptInPlace(u8, seed);
  return u8ToB64(u8);
};

// ———————————————————————————————————————————————————————
// SHAPE_PAYLOADS, CASE_PAYLOADS 생성
// ———————————————————————————————————————————————————————

// ❌ TOKENS 와 매칭 안되어 사용 안함
function createTShapePayload() {
  const xorshift32 = (x) => {
    x >>>= 0;
    x ^= (x << 13) >>> 0;
    x ^= (x >>> 17) >>> 0;
    x ^= (x << 5) >>> 0;
    return x >>> 0;
  };
  
  const cryptInPlace = (u8, seed) => {
    let s = (seed ^ 0x9e3779b9) >>> 0;
    let acc = 0x85ebca6b >>> 0;
  
    for (let i = 0; i < u8.length; i++) {
      s = xorshift32(s);
      acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
      const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
      u8[i] ^= m;
    }
    return u8;
  };
  
  const int16ToU8 = (arr) => {
    const buf = new ArrayBuffer(arr.length * 2);
    const dv = new DataView(buf);
    for (let i = 0; i < arr.length; i++) dv.setInt16(i * 2, arr[i], true);
    return new Uint8Array(buf);
  };
  
  const u8ToB64 = (u8) => {
    // 큰 배열에서 apply 인자 제한을 피하려고 chunk 처리
    const CHUNK = 0x8000;
    let bin = "";
    for (let i = 0; i < u8.length; i += CHUNK) {
      const slice = u8.subarray(i, i + CHUNK);
      bin += String.fromCharCode.apply(null, slice);
    }
    return btoa(bin);
  };
  
  // ===== 1) SHAPE payload 생성 =====
  const buildShapePayload = (points, seed) => {
    // points: [ [x,y], [x,y], ... ]
    const tokens = [OPEN];
    for (const [x, y] of points) tokens.push(x | 0, y | 0);
    tokens.push(CLOSE);
  
    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed);
    return u8ToB64(u8);
  };
  
  function generateAll(d, dr, ds, drs) {
    const shapes = [d, dr, ds, drs];
    const SHAPE_PAYLOADS = shapes.map((pts, i) => buildShapePayload(pts, SHAPE_SEEDS[i]));
    return SHAPE_PAYLOADS;
  }
  
  // ✅ 사용 예시
  // const SHAPE_SEEDS = [0xa37f19c5, 0x19b4e2d1, 0xc0ffee77, 0x5eed1234];
  const SHAPE_SEEDS = uniqueRand32(4);
  const d = [ [0,0],[10,2],[20,0],[10,8],[-10,-2],[-6,0],[0,32],[-6,-8],[0,-24],[-10,0] ];
  const dr = [ [16,0],[6,8],[0,24],[10,0],[8,8],[-10,-2],[-20,0],[-10,-8],[10,2],[6,0] ];
  const ds = [ [0,0],[8,2],[19,0],[9,8],[-9,-2],[-5,0],[0,28],[-5,-8],[0,-20],[-8,0] ];
  const drs = [ [14,0],[5,8],[0,20],[8,0],[9,8],[-8,-2],[-19,0],[-9,-8],[9,2],[5,0]];
  
  const gd = generateAll(d, dr, ds, drs);
  // console.log(gd);
};
// createTShapePayload();
// ❌ TOKENS 와 매칭 안되어 사용 안함
function createTPayload() {
  const xorshift32 = (x) => {
    x >>>= 0;
    x ^= (x << 13) >>> 0;
    x ^= (x >>> 17) >>> 0;
    x ^= (x << 5) >>> 0;
    return x >>> 0;
  };

  const cryptInPlace = (u8, seed) => {
    let s = (seed ^ 0x9e3779b9) >>> 0;
    let acc = 0x85ebca6b >>> 0;
    for (let i = 0; i < u8.length; i++) {
      s = xorshift32(s);
      acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
      const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
      u8[i] ^= m;
    }
    return u8;
  };

  const int16ToU8 = (arr) => {
    const buf = new ArrayBuffer(arr.length * 2);
    const dv = new DataView(buf);
    for (let i = 0; i < arr.length; i++) dv.setInt16(i * 2, arr[i], true);
    return new Uint8Array(buf);
  };

  const u8ToB64 = (u8) => {
    const CHUNK = 0x8000;
    let bin = "";
    for (let i = 0; i < u8.length; i += CHUNK) {
      const slice = u8.subarray(i, i + CHUNK);
      bin += String.fromCharCode.apply(null, slice);
    }
    return btoa(bin);
  };

  // --- CASE payload 생성기 ---
  // mode: 0(flat 1개) / 1(nested 여러 개)
  // recs: [ [ax,ay,sid], ... ]
  const buildCasePayload = (mode, recs, seed) => {
    const tokens = [mode | 0, recs.length | 0];
    for (const [ax, ay, sid] of recs) tokens.push(ax | 0, ay | 0, sid | 0);
    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed >>> 0);
    return u8ToB64(u8);
  };

  // =====================================================
  // 여기부터가 "CASE 0~9를 recs로 정의" 하는 부분
  // shapeId 매핑(고정):
  // 0: d, 1: dr, 2: ds, 3: drs
  // =====================================================
  const makeAllCasePayloads = (CASE_SEEDS_10) => {
    if (!Array.isArray(CASE_SEEDS_10) || CASE_SEEDS_10.length !== 10) {
      throw new Error("CASE_SEEDS_10 must be an array of 10 uint32 seeds");
    }

    // CASE 0: [ [75,128], ...d ]  => mode=0, recs=[[75,128,0]]
    const recs0 = [[75, 128, 0]];

    // CASE 1: [ [ [75,68],...d ], [ [75,188],...dr ] ] => mode=1
    const recs1 = [
      [75, 68, 0],
      [75, 188, 1],
    ];

    // CASE 2:
    // [ [ [75,61],...d ], [ [75,128],...d ], [ [75,195],...dr ] ]
    const recs2 = [
      [75, 61, 0],
      [75, 128, 0],
      [75, 195, 1],
    ];

    // CASE 3:
    // [ [ [35,61],...d ], [ [115,61],...d ], [ [35,195],...dr ], [ [115,195],...dr ] ]
    const recs3 = [
      [35, 61, 0],
      [115, 61, 0],
      [35, 195, 1],
      [115, 195, 1],
    ];

    // CASE 4:
    // CASE3 + [ [75,128],...d ]
    const recs4 = [
      [35, 61, 0],
      [115, 61, 0],
      [75, 128, 0],
      [35, 195, 1],
      [115, 195, 1],
    ];

    // CASE 5:
    // [ [35,61]d, [115,61]d, [35,128]d, [115,128]d, [35,195]dr, [115,195]dr ]
    const recs5 = [
      [35, 61, 0],
      [115, 61, 0],
      [35, 128, 0],
      [115, 128, 0],
      [35, 195, 1],
      [115, 195, 1],
    ];

    // CASE 6:
    // CASE5 + [ [75,95],...d ]
    const recs6 = [
      [35, 61, 0],
      [115, 61, 0],
      [75, 95, 0],
      [35, 128, 0],
      [115, 128, 0],
      [35, 195, 1],
      [115, 195, 1],
    ];

    // CASE 7: (ds/drs 사용)
    // [ [35,61]ds, [115,61]ds, [75,95]ds, [35,128]ds, [115,128]ds,
    //   [75,161]drs, [35,195]drs, [115,195]drs ]
    const recs7 = [
      [35, 61, 2],
      [115, 61, 2],
      [75, 95, 2],
      [35, 128, 2],
      [115, 128, 2],
      [75, 161, 3],
      [35, 195, 3],
      [115, 195, 3],
    ];

    // CASE 8:
    // [ [35,61]ds, [115,61]ds, [35,108]ds, [115,108]ds, [75,128]ds,
    //   [35,148]drs, [115,148]drs, [35,195]drs, [115,195]drs ]
    const recs8 = [
      [35, 61, 2],
      [115, 61, 2],
      [35, 108, 2],
      [115, 108, 2],
      [75, 128, 2],
      [35, 148, 3],
      [115, 148, 3],
      [35, 195, 3],
      [115, 195, 3],
    ];

    // CASE 9:
    // [ [35,61]ds, [115,61]ds, [75,88]ds, [35,108]ds, [115,108]ds,
    //   [35,148]drs, [115,148]drs, [75,168]drs, [35,195]drs, [115,195]drs ]
    const recs9 = [
      [35, 61, 2],
      [115, 61, 2],
      [75, 88, 2],
      [35, 108, 2],
      [115, 108, 2],
      [35, 148, 3],
      [115, 148, 3],
      [75, 168, 3],
      [35, 195, 3],
      [115, 195, 3],
    ];

    const allRecs = [recs0, recs1, recs2, recs3, recs4, recs5, recs6, recs7, recs8, recs9];

    // mode 규칙:
    // - CASE0만 flat(=0)
    // - 나머지는 모두 nested(=1)
    const modes = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const CASE_PAYLOADS = new Array(10);
    for (let i = 0; i < 10; i++) {
      CASE_PAYLOADS[i] = buildCasePayload(modes[i], allRecs[i], CASE_SEEDS_10[i]);
    }
    return CASE_PAYLOADS;
  };

  // ===== 실행 예 =====
  // seed 10개는 케이스별 복호화 키(고정값). 아무 uint32 10개나 가능(중복 비권장).
  // const CASE_SEEDS_10 = [
  //   0x13579bdf, 0x2468ace0, 0xdeadbeef, 0xc001d00d, 0xfeedface,
  //   0x0badf00d, 0xbaadf00d, 0x12345678, 0xcafebabe, 0x8badf00d,
  // ];
  const CASE_SEEDS_10 = uniqueRand32(10);

  const CASE_PAYLOADS = makeAllCasePayloads(CASE_SEEDS_10);
  // console.log("CASE_PAYLOADS =", CASE_PAYLOADS);
};
// createTPayload();

// 🟢 TOKENS 와 매칭됨
function createTPayloads() {
  // fnv1a32 - Node 용
  /* const fnv1a32 = (str) => {
    const buf = Buffer.from(String(str), "utf8");
    let h = 0x811c9dc5;
    for (let i = 0; i < buf.length; i++) {
      h ^= buf[i];
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }; */
  // fnv1a32 - 브라우저용
  const fnv1a32 = (str) => {
    const bytes = new TextEncoder().encode(String(str));
    let h = 0x811c9dc5;
    for (let i = 0; i < bytes.length; i++) {
      h ^= bytes[i];
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  };

  // ---------------- xorshift32 + XOR-stream ----------------
  const xorshift32 = (x) => {
    x >>>= 0;
    x ^= (x << 13) >>> 0;
    x ^= (x >>> 17) >>> 0;
    x ^= (x << 5) >>> 0;
    return x >>> 0;
  };

  const cryptInPlace = (u8, seed) => {
    let s = (seed ^ 0x9e3779b9) >>> 0;
    let acc = 0x85ebca6b >>> 0;

    for (let i = 0; i < u8.length; i++) {
      s = xorshift32(s);
      acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
      const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
      u8[i] ^= m;
    }
    return u8;
  };

  // int16ToU8 - Node 용
  /* const int16ToU8 = (arr) => {
    const buf = Buffer.alloc(arr.length * 2);
    for (let i = 0; i < arr.length; i++) buf.writeInt16LE(arr[i], i * 2);
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }; */
  // int16ToU8 - 브라우저용
  const int16ToU8 = (arr) => {
    const buf = new ArrayBuffer(arr.length * 2);
    const dv = new DataView(buf);
    for (let i = 0; i < arr.length; i++) {
      dv.setInt16(i * 2, arr[i], true); // true = little-endian
    }
    return new Uint8Array(buf);
  };

  // u8ToB64 - Node 용
  // const u8ToB64 = (u8) => Buffer.from(u8).toString("base64");
  // u8ToB64 - 브라우저용
  const u8ToB64 = (u8) => {
    const CHUNK = 0x8000;
    let bin = "";
    for (let i = 0; i < u8.length; i += CHUNK) {
      const slice = u8.subarray(i, i + CHUNK);
      bin += String.fromCharCode.apply(null, slice);
    }
    return btoa(bin);
  };

  // ---------------- SHAPE payload 생성 (d/dr/ds/drs) ----------------
  const OPEN = -32768;
  const CLOSE = 32767;

  const buildShapePayload = (points, seed) => {
    const tokens = [OPEN];
    for (const [x, y] of points) tokens.push(x | 0, y | 0);
    tokens.push(CLOSE);

    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed >>> 0);
    return u8ToB64(u8);
  };

  // ---------------- CASE payload 생성 (mode + recs) ----------------
  const buildCasePayload = (mode, recs, seed) => {
    // mode: 0(flat 1개), 1(nested 여러 개)
    const tokens = [mode | 0, recs.length | 0];
    for (const [ax, ay, sid] of recs) tokens.push(ax | 0, ay | 0, sid | 0);

    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed >>> 0);
    return u8ToB64(u8);
  };

  // ---------------- 여기부터 사용자가 채우는 “원본(빌드단 전용)” ----------------
  // 2) shape 원본: d/dr/ds/drs (빌드단 전용이므로 평문 OK)
  const d = [ [0,0],[10,2],[20,0],[10,8],[-10,-2],[-6,0],[0,32],[-6,-8],[0,-24],[-10,0] ];
  const dr = [ [16,0],[6,8],[0,24],[10,0],[8,8],[-10,-2],[-20,0],[-10,-8],[10,2],[6,0] ];
  const ds = [ [0,0],[8,2],[19,0],[9,8],[-9,-2],[-5,0],[0,28],[-5,-8],[0,-20],[-8,0] ];
  const drs = [ [14,0],[5,8],[0,20],[8,0],[9,8],[-8,-2],[-19,0],[-9,-8],[9,2],[5,0] ];

  // shapeId 매핑(고정): 0:d, 1:dr, 2:ds, 3:drs
  const SHAPES = [d, dr, ds, drs];

  // 3) seeds (고정 uint32) — 값은 아무거나 가능(중복 비권장)
  // const SHAPE_SEEDS = [0xa37f19c5, 0x19b4e2d1, 0xc0ffee77, 0x5eed1234];
  const SHAPE_SEEDS =  uniqueRand32(4);
  const CASE_SEEDS  = uniqueRand32(10);

  // 4) 케이스 10개 정의(recs)
  // recs: [ [anchorX, anchorY, shapeId], ... ]
  const CASE_RECS = [
    // 0: [ [75,128], ...d ] -> flat
    { mode: 0, recs: [[75,128,0]] },

    // 1: [ [ [75,68],d ], [ [75,188],dr ] ]
    { mode: 1, recs: [[75,68,0],[75,188,1]] },

    // 2:
    { mode: 1, recs: [[75,61,0],[75,128,0],[75,195,1]] },

    // 3:
    { mode: 1, recs: [[35,61,0],[115,61,0],[35,195,1],[115,195,1]] },

    // 4:
    { mode: 1, recs: [[35,61,0],[115,61,0],[75,128,0],[35,195,1],[115,195,1]] },

    // 5:
    { mode: 1, recs: [[35,61,0],[115,61,0],[35,128,0],[115,128,0],[35,195,1],[115,195,1]] },

    // 6:
    { mode: 1, recs: [[35,61,0],[115,61,0],[75,95,0],[35,128,0],[115,128,0],[35,195,1],[115,195,1]] },

    // 7: ds/drs
    { mode: 1, recs: [[35,61,2],[115,61,2],[75,95,2],[35,128,2],[115,128,2],[75,161,3],[35,195,3],[115,195,3]] },

    // 8:
    { mode: 1, recs: [[35,61,2],[115,61,2],[35,108,2],[115,108,2],[75,128,2],[35,148,3],[115,148,3],[35,195,3],[115,195,3]] },

    // 9:
    { mode: 1, recs: [[35,61,2],[115,61,2],[75,88,2],[35,108,2],[115,108,2],[35,148,3],[115,148,3],[75,168,3],[35,195,3],[115,195,3]] },
  ];

  // ---------------- 생성 ----------------
  if (TOKENS.length !== 10 || CASE_RECS.length !== 10 || CASE_SEEDS.length !== 10) {
    throw new Error("TOKENS/CASE_RECS/CASE_SEEDS must be length 10");
  }

  const HASHES = TOKENS.map((t) => fnv1a32(t)); // ✅ 토큰과 매칭되는 해시 배열
  const SHAPE_PAYLOADS = SHAPES.map((pts, i) => buildShapePayload(pts, SHAPE_SEEDS[i]));
  const CASE_PAYLOADS = CASE_RECS.map((c, i) => buildCasePayload(c.mode, c.recs, CASE_SEEDS[i]));

  // 런타임에 넣을 모듈 코드 생성(평문 TOKENS/원본 배열 없음)
  const asHex = (n) => "0x" + (n >>> 0).toString(16).padStart(8, "0");

  return {
    HASHES,
    SHAPE_PAYLOADS,
    SHAPE_SEEDS,
    CASE_PAYLOADS,
    CASE_SEEDS,
  }

  // console.log(`HASHES = [${HASHES.map(asHex).join(", ")}]`);
  // console.log(`SHAPE_SEEDS = [${SHAPE_SEEDS.map(asHex).join(", ")}]`);
  // console.log(`CASE_SEEDS = [${CASE_SEEDS.map(asHex).join(", ")}]`);
  // console.log(`SHAPE_PAYLOADS = ${JSON.stringify(SHAPE_PAYLOADS, null, 2)}`);
  // console.log(`CASE_PAYLOADS = ${JSON.stringify(CASE_PAYLOADS, null, 2)}`);
};
createTPayloads();





// #######################################################
// CLIENT CODE ———————————————————————————————————————————
// #######################################################
const CARD_CODE = TOKENS[0];

// ———————————————————————————————————————————————————————
// NUMBER ————————————————————————————————————————————————
// [OEJNIHMKXT, GIZFNPTSVK, OCNLTGMFKS, DKHOXMIVEA, PDBIZUOFMJ, KFOUDBRZVI, MIPGSHDAUF, SJRWTDGUXH, HJZUTOXFQA, JRPFIGSBDN] 중 하나를 받아서, 해당하는 카드 숫자 d 의 배열을 리턴
// ———————————————————————————————————————————————————————

// - 결과 좌표 배열을 코드에 직접 쓰지 않음 (암호화된 base64 -> 복호 -> 토큰파싱)
// - 입력 문자열은 코드에 노출되지 않음 (해시값으로만 분기)
// - 복호/파싱은 입력 문자열 내용과 무관 (선택만 분기)

const dNumber = (_token) => {
  // ---------- 32-bit FNV-1a (UTF-8) ----------
  const fnv1a32 = (str) => {
    const bytes = new TextEncoder().encode(str);
    let h = 0x811c9dc5;
    for (let i = 0; i < bytes.length; i++) {
      h ^= bytes[i];
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  };

  // ---------- xorshift32 ----------
  const xorshift32 = (x) => {
    x >>>= 0;
    x ^= (x << 13) >>> 0;
    x ^= (x >>> 17) >>> 0;
    x ^= (x << 5) >>> 0;
    return x >>> 0;
  };

  // ---------- base64 -> Uint8Array ----------
  const b64ToU8 = (b64) => {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 0xff;
    return out;
  };

  // ---------- 난독화된 복호화(XOR 스트림) ----------
  // XOR이므로 encrypt/decrypt 동일 (payload는 "암호화된 상태"로 저장)
  const decryptInPlace = (u8, seed) => {
    let s = (seed ^ 0x9e3779b9) >>> 0;
    let acc = 0x85ebca6b >>> 0;

    for (let i = 0; i < u8.length; i++) {
      s = xorshift32(s);
      acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
      const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
      u8[i] ^= m;
    }
    return u8;
  };

  // ---------- 토큰 스트림 -> 중첩 배열 파싱 ----------
  // OPEN=-32768, CLOSE=32767, SCALE=10 (모든 좌표는 x10 정수로 저장되어 있음)
  const parseTokenStream = (u8) => {
    const OPEN = -32768;
    const CLOSE = 32767;
    const SCALE = 10;

    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);

    const root = [];
    const stack = [];

    const toNum = (v) => {
      // v는 SCALE 적용된 int
      if (v % SCALE === 0) return v / SCALE;
      // 소수 1자리 고정 (2.5, 10.3, 12.4, 14.4, 15.5, 3.6, 2.8 등)
      return Number((v / SCALE).toFixed(1));
    };

    for (let off = 0; off < dv.byteLength; off += 2) {
      const t = dv.getInt16(off, true);

      if (t === OPEN) {
        const arr = [];
        if (stack.length) stack[stack.length - 1].push(arr);
        else root.push(arr);
        stack.push(arr);
        continue;
      }

      if (t === CLOSE) {
        stack.pop();
        continue;
      }

      // 혹시라도 스트림이 깨졌을 때 안전장치 (push undefined 방지)
      if (!stack.length) {
        const arr = [];
        root.push(arr);
        stack.push(arr);
      }

      const x = t;
      const y = dv.getInt16(off + 2, true);
      off += 2;

      stack[stack.length - 1].push([toNum(x), toNum(y)]);
    }

    return root[0];
  };

  // HASHES / PAYLOADS / SEEDS 는 server에서 내려주는 값 사용 필요
  const HASHES = [];
  const PAYLOADS = [];
  const SEEDS = [];
  for (let i = 0; i < items.length; i++) {
    const { token, data, seed } = items[i];
    HASHES.push(fnv1a32(token));        // 런타임엔 이 숫자만 남김
    PAYLOADS.push(buildPayload(data, seed)); // 난독화 문자열
    SEEDS.push(seed >>> 0);
  };

  // ---------- 암호화된 payload들 (좌표배열을 직접 쓰지 않기 위한 데이터 덩어리) ----------
  /* const PAYLOADS = [
    "gqXv9TPOu5FNiWbSZCEQOxo/3nn6b+Ej",
    "b8ycrjBokIplz5i/ndF9Zrem+NP7hUmkcp6wBPXEtTmaC5gi7SJYLQ==",
    "wW43t46KkzqymVXCu7KKD2G77SyAuDv7ZEkDTeVf+smjt4BZ3R4sdu3QDe4xkVWgwFxBCSSmnCNCwZtDGJfGI+stolnTBNFtiGIlDoVfNeFdaICRV5XjhP9YdZVnTL9YExiaAA==",
    "GFrKA/xFJcqpPjajjb92fsl8XRM1QMV1JuHCno6r5x5RJX4zZbj/U0cvusOcLl1f0DFus3VZUwdMNWlEEi55dn2IXSymfEpVOMvM5NXb8lmkaO5uRX74+cS4J7AtG5J94bqH4g==",
    "soFR05YxvN5oaBopxZCEBHpfnZ+Uo9c1iCDLvLmP22z8baV8nIQZ8D2GLnXbtrd2Z2fb6UTwPiE=",
    "Bp4LPS7IzuO8izXl3TGF6uAj18XgY4+d2LM6Xx7ktMAGcKvsa8s3yOWqQmtGTU7A1qZy6h8eccpqlfbONPAXegqd5Cw5yVQMYKBMTBr9/HeLdi1vjbHmD+lYMRlY1OCOlF/A4xn74oqdqzWaraRh6pwZS257vO2KPxjHBa+dXck7kpOuKAECbCm+OXfTDkYK+mNgbg==",
    "1Tk97Xqs0L9KoF3pFdDtaTS/yHfFrHBoLgFeUL6mesIVRRRY0I9mZTXhzr/4lfJPiZ6RkNs+z99u9l/b3HPKeGW0KGE=",
    "qGOFfXGlHII8n75NHh2VZOqWAfAwvOuzbaclVcjNAOojKF73OQ1ib1z2zMJRd2VPi7bIUrvfkKTLsKtLAiGwn8YDy41THZgZyib8pVIJK+2yEB4G+ojrCA==",
    "qIerURZ/5pkhQSmuzK+NKHsvQPdf4ijYLuFgIzMwWfmSTo0FScph3f8lxIH+MeK6BTCFUF2QDK4KnEPJtIqGrQq6sGJIASZTlaU3+h86PvFctiwazm1QEMMh5ZGs6KWj2dYaI6wJ8KVT3Psc7DAMxd2TfO8pm/jcE5l7E3yOC3Sp53LFvx5FyVQZi9OwROCNLfql7A==",
    "IreY0WhoZjJS4bFZWmanP0XZ1itf6Q+zAU5XQNcYL1ZBjaWx+es5cfikoVQYnRZKMjirkURuDApro/iwXdNPbjq3rz+8uR7MFJZmGkGM3Kuo+WNylAP7Ic7E3Ft7ceFBHXbd4Ow25/lYn9OO4r/G2NZIQaMlQ3z0pIe7GRIO61Mt7OgQQdT3CAVc2WD29i2m0TqA6Mal80e2xlwZMFYnVKiGAL/F9uAtFXONAYwKenhgrRzK+eJpjawWdQjHjbEp",
  ]; */

  // seed들은 데이터 복호 키 (임의 상수)
  /* const SEEDS = [
    0xa1b2c3d4, 0x0f1e2d3c, 0x13579bdf, 0x2468ace0, 0xdeadbeef,
    0xc001d00d, 0xfeedface, 0x0badf00d, 0xbaadf00d, 0x12345678,
  ]; */

  // 입력 문자열은 코드에 없고, 해시값만 존재
  /* const HASHES = [
    0x550b0f8c, 0xc47bb621, 0xb8d8452d, 0x57e225f7, 0xef349a13,
    0x83af8ca7, 0x73f143c9, 0x1bf3e70b, 0xe3d01ebf, 0x5a916730,
  ]; */

  const cache = new Map();

  const buildByIndex = (idx) => {
    if (cache.has(idx)) return cache.get(idx);

    const u8 = b64ToU8(PAYLOADS[idx]);
    decryptInPlace(u8, SEEDS[idx]);
    const out = parseTokenStream(u8);

    cache.set(idx, out);
    return out;
  };

  const result = (token) => {
    const h = fnv1a32(String(token));
    for (let i = 0; i < HASHES.length; i++) {
      if (HASHES[i] === h) return buildByIndex(i);
    }
  }

  return result(_token);
};

// ✅ 사용 예시
const arr = dNumber(CARD_CODE);
console.log(arr);

// ———————————————————————————————————————————————————————
// T —————————————————————————————————————————————————————
// [OEJNIHMKXT, GIZFNPTSVK, OCNLTGMFKS, DKHOXMIVEA, PDBIZUOFMJ, KFOUDBRZVI, MIPGSHDAUF, SJRWTDGUXH, HJZUTOXFQA, JRPFIGSBDN] 중 하나를 받아서, 해당하는 카드 T d 의 배열을 리턴
// ———————————————————————————————————————————————————————

const dT = (_token) => {
  const { HASHES, SHAPE_PAYLOADS, SHAPE_SEEDS, CASE_PAYLOADS, CASE_SEEDS } = createTPayloads();

  // --------- hash: FNV-1a 32bit (UTF-8) ---------
  const fnv1a32 = (str) => {
    const bytes = new TextEncoder().encode(String(str));
    let h = 0x811c9dc5;
    for (let i = 0; i < bytes.length; i++) {
      h ^= bytes[i];
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  };

  // --------- PRNG: xorshift32 ---------
  const xorshift32 = (x) => {
    x >>>= 0;
    x ^= (x << 13) >>> 0;
    x ^= (x >>> 17) >>> 0;
    x ^= (x << 5) >>> 0;
    return x >>> 0;
  };

  // --------- base64 -> Uint8Array ---------
  const b64ToU8 = (b64) => {
    const bin = atob(b64);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i) & 0xff;
    return u8;
  };

  // --------- XOR-stream decrypt (encrypt/decrypt 동일 구조) ---------
  const decryptInPlace = (u8, seed) => {
    let s = (seed ^ 0x9e3779b9) >>> 0;
    let acc = 0x85ebca6b >>> 0;

    for (let i = 0; i < u8.length; i++) {
      s = xorshift32(s);
      acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
      const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
      u8[i] ^= m;
    }
    return u8;
  };

  // --------- nested token stream parser (OPEN/CLOSE + int16 pairs) ---------
  const parseNestedPoints = (u8) => {
    const OPEN = -32768;
    const CLOSE = 32767;

    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    const root = [];
    const stack = [];

    for (let off = 0; off < dv.byteLength; off += 2) {
      const t = dv.getInt16(off, true);

      if (t === OPEN) {
        const arr = [];
        if (stack.length) stack[stack.length - 1].push(arr);
        else root.push(arr);
        stack.push(arr);
        continue;
      }

      if (t === CLOSE) {
        stack.pop();
        continue;
      }

      // 안전장치 (데이터 깨짐 방지)
      if (!stack.length) {
        const arr = [];
        root.push(arr);
        stack.push(arr);
      }

      const x = t;
      const y = dv.getInt16(off + 2, true);
      off += 2;

      stack[stack.length - 1].push([x, y]);
    }

    return root[0];
  };

  // --------- case template parser: [mode, count, (x,y,shapeId)*] ---------
  const parseCaseTemplate = (u8) => {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    const readI16 = (i) => dv.getInt16(i * 2, true);

    const mode = readI16(0); // 0: flat, 1: nested
    const count = readI16(1);

    const recs = [];
    let p = 2;
    for (let i = 0; i < count; i++) {
      const x = readI16(p++);
      const y = readI16(p++);
      const sid = readI16(p++);
      recs.push([x, y, sid]);
    }
    return { mode, recs };
  };

  // ============================================================
  // (1) d/dr/ds/drs: 암호화 payload 4개 (원본 배열 직접 작성 X)
  // ============================================================
  /* const SHAPE_PAYLOADS = [
    "h7xltl/PubGbDXmLqVmqZjyvHwTJfv9VL/7y74tXEvHyUe2ueviXZ4uEQsU=",
    "6VL1lO/bPi+XGwA5U1DtesEzFkWQvX8e0j94KyrN5iGf7XVRWS8G5plCgck=",
    "2hogus3zLBQMejAivVSukTfis1KJJ3o8yDKWc6kC+StME+e8Q7KTCZe8t/U=",
    "RngBG2NabJCRn2+Bza4BDaHY+45gGpCNQP7tJRVfqsc/Jsc2dIGtQ+w+QOM=",
  ]; */

  /* const SHAPE_SEEDS = [
    0xa37f19c5, 0x19b4e2d1, 0xc0ffee77, 0x5eed1234,
  ]; */

  // ============================================================
  // (2) 케이스 템플릿 10개: 앵커(x,y) + 어떤 shape를 붙일지 (원본 리턴 배열 직접 작성 X)
  // ============================================================
  /* const CASE_PAYLOADS = [
    "we42N8WKEzqymQ==",
    "GdrIg7dFYcqpPvGjJb+vgQ==",
    "swFS090xgd44aAEp9W+dBDFf9WDAow==",
    "Bx4PvQ3I8+O8ixblsDE1FdojFMVKnKmdG7NcXw==",
    "1Lk4bVms7b9KoDrpANABlvO/SHegU1dpCv5fUEGmqT3rOg==",
    "qeODfVKlIYJsn51Nk+LxZMmWgfAsvHRM+aclVQ8ydhUiKJIIuw1jbw==",
    "qQes0TV/25khQQquoa8911QvH/df4hfYQh50I0AwPQYnsa4FNTUh3YwlYIFfMQ==",
    "IzeQUUvoWzJQ4cJZT2axP9YmiSuB6cBMqU5VQIDnUClDDdKxWOsucQNbBlQbnWVKLThEbg==",
    "S0R7Vu4TcJ3lEjTP0jlK1JOetOnPLaCZABz8/2vkfRMc3N5DXbOYT1rqWt7/QAL8lo667Qoq6ihvIw==",
    "0MNWW6baaPJJFbwPVhY2cNX4iyn/mm1qlkCMX03/HX7GZxbKR3SVrbtz+p1lj+xscH9A4+ht3f4DvQc9J1qXiA==",
  ]; */

  /* const CASE_SEEDS = [
    0x13579bdf, 0x2468ace0, 0xdeadbeef, 0xc001d00d, 0xfeedface,
    0x0badf00d, 0xbaadf00d, 0x12345678, 0xcafebabe, 0x8badf00d,
  ]; */

  // ============================================================
  // (3) 입력 문자열 매칭: 예시 문자열 자체는 코드에 없고, 해시값만 존재
  // ============================================================
  /* const HASHES = [
    0x550b0f8c, 0xc47bb621, 0xb8d8452d, 0x57e225f7, 0xef349a13,
    0x83af8ca7, 0x73f143c9, 0x1bf3e70b, 0xe3d01ebf, 0x5a916730,
  ]; */

  // --------- shape decode cache ---------
  const shapeCache = new Array(4).fill(null);
  const getShape = (sid) => {
    let v = shapeCache[sid];
    if (v) return v;

    const u8 = b64ToU8(SHAPE_PAYLOADS[sid]);
    decryptInPlace(u8, SHAPE_SEEDS[sid]);
    v = parseNestedPoints(u8);

    shapeCache[sid] = v;
    return v;
  };

  // --------- build: anchor + shape ---------
  const buildAnchored = (ax, ay, shape) => {
    const out = new Array(1 + shape.length);
    out[0] = [ax, ay];
    for (let i = 0; i < shape.length; i++) {
      const p = shape[i];
      out[i + 1] = [p[0], p[1]]; // 깊은 복사
    }
    return out;
  };

  // --------- case decode + assemble ---------
  const caseCache = new Array(10).fill(null);
  const buildByIndex = (idx) => {
    let cached = caseCache[idx];
    if (cached) return cached;

    const u8 = b64ToU8(CASE_PAYLOADS[idx]);
    decryptInPlace(u8, CASE_SEEDS[idx]);
    const { mode, recs } = parseCaseTemplate(u8);

    if (mode === 0) {
      // flat: [ [anchor], ...shape ]
      const [x, y, sid] = recs[0];
      cached = buildAnchored(x, y, getShape(sid));
    } else {
      // nested: [ [ [anchor], ...shape ], ... ]
      cached = new Array(recs.length);
      for (let i = 0; i < recs.length; i++) {
        const [x, y, sid] = recs[i];
        cached[i] = buildAnchored(x, y, getShape(sid));
      }
    }

    caseCache[idx] = cached;
    return cached;
  };

  const result = (token) => {
    const h = fnv1a32(token);
    for (let i = 0; i < HASHES.length; i++) {
      if (HASHES[i] === h) return buildByIndex(i);
    }
    throw new Error("Unknown token");
  }

  // --------- exported function ---------
  return result(_token);
};

const r = dT(CARD_CODE);
console.log(r);

