import { OPEN, CLOSE, SCALE } from "./functions/variables.js";
import fnv1a32 from "./functions/fnv1a32.js";
import cryptInPlace from "./functions/cryptInPlace.js";
import toTokenStream from "./functions/toTokenStream.js";
import int16ToU8 from "./functions/int16ToU8.js";
import u8ToB64 from "./functions/u8ToB64.js";
import rand32 from "./functions/rand32.js";
import { pack, unpack } from "./functions/splitArray.js";

// 1) 토큰 10개 (여기엔 평문이 들어가지만, 이 파일은 배포하지 않습니다)
const TOKENS = [
  0x48ee2d2b,
  0x41e53985,
  0xfb021b70,
  0x375bd7f0,
  0x6256a4ab,
  0x6618ef6,
  0xcfa28535,
  0x3c49949e,
  0x64b72189,
  0x722ed213,
];

// #######################################################
// SERVER CODE ———————————————————————————————————————————
// #######################################################

// ———————————————————————————————————————————————————————
// SEED, HASH 생성
// ———————————————————————————————————————————————————————
// card num 1 ~ 10 과 매칭되는 hash 생성
// 0 ~ 9 번째 index가 1 ~ 10
// 마지막 index가 seed
// 나머지는 10개 카드 개수를 속이기 위한 fake
const buildHashs = () => {
  const SEED = rand32(); // 공통 seed
  const n = Math.floor(Math.random() * (16 - 11 + 1)) + 11; // 11 ~ 16
  const HASHES = [];
  for (let i = 0; i < n; i++) {
    const isLast = (i === n - 1); // 마지막
    const isHead = i < 10; // 실제 head hash
    if (isLast) {
      HASHES.push(SEED);
    } else if (isHead) {
      HASHES.push(fnv1a32(TOKENS[i], SEED));
    } else {
      HASHES.push(rand32());
    }
  };
  return { HASHES };
};











// ———————————————————————————————————————————————————————
// number d - PAYLOADS 생성
// "A–Z a–z 0–9 + /" 그리고 "=" 문자만 사용해서 payload 생성됨
// ———————————————————————————————————————————————————————
const dNumPos = [
  [[0,0], [0,4], [2,-4], [0,22], [-2,4]],
  [[0,0], [0,2], [4,-2], [14,0], [-14,24], [14,0], [-4,2], [-14,0], [14,-24]],
  [ [ [0,0], [0,2], [4,-2], [14,0], [-12.4,12], [12.4,0], [-14.4,14], [-3.6,0], [12.4,-12], [-12.4,0], [12.4,-12] ], [ [0,0], [14.4,0], [3.6,0], [-12.4,12], [12.4,0], [-12.4,12], [12.4,0], [-4,2], [-14,0], [12.4,-12], [-12.4,0] ] ],
  [ [[0,0], [0,14], [2,-4], [0,11], [14,-15], [0,-2], [2,-4], [0,22], [-2,4], [0,-17], [-16,17]], [[0,0], [0,4], [2,-4], [0,17], [16,-17], [0,12], [-2,4], [0,-11], [-14,15], [0,2], [-2,4]] ],
  [ [0,0], [0,8], [8,-8], [2.5,0], [-8.5,8.5], [0,10.3], [16,-16], [0,15.2], [-8,8], [-2.5,0], [8.5,-8.5], [0,-10.3], [-16,16] ],
  [ [ [0,0], [0,8], [8,-8], [2.5,0], [-8.5,8.5], [0,10.3], [16,-16], [0,15.2], [-8,8], [-10,0], [0,-2.8], [2,-2], [0,2.8], [7.5,0], [6.5,-6.5], [0,-10.3], [-16,16] ], [ [0,0], [0,8], [8,-8], [10,0], [0,2.8], [-2,2], [0,-2.8], [-7.5,0], [-6.5,6.5], [0,10.3], [16,-16], [0,15.2], [-8,8], [-2.5,0], [8.5,-8.5], [0,-10.3], [-16,16] ] ],
  [ [ [0,0], [0,2], [4,-2], [14,0], [-15.5,26], [-2.5,0], [14,-24] ], [ [0,0], [15.5,0], [2.5,0], [-14,24], [14,0], [-4,2], [-14,0] ] ],
  [ [0,0], [0,8], [8,-8], [10,0], [0,2.8], [-2,2], [0,-2.8], [-7.5,0], [-6.5,6.5], [0,10.3], [16,-16], [0,15.2], [-8,8], [-10,0], [0,-2.8], [2,-2], [0,2.8], [7.5,0], [6.5,-6.5], [0,-10.3], [-16,16] ],
  [ [ [0,0], [0,8], [8,-8], [10,0], [0,2.8], [-2,2], [0,-2.8], [-7.5,0], [-6.5,6.5], [0,10.3], [16,-16], [0,15.2], [-8,8], [-2.5,0], [8.5,-8.5], [0,-10.3], [-16,16] ], [ [0,0], [0,8], [8,-8], [2.5,0], [-8.5,8.5], [0,10.3], [16,-16], [0,15.2], [-8,8], [-10,0], [0,-2.8], [2,-2], [0,2.8], [7.5,0], [6.5,-6.5], [0,-10.3], [-16,16] ] ],
  [ [ [ [0,0], [0,4], [2,-4], [0,22], [-2,4], [0,-22] ], [ [6,0], [2,-4], [10,0], [0,22], [-2,4], [-10,0], [2,-2], [7,0], [1,-2], [0,-20], [-7,0], [-1,2], [0,20], [-2,2] ] ], [ [ [0,0], [0,4], [2,-4], [10,0], [0,22], [-2,4], [-10,0], [2,-2], [7,0], [1,-2], [0,-20], [-7,0], [-1,2], [0,20], [-2,2], [0,-22] ], [ [16,0], [2,-4], [0,22], [-2,4], [0,-22] ] ] ],
];

// 최종: 원본 배열 + seed -> PAYLOAD 문자열
const buildPayload = (nestedArray, seed) => {
  const tokens = toTokenStream(nestedArray);
  const u8 = int16ToU8(tokens);
  cryptInPlace(u8, seed);
  return u8ToB64(u8);
};

const buildNumPayload = (heads) => {
  const n = Math.floor(Math.random() * (13 - 10 + 1)) + 10; // 10 ~ 13
  const n10 = Math.floor(Math.random() * 10); // 0 ~ 9
  const N_PAYLOADS = [];
  /* for (let i = 0; i < n; i++) {
    if (i < 10) { // 실제 payload hash
      N_PAYLOADS.push(buildPayload(dNumPos[i], heads[i])); // 난독화 문자열
    } else {
      N_PAYLOADS.push(buildPayload(dNumPos[n10], rand32()));
    }
  }; */
  for (let i = 0; i < 10; i++) {
    N_PAYLOADS.push(buildPayload(dNumPos[i], heads[i])); // 난독화 문자열
  };
  return { N_PAYLOADS };
};

// ———————————————————————————————————————————————————————
// T d - SHAPE_PAYLOADS, CASE_PAYLOADS 생성
// "A–Z a–z 0–9 + /" 그리고 "=" 문자만 사용해서 payload 생성됨
// ———————————————————————————————————————————————————————
function createTShape(heads) {
  const d = [ [0,0],[10,2],[20,0],[10,8],[-10,-2],[-6,0],[0,32],[-6,-8],[0,-24],[-10,0] ];
  const dr = [ [16,0],[6,8],[0,24],[10,0],[8,8],[-10,-2],[-20,0],[-10,-8],[10,2],[6,0] ];
  const ds = [ [0,0],[8,2],[19,0],[9,8],[-9,-2],[-5,0],[0,28],[-5,-8],[0,-20],[-8,0] ];
  const drs = [ [14,0],[5,8],[0,20],[8,0],[9,8],[-8,-2],[-19,0],[-9,-8],[9,2],[5,0] ];
  // 1) shapeId 매핑(고정): 0:d, 1:dr, 2:ds, 3:drs
  const SHAPES = [d, dr, ds, drs];

  // 2) CASE payload 생성 (mode + recs)
  const buildShapePayload = (points, seed) => {
    const tokens = [OPEN];
    for (const [x, y] of points) tokens.push(x | 0, y | 0);
    tokens.push(CLOSE);

    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed >>> 0);
    return u8ToB64(u8);
  };

  const T_SHAPE_PAYLOADS = SHAPES.map((pts, i) => buildShapePayload(pts, heads[i]));
  const T_SHAPE_SEED = heads.slice(0, 4);
  return { T_SHAPE_PAYLOADS, T_SHAPE_SEED };
};
function createTCasePayload(heads) {
  // 1) 케이스 10개 정의(recs)
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

  // 2) CASE payload 생성 (mode + recs) ----------------
  const buildCasePayload = (mode, recs, seed) => {
    // mode: 0(flat 1개), 1(nested 여러 개)
    const tokens = [mode | 0, recs.length | 0];
    for (const [ax, ay, sid] of recs) tokens.push(ax | 0, ay | 0, sid | 0);

    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed >>> 0);
    return u8ToB64(u8);
  };

  const T_CASE_PAYLOADS = CASE_RECS.map((c, i) => buildCasePayload(c.mode, c.recs, heads[i]));
  return { T_CASE_PAYLOADS };
}

// ———————————————————————————————————————————————————————
// { seed / hashs / NUMBER d, T d - payload } merge
// ———————————————————————————————————————————————————————
function mergePayload() {
  const { HASHES: HS } = buildHashs(); // card nums 와 매칭된 hash 배열의 마지막은 seed 임
  const { N_PAYLOADS: NP } = buildNumPayload(HS);
  const { T_SHAPE_PAYLOADS: TSP, T_SHAPE_SEED } = createTShape(HS);
  const { T_CASE_PAYLOADS: TCP } = createTCasePayload(HS);

  const shuffleArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // 0~9를 랜덤하게 shuffle
  const shuffled = shuffleArr
    .slice()
    .reduceRight((arr, _, i) => {
      const j = (Math.random() * (i + 1)) | 0; // 0 ~ i
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    }, shuffleArr.slice());
  // shuffle 된 순서대로 payload 정렬
  const shuffleStr = (arr) => pack(shuffled.map((n) => arr[n]));

  const HASHES = [
    ...shuffled.map((n) => HS[n]), // 0~9 재배열
    ...HS.slice(10), // 10~끝 유지
  ];
  const N_PAYLOADS = shuffleStr(NP);
  /* const T_SHAPE_PAYLOADS = pack(shuffled
    .filter((n) => n >= 0 && n < TSP.length) // 여기서는 0~3만 남음 -> [0,1,3,2]
    .map((n) => TSP[n])); */
  const T_SHAPE_PAYLOADS = pack(TSP);
  const T_CASE_PAYLOADS = shuffleStr(TCP);

  // console.log("hash : ", HASHES);
  // console.log("number payload String : ", N_PAYLOADS);
  // console.log("T shape payload String : ", T_SHAPE_PAYLOADS);
  // console.log("T case payload String : ", T_CASE_PAYLOADS);

  return {
    HASHES,
    N_PAYLOADS,
    T_SHAPE_SEED,
    T_SHAPE_PAYLOADS,
    T_CASE_PAYLOADS,
  };
};
// mergePayload();







// #######################################################
// CLIENT CODE ———————————————————————————————————————————
// #######################################################
import b64ToU8 from "./functions/b64ToU8.js";
import decryptInPlace from "./functions/decryptInPlace.js";

// ———————————————————————————————————————————————————————
// PARAMS ————————————————————————————————————————————————
// ———————————————————————————————————————————————————————
const PARAMS_CARD_CODE = TOKENS[9];






function dAdd(p, d) {
  p.setAttribute("d", d
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
  );
};
const editPos = {
  // 왼쪽 상단 숫자의 시작 M 변경
  f: (d) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${PARAMS_CARD_CODE === TOKENS[0] ? 10 + 8 : 10},${10}`
    );
  },
  // 오른쪽 하단 숫자의 시작 M 변경
  r: (d) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${PARAMS_CARD_CODE === TOKENS[0] ? Math.floor(parseInt(encryptSize.card.w) - 10 - 8) : Math.floor(parseInt(encryptSize.card.w) - 10 - parseInt(encryptSize.num.w))},${parseInt(encryptSize.card.h) - 10 - parseInt(encryptSize.num.h)}`
    );
  },
}

const encryptSize = {
  card: { w: 191, h: 297 }, // card size -> w: 191, h: 297
  num: { w: 18, h: 26 }, // number size -> w: 18, h: 26
  t: { w: 40, h: 40, ws: 36, hs: 36 }, // T size -> w: 40, h: 40, ws: 36, hs: 36
};

const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);
const container = document.getElementById("container");

const SVG_NS = "http://www.w3.org/2000/svg"; // "http://www.w3.org/2000/svg";
const svg = document.createElementNS(SVG_NS, "svg");
svg.setAttribute("width", encryptSize.card.w);
svg.setAttribute("height", encryptSize.card.h);
svg.setAttribute('viewBox', `0 0 ${encryptSize.card.w} ${encryptSize.card.h}`);






// ———————————————————————————————————————————————————————
// MAKE NUMBER ———————————————————————————————————————————
// [OEJNIHMKXT, GIZFNPTSVK, OCNLTGMFKS, DKHOXMIVEA, PDBIZUOFMJ, KFOUDBRZVI, MIPGSHDAUF, SJRWTDGUXH, HJZUTOXFQA, JRPFIGSBDN] 중 하나를 받아서, 해당하는 카드 숫자 d 의 배열을 리턴
// ———————————————————————————————————————————————————————

// - 결과 좌표 배열을 코드에 직접 쓰지 않음 (암호화된 base64 -> 복호 -> 토큰파싱)
// - 입력 문자열은 코드에 노출되지 않음 (해시값으로만 분기)
// - 복호/파싱은 입력 문자열 내용과 무관 (선택만 분기)

const dNumber = (_token) => {
  const { HASHES, N_PAYLOADS: NP } = mergePayload(); // server에서 받음
  const N_PAYLOADS = unpack(NP);
  // HASHES 에서 카드번호 10개만 추축해서 payloads 와 key: value로 병합
  const PAYLOADS = Object.fromEntries((HASHES.slice(0, 10)).map((k, i) => [k, N_PAYLOADS[i]]));

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

  const buildByIndex = (hash) => {
    const u8 = b64ToU8(PAYLOADS[hash]);
    decryptInPlace(u8, hash);
    const out = parseTokenStream(u8);
    return out;
  };

  return buildByIndex(fnv1a32(String(_token), HASHES[HASHES.length - 1]));
};

// ✅ 사용 예시
// const narr = dNumber(PARAMS_CARD_CODE);
// console.log(narr);
// const narr1 = dNumber(TOKENS[1]);
// console.log(narr1);
// const narr2 = dNumber(TOKENS[2]);
// console.log(narr2);
// const narr3 = dNumber(TOKENS[3]);
// console.log(narr3);

/**
 * shape(중첩 배열)을 SVG path 문자열 배열로 변환합니다.
 *
 * 지원 형태:
 * 1) [[dx,dy], [dx,dy], ...]                         -> ["M0,0 ... Z"]
 * 2) [ [[dx,dy],...], [[dx,dy],...] ]                -> ["M0,0 ... Z ... Z"]
 * 3) [ [ [[dx,dy],...], [[dx,dy],...] ], [ ... ] ]   -> ["M0,0 ...", "M0,0 ..."]
 */
function toSvgPathsN(input) {
  const isPair = (v) =>
    Array.isArray(v) &&
    v.length === 2 &&
    typeof v[0] === "number" &&
    typeof v[1] === "number";

  const isPath = (v) => Array.isArray(v) && v.length > 0 && isPair(v[0]);
  const isArrayOfPaths = (v) => Array.isArray(v) && v.length > 0 && isPath(v[0]);
  const isArrayOfArrayOfPaths = (v) => Array.isArray(v) && v.length > 0 && Array.isArray(v[0]) && isArrayOfPaths(v[0]);

  const samePair = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
  const ORIGIN = [0, 0];

  // 단일 path (점들의 배열) -> "M0,0 m... l... Z"
  const pathToD = (path) => {
    const startIdx = samePair(path[0], ORIGIN) ? 1 : 0;
    if (path.length <= startIdx) return "M0,0 Z";

    const [mx, my] = path[startIdx];
    let d = `M0,0 m${mx},${my}`;
    for (let i = startIdx + 1; i < path.length; i++) {
      const [x, y] = path[i];
      d += ` l${x},${y}`;
    }
    return d + " Z";
  };

  // compound: [path1, path2, ...] -> "M0,0 ... Z m... l... Z ..."
  // (여기서 핵심: 두 번째 서브패스부터는 절대 "M"을 쓰지 않음)
  const compoundToD = (paths) => {
    let d = pathToD(paths[0]); // 첫 서브패스는 M0,0 포함

    for (let p = 1; p < paths.length; p++) {
      const path = paths[p];

      const startIdx = samePair(path[0], ORIGIN) ? 1 : 0;
      if (path.length <= startIdx) continue;

      const [mx, my] = path[startIdx];
      d += ` m${mx},${my}`; // ✅ 여기서 "M" 금지, 반드시 상대 move

      for (let i = startIdx + 1; i < path.length; i++) {
        const [x, y] = path[i];
        d += ` l${x},${y}`;
      }
      d += " Z";
    }

    return d;
  };

  // 1) [[x,y], ...]
  if (isPath(input)) {
    return [pathToD(input)];
  }

  // 2) [[[x,y], ...], [[x,y], ...]]  -> 각각 따로
  if (isArrayOfPaths(input)) {
    return input.map(pathToD);
  }

  // 3) [ [path, path], [path, path] ] -> 각 요소 내부는 합쳐서 2개 리턴
  if (isArrayOfArrayOfPaths(input)) {
    return input.map(compoundToD);
  }

  throw new Error("지원하지 않는 입력 형태입니다.");
};
const d_num = toSvgPathsN(dNumber(PARAMS_CARD_CODE));







const pathNumber = {
  f: document.createElementNS(SVG_NS, "path"),
  r: document.createElementNS(SVG_NS, "path")
};
if (d_num.length === 1) {
  dAdd(pathNumber.f, editPos.f(d_num[0]));
  dAdd(pathNumber.r, editPos.r(d_num[0]));
} else if (d_num.length === 2) {
  dAdd(pathNumber.f, editPos.f(d_num[0]));
  dAdd(pathNumber.r, editPos.r(d_num[1]));
};
svg.appendChild(pathNumber.f);
svg.appendChild(pathNumber.r);





// ———————————————————————————————————————————————————————
// MAKE T ————————————————————————————————————————————————
// [OEJNIHMKXT, GIZFNPTSVK, OCNLTGMFKS, DKHOXMIVEA, PDBIZUOFMJ, KFOUDBRZVI, MIPGSHDAUF, SJRWTDGUXH, HJZUTOXFQA, JRPFIGSBDN] 중 하나를 받아서, 해당하는 카드 T d 의 배열을 리턴
// ———————————————————————————————————————————————————————

const dT = (_token) => {
  const { HASHES, T_SHAPE_SEED: TSS, T_SHAPE_PAYLOADS: TSP, T_CASE_PAYLOADS: TCP } = mergePayload(); // server에서 받음
  const T_SHAPE_PAYLOADS = unpack(TSP);
  const T_CASE_PAYLOADS = unpack(TCP);
  // HASHES 에서 카드번호 10개만 추축해서 payloads 와 key: value로 병합
  const CASE_PAYLOADS = Object.fromEntries((HASHES.slice(0, 10)).map((k, i) => [k, T_CASE_PAYLOADS[i]]));

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

  // --------- shape decode cache ---------
  // const shapeCache = new Array(4).fill(null);
  const getShape = (sid) => {
    // let v = shapeCache[sid];
    // if (v) return v;
    let v = null

    const u8 = b64ToU8(T_SHAPE_PAYLOADS[sid]);
    decryptInPlace(u8, TSS[sid]);
    v = parseNestedPoints(u8);

    // shapeCache[sid] = v;
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
  const buildByIndex = (hash) => {
    let cached = null;

    const u8 = b64ToU8(CASE_PAYLOADS[hash]);

    decryptInPlace(u8, hash);
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

    return cached;
  };

  // --------- exported function ---------
  return buildByIndex(fnv1a32(_token, HASHES[HASHES.length - 1]));
};

// ✅ 사용 예시
const tarr = dT(PARAMS_CARD_CODE);
console.log(tarr);

/**
 * - 단일 폴리곤: [ [Mx,My], [dx,dy], [dx,dy], ... ]  => ["M... m... l... Z"]
 * - 폴리곤 n개:  [ 폴리곤, 폴리곤, ... ]             => ["...", "...", ...]
 */
function toSvgPathsT(input) {
  const isPoint = (v) =>
    Array.isArray(v) &&
    v.length === 2 &&
    typeof v[0] === "number" &&
    typeof v[1] === "number" &&
    Number.isFinite(v[0]) &&
    Number.isFinite(v[1]);

  const isPolygon = (arr) => Array.isArray(arr) && arr.length > 0 && arr.every(isPoint);

  const polygonToPath = (poly) => {
    const [mx, my] = poly[0];
    let s = `M${mx},${my}`;

    for (let i = 1; i < poly.length; i++) {
      const [x, y] = poly[i];
      const cmd = i === 1 ? "m" : "l";
      s += ` ${cmd}${x},${y}`;
    }
    return s + " Z";
  };

  if (!Array.isArray(input) || input.length === 0) return [];

  // 1) 단일 폴리곤이면 => 문자열 1개짜리 배열
  if (isPolygon(input)) {
    return [polygonToPath(input)];
  }

  // 2) 폴리곤 묶음이면 => n개 문자열 배열
  if (input.every(isPolygon)) {
    return input.map(polygonToPath);
  }

  throw new TypeError("입력 형식이 올바르지 않습니다.");
};

const nt = toSvgPathsT(dT(PARAMS_CARD_CODE));
console.log("T : ", nt);







for (let i = 0; i < nt.length; i++) {
  const path = document.createElementNS(SVG_NS, "path");
  dAdd(path, nt[i]);
  svg.appendChild(path);
}






container.appendChild(svg);