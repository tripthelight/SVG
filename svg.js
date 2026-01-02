// 브라우저(클라이언트)에서 동작하는 ESModule 코드
// - 입력 문자열(10개)은 코드에 평문으로 존재하지 않음 (해시로만 매칭)
// - 결과 배열도 코드에 직접 작성하지 않음 (암호화된 페이로드를 "수식(난독 PRNG+복호+파싱)"으로 복원)
const __PAYLOADS = Object.create({
  0x550b0f8c: "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==",
  0xc47bb621: "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4=",
  0xb8d8452d: "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz" +
  "8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+Zka" +
  "Y54=",
  0x57e225f7: "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSS" +
  "EF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50ac" +
  "JDc=",
  0xef349a13: "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudq" +
  "t8+9XIyQIU5b",
  0x83af8ca7: "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPn" +
  "RA8Zw+UJo4Kr3E//vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kv" +
  "BsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEA" +
  "s46EkOI=",
  0x73f143c9: "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJi" +
  "snCW5Iofl3YUZ3tn9zN0",
  0x1bf3e70b: "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQ" +
  "mYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ=",
  0xe3d01ebf: "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh2" +
  "1M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4O+RJa6GAJD8SV" +
  "0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeS" +
  "gZv9rDY=",
  0x5a916730: "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAyd" +
  "OOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJ" +
  "we0rZfDc7gbY+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkC" +
  "YHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA==",
});

/*
const __PAYLOADS = Object.create(null);

// key = FNV-1a 32-bit hash (입력 문자열의 해시), value = 암호화된(base64) 바이너리
__PAYLOADS[0x550b0f8c] = "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==";
__PAYLOADS[0xc47bb621] = "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4=";

__PAYLOADS[0xb8d8452d] =
  "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz" +
  "8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+Zka" +
  "Y54=";

__PAYLOADS[0x57e225f7] =
  "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSS" +
  "EF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50ac" +
  "JDc=";

__PAYLOADS[0xef349a13] =
  "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudq" +
  "t8+9XIyQIU5b";

__PAYLOADS[0x83af8ca7] =
  "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPn" +
  "RA8Zw+UJo4Kr3E//vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kv" +
  "BsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEA" +
  "s46EkOI=";

__PAYLOADS[0x73f143c9] =
  "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJi" +
  "snCW5Iofl3YUZ3tn9zN0";

__PAYLOADS[0x1bf3e70b] =
  "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQ" +
  "mYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ=";

__PAYLOADS[0xe3d01ebf] =
  "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh2" +
  "1M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4O+RJa6GAJD8SV" +
  "0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeS" +
  "gZv9rDY=";

__PAYLOADS[0x5a916730] =
  "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAyd" +
  "OOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJ" +
  "we0rZfDc7gbY+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkC" +
  "YHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA==";
*/

function __fnv1a32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function __xorshift32(x) {
  x >>>= 0;
  x ^= (x << 13) >>> 0;
  x ^= x >>> 17;
  x ^= (x << 5) >>> 0;
  return x >>> 0;
}

// “어려운 수식” 기반 바이트 복호화(키스트림 생성)
function __decryptInPlace(u8, seed) {
  let s = (seed ^ 0xa5a5a5a5) >>> 0;

  for (let i = 0; i < u8.length; i++) {
    // i*0x9E3779B9 누산 + xorshift + 비선형 혼합
    const add = Math.imul(i, 0x9e3779b9) >>> 0;
    s = __xorshift32((s + add) >>> 0);

    const rot = ((s >>> 16) | (s << 16)) >>> 0;
    const mix = (Math.imul(s, 0x27d4eb2d) ^ rot) >>> 0;
    const k = mix & 0xff;

    u8[i] ^= k;
  }
}

function __b64ToU8(b64) {
  // 브라우저: atob 사용
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 0xff;
  return out;
}

function __i16LE(dv, off) {
  return dv.getInt16(off, true);
}

function __unscale(i16) {
  // 스케일(×10) 복원 + “의미 없는 0항”을 섞어 수식 난도를 올림 (값은 그대로)
  const q = i16 / 10;
  const z = Math.sqrt(2) - Math.sqrt(2); // 0
  return Math.round((q + z) * 10) / 10;
}

function __unpack(u8) {
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  let p = 0;

  const depth = dv.getUint8(p++);
  if (depth !== 1 && depth !== 2 && depth !== 3) throw new Error("bad payload");

  // counts 읽기
  let groupCount = 0;
  let pathCount = 0;
  let pathsPerGroup = null;
  let lens = null; // depth2: [len...], depth3: [[len...], ...]

  if (depth === 1) {
    const n = dv.getUint8(p++);
    const out = new Array(n);
    for (let i = 0; i < n; i++) {
      const x = __unscale(__i16LE(dv, p));
      const y = __unscale(__i16LE(dv, p + 2));
      p += 4;
      out[i] = [x, y];
    }
    return out;
  }

  if (depth === 2) {
    pathCount = dv.getUint8(p++);
    lens = new Array(pathCount);
    for (let i = 0; i < pathCount; i++) lens[i] = dv.getUint8(p++);

    const out = new Array(pathCount);
    for (let pi = 0; pi < pathCount; pi++) {
      const n = lens[pi];
      const path = new Array(n);
      for (let i = 0; i < n; i++) {
        const x = __unscale(__i16LE(dv, p));
        const y = __unscale(__i16LE(dv, p + 2));
        p += 4;
        path[i] = [x, y];
      }
      out[pi] = path;
    }
    return out;
  }

  // depth === 3
  groupCount = dv.getUint8(p++);
  pathsPerGroup = new Array(groupCount);
  lens = new Array(groupCount);

  for (let gi = 0; gi < groupCount; gi++) {
    const pc = dv.getUint8(p++);
    pathsPerGroup[gi] = pc;
    const l = new Array(pc);
    for (let pi = 0; pi < pc; pi++) l[pi] = dv.getUint8(p++);
    lens[gi] = l;
  }

  const out = new Array(groupCount);
  for (let gi = 0; gi < groupCount; gi++) {
    const pc = pathsPerGroup[gi];
    const grp = new Array(pc);
    for (let pi = 0; pi < pc; pi++) {
      const n = lens[gi][pi];
      const path = new Array(n);
      for (let i = 0; i < n; i++) {
        const x = __unscale(__i16LE(dv, p));
        const y = __unscale(__i16LE(dv, p + 2));
        p += 4;
        path[i] = [x, y];
      }
      grp[pi] = path;
    }
    out[gi] = grp;
  }
  return out;
}

// ✅ 요구사항 함수
function getResultArray(secretKey) {
  if (typeof secretKey !== "string") throw new TypeError("string required");

  const h = __fnv1a32(secretKey);
  const b64 = __PAYLOADS[h];
  if (!b64) throw new Error("unknown key");

  const bytes = __b64ToU8(b64);
  __decryptInPlace(bytes, h);

  return __unpack(bytes);
}

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

// PARAMS =================================================================
const PARAMS = "JRPFIGSBDN";

// VARIABLE ===============================================================
const encryptSize = {
  card: { w: "MTkx", h: "Mjk3" }, // card size -> w: 191, h: 297
  num: { w: "MTg=", h: "MjY=" }, // number size -> w: 18, h: 26
  t: { w: "NDA=", h: "NDA=", ws: "MzY=", hs: "MzY=" }, // T size -> w: 40, h: 40, ws: 36, hs: 36
};

// FUNCTIONS ==============================================================
function pathAddClass(p, c) {
  p.classList.add(c);
}
function dAdd(p, d) {
  p.setAttribute("d", d
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
  );
};

// 영문, 숫자 복호화 - 한글은 안됨
function safeBase64Decode(str) {
  try {
    return atob(str);
  } catch (e) {
    console.error('유효하지 않은 Base64:', e);
    return null;
  }
};
// 영문, 숫자 암호화 - 한글은 안됨
function safeBase64Encode(str) {
  try {
    return btoa(str);
  } catch (e) {
    // Unicode 문제일 가능성
    return btoa(unescape(encodeURIComponent(str)));
  }
};
// btoa / atob 암복호호 사용예시
// const eStr = safeBase64Encode(36); // 암호화
// console.log(eStr);
// const dStr = safeBase64Decode(eStr); // 복호화
// console.log(parseInt(dStr));
// console.log(dStr);

// 숫자 복호화
const dn = (n) => parseInt(safeBase64Decode(n));

// TODO: 인자로 받는 "OEJNIHMKXT"는 암호화 필요 - 
// "OEJNIHMKXT"는 x축 이동이 필요한 숫자 1
const editPos = {
  // 왼쪽 상단 숫자의 시작 M 변경
  f: (d) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${PARAMS === "OEJNIHMKXT" ? 10 + 8 : 10},${10}`
    );
  },
  // 오른쪽 하단 숫자의 시작 M 변경
  r: (d) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${PARAMS === "OEJNIHMKXT" ? Math.floor(parseInt(safeBase64Decode(encryptSize.card.w)) - 10 - 8) : Math.floor(parseInt(safeBase64Decode(encryptSize.card.w)) - 10 - parseInt(safeBase64Decode(encryptSize.num.w)))},${parseInt(safeBase64Decode(encryptSize.card.h)) - 10 - parseInt(safeBase64Decode(encryptSize.num.h))}`
    );
  },
}

/**
 * shape(중첩 배열)을 SVG path 문자열 배열로 변환합니다.
 *
 * 지원 형태:
 * 1) [[dx,dy], [dx,dy], ...]                         -> ["M0,0 ... Z"]
 * 2) [ [[dx,dy],...], [[dx,dy],...] ]                -> ["M0,0 ... Z ... Z"]
 * 3) [ [ [[dx,dy],...], [[dx,dy],...] ], [ ... ] ]   -> ["M0,0 ...", "M0,0 ..."]
 */
function toSvgPaths(input) {
  const isPair = (v) =>
    Array.isArray(v) &&
    v.length === 2 &&
    typeof v[0] === "number" &&
    typeof v[1] === "number";

  const isPath = (v) => Array.isArray(v) && v.length > 0 && isPair(v[0]);
  const isArrayOfPaths = (v) => Array.isArray(v) && v.length > 0 && isPath(v[0]);
  const isArrayOfArrayOfPaths = (v) =>
    Array.isArray(v) && v.length > 0 && Array.isArray(v[0]) && isArrayOfPaths(v[0]);

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
}

// SETTING ================================================================
const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);
const container = document.getElementById("container");

// SVG ====================================================================
const SVG_NS = "aHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc="; // "http://www.w3.org/2000/svg";
const svg = document.createElementNS(safeBase64Decode(SVG_NS), "svg");
svg.setAttribute("width", safeBase64Decode(encryptSize.card.w));
svg.setAttribute("height", safeBase64Decode(encryptSize.card.h));
svg.setAttribute('viewBox', `0 0 ${safeBase64Decode(encryptSize.card.w)} ${safeBase64Decode(encryptSize.card.h)}`);

// PATH ===================================================================
// number -----------------------------------------------------------------
const pathNumber = {
  f: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
  r: document.createElementNS(safeBase64Decode(SVG_NS), "path")
};

const d_num = toSvgPaths(getResultArray(PARAMS));

if (d_num.length === 1) {
  dAdd(pathNumber.f, editPos.f(d_num[0]));
  dAdd(pathNumber.r, editPos.r(d_num[0]));
} else if (d_num.length === 2) {
  dAdd(pathNumber.f, editPos.f(d_num[0]));
  dAdd(pathNumber.r, editPos.r(d_num[1]));
};

svg.appendChild(pathNumber.f);
svg.appendChild(pathNumber.r);

// T ----------------------------------------------------------------------
const pathT = {
  f: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
  r: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
}

// 1 ~ 8 에 사용되는 T
const dT = `
  M0,0
  m0,0
  l10,2 
  l20,0 
  l10,8 
  l-10,-2 
  l-6,0 
  l0,32 
  l-6,-8 
  l0,-24 
  l-10,0 
  Z
`;
// 1 ~ 8 에 사용되는 거꾸로 T
const dTR = `
  M0,0
  m16,0
  l6,8
  l0,24
  l10,0
  l8,8
  l-10,-2
  l-20,0
  l-10,-8
  l10,2
  l6,0
  Z
`;
// 9 ~ 10 에 사용되는 T
const dTs = `
  M0,0
  m0,0
  l8,2 
  l19,0 
  l9,8 
  l-9,-2 
  l-5,0 
  l0,28 
  l-5,-8 
  l0,-20 
  l-8,0 
  Z
`;
// 9 ~ 10 에 사용되는 거꾸로 T
const dTRs = `
  M0,0
  m14,0
  l5,8
  l0,20
  l8,0
  l9,8
  l-8,-2
  l-19,0
  l-9,-8
  l9,2
  l5,0
  Z
`;

function draw1Card() {
  // 중앙 : M75,128
  const posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
  const posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);

  const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
  const newD = dT
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
    .replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${posX},${posY}`
    );

  path.setAttribute('d', newD);
  svg.appendChild(path);
};
// draw1Card();

function draw2Card() {
  // 상 : M75,68
  // 하 : M75,188
  const posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
  let posY = 0;
  let newD = "";
  for (let i = 0; i < 2; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 위쪽 T
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 2));

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 아래쪽 T
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 2));

      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw2Card();

function draw3Card() {
  // 상 : M75,61
  // 중 : M75,128
  // 하 : M75,195
  const posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
  let posY = 0;
  let newD = "";
  for (let i = 0; i < 3; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 위쪽 T
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 중간 T
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 아래쪽 T
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));

      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw3Card();

function draw4Card() {
  // 좌상 : M35,61
  // 우상 : M115,61
  // 좌하 : M35,195
  // 우하 : M115,195
  let posX = 0;
  let posY = 0;
  let newD = "";

  for (let i = 0; i < 4; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 좌상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 우상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 좌하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 3) {
      // 우하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw4Card();

function draw5Card() {
  // 좌상 : M35,61 
  // 우상 : M115,61
  // 중앙 : M75,128
  // 좌하 : M35,195
  // 우하 : M115,195
  let posX = 0;
  let posY = 0;
  let newD = "";

  for (let i = 0; i < 5; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 좌상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 우상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 중앙 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 3) {
      // 좌하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 4) {
      // 우하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw5Card();

function draw6Card() {
  // 좌상 : M35,61 
  // 우상 : M115,61
  // 좌중 : M35,128
  // 우중 : M115,128
  // 좌하 : M35,195
  // 우하 : M115,195
  let posX = 0;
  let posY = 0;
  let newD = "";

  for (let i = 0; i < 6; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 좌상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 우상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 좌중 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 3) {
      // 우중 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 4) {
      // 좌하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 5) {
      // 우하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw6Card();

function draw7Card() {
  // 좌상 : M35,61 
  // 우상 : M115,61
  // 중상 : M75,95
  // 좌중 : M35,128
  // 우중 : M115,128
  // 좌하 : M35,195
  // 우하 : M115,195
  let posX = 0;
  let posY = 0;
  let newD = "";

  for (let i = 0; i < 7; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 좌상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 우상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 중상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        - ( dn(encryptSize.t.h) / 1.2)
      );
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 3) {
      // 좌중 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 4) {
      // 우중 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 5) {
      // 좌하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 6) {
      // 우하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw7Card();

function draw8Card() {
  // 좌상 : M35,61
  // 우상 : M115,61
  // 중상 : M75,95
  // 좌중 : M35,128
  // 우중 : M115,128
  // 중하 : M75,161
  // 좌하 : M35,195
  // 우하 : M115,195
  let posX = 0;
  let posY = 0;
  let newD = "";

  for (let i = 0; i < 8; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 좌상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 우상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 중상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        - ( dn(encryptSize.t.h) / 1.2)
      );
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 3) {
      // 좌중 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 4) {
      // 우중 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
      newD = dT
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 5) {
      // 중하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) / 1.2)
      );
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 6) {
      // 좌하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 7) {
      // 우하 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
      newD = dTR
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw8Card();

function draw9Card() {
  // 좌상상 : M35,61
  // 우상상 : M115,61
  // 좌상 : M35,108
  // 우상 : M115,108
  // 중앙 : M75,128
  // 좌하 : M35,148
  // 우하 : M115,148
  // 좌하하 : M35,195
  // 우하하 : M115,195
  let posX = 0;
  let posY = 0;
  let newD = "";

  for (let i = 0; i < 9; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 좌상상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 우상상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 좌상 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        - ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 3) {
      // 우상 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        + ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 4) {
      // 중앙 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
      );

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 5) {
      // 좌하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        - ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 6) {
      // 우하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        + ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 7) {
      // 좌하하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        - ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 8) {
      // 우하하 T
      // 좌하하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        + ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
// draw9Card();

function draw10Card() {
  // 좌상상 : M35,61
  // 우상상 : M115,61
  // 중상 : M75,88
  // 좌상 : M35,108
  // 우상 : M115,108
  // 좌하 : M35,148
  // 우하 : M115,148
  // 중하 : M75,168
  // 좌하하 : M35,195
  // 우하하 : M115,195
  let posX = 0;
  let posY = 0;
  let newD = "";

  for (let i = 0; i < 10; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    if (i === 0) {
      // 좌상상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 1) {
      // 우상상 T
      posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
      posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 2) {
      // 중상 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        - ( dn(encryptSize.t.h) )
      );

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 3) {
      // 좌상 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        - ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 4) {
      // 우상 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        + ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 5) {
      // 좌하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        - ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 6) {
      // 우하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        + ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 7) {
      // 중하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 8) {
      // 좌하하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        - ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    } else if (i === 9) {
      // 우하하 T
      posX = Math.floor(
        ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        + ( dn(encryptSize.t.w) )
      );
      posY = Math.floor(
        ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
      );

      newD = dTRs
        .trim() // 앞뒤 공백 제거
        .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
        .replace(
          /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
          `M${posX},${posY}`
        );
    };

    path.setAttribute('d', newD);
    svg.appendChild(path);
  }
};
draw10Card();

// ADD SVG ================================================================
container.appendChild(svg);
