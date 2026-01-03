import { safeBase64Decode } from "./fns/base64Crypt.js";
import dAdd from "./fns/dAdd.js";

export default (_d) => new Promise(resolve => {
  try {
    const { nCode, SVG_NS, svg } = _d;

    // --- (1) 입력 문자열 평문 노출 방지: 해시로만 분기 ---
    const H = (s) => {
      // FNV-1a 32 + fmix 스타일 후처리(충돌 낮춤)
      let h = 0x811c9dc5 >>> 0;
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
      }
      h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0;
      h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0;
      h ^= h >>> 16;
      return h >>> 0;
    };

    // 입력 문자열(평문) 없이, 해시값으로만 케이스 결정
    // (아래 숫자들은 "OEJNIHMKXT" 등 평문이 아닌 해시 결과 값)
    /* const CASE_BY_HASH = (() => {
      console.log("CASE_BY_HASH 실행");
      
      const m = Object.create(null);
      m[0xbec62b4d] = 1;
      m[0xa4afcbff] = 2;
      m[0xc7de9c8a] = 3;
      m[0x79bba94a] = 4;
      m[0xccebf413] = 5;
      m[0xceb9b54d] = 6;
      m[0x5b848f1e] = 7;
      m[0xc44bfa9c] = 8;
      m[0x2df2d4a7] = 9;
      m[0xb8af365e] = 10;
      return m;
    })(); */

    const CASE_BY_HASH = Object.create({
      0xbec62b4d: 1,
      0xa4afcbff: 2,
      0xc7de9c8a: 3,
      0x79bba94a: 4,
      0xccebf413: 5,
      0xceb9b54d: 6,
      0x5b848f1e: 7,
      0xc44bfa9c: 8,
      0x2df2d4a7: 9,
      0xb8af365e: 10,
    })

    // --- (2) base64 디코드 ---
    const B = (b64) => {
      const bin = atob(b64);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    };

    // --- (3) 도형(d/dr/ds/drs) 복호화: 코드에 원본 배열 없음 ---
    // 값 저장: byte = ((v + 64) XOR 0xA7), v는 int8 범위(-20..32 정도)
    const SHAPE_B64 = [
      "5+ft5fPn7e+RmZ3n58edn+ePkec=", // d
      "9+fh7+f/7efv75GZi+eRn+3l4ec=", // dr
      "5+fv5fTn7u+QmZzn5/ucn+eLn+c=", // ds
      "6efi7+fz7+fu75+ZiueQn+7l4uc="  // drs
    ];

    const DE_SHAPE = (idx) => {
      const k = (0xA7 ^ 0x00) | 0;     // 살짝 우회
      const off = (1 << 6) | 0;        // 64
      const raw = B(SHAPE_B64[idx]);
      const pts = new Array(raw.length >> 1);
      for (let i = 0, p = 0; i < raw.length; i += 2, p++) {
        // "매우 어려운 수식" 느낌: 불필요한 비트연산/우회 섞음
        const a = ((raw[i] ^ k) - off) | 0;
        const b = ((raw[i + 1] ^ k) - off) | 0;
        pts[p] = [a, b];
      }
      return pts;
    };

    const SHAPES = new Array(4);
    const shape = (idx) => (SHAPES[idx] ??= DE_SHAPE(idx));

    // --- (4) 케이스별 배치(좌표/도형 선택)도 암호화된 템플릿으로만 보관 ---
    // 템플릿 형식: [count, (shapeId,x,y)*]
    // 저장: byte = ((val + 17) XOR 0x5C)
    const CASE_TPL_B64 = [
      "", // 0 unused
      "Tk0AzQ==",
      "T00ACU4AkQ==",
      "SE0AEk0AzU4AiA==",
      "SU1oEk3YEk5oiE7YiA==",
      "Sk1oEk3YEk0AzU5oiE7YiA==",
      "S01oEk3YEk1ozU3YzU5oiE7YiA==",
      "RE1oEk3YEk0ALE1ozU3YzU5oiE7YiA==",
      "RU9oEk/YEk8ALE9ozU/YzUgA7khoiEjYiA==",
      "Rk9oEk/YEk9oIU/YIU8AzUho+UjY+UhoiEjYiA==",
      "R09oEk/YEk8ANU9oIU/YIUho+UjY+UgA5UhoiEjYiA=="
    ];

    const decodePlacements = (caseId) => {
      const k = (0x5C ^ 0x00) | 0;
      const off = (0x10 + 1) | 0; // 17
      const raw = B(CASE_TPL_B64[caseId]);

      const dec = (i) => (((raw[i] ^ k) - off) & 0xff) | 0;

      const n = dec(0);
      const out = new Array(n);
      let pos = 1;
      for (let i = 0; i < n; i++) {
        const sId = dec(pos++);      // 0..3
        const x = dec(pos++);        // 0..255
        const y = dec(pos++);        // 0..255
        out[i] = [sId, x, y];
      }
      return out;
    };

    // --- (5) 최종 결과 생성: 반환 배열 리터럴을 직접 작성하지 않음 ---
    const build = (caseId) => {
      const placements = decodePlacements(caseId);

      // case 1은 "단일 폴리곤 배열"을 바로 리턴해야 함
      if (caseId === 1) {
        const [sid, x, y] = placements[0];
        const pts = shape(sid);

        // [[x,y], ...pts] 형태를 계산으로 생성
        const one = new Array(pts.length + 1);
        one[0] = [x, y];
        for (let i = 0; i < pts.length; i++) one[i + 1] = pts[i];
        return one;
      }

      // 나머지는 "폴리곤들의 배열" 리턴
      const res = new Array(placements.length);
      for (let i = 0; i < placements.length; i++) {
        const [sid, x, y] = placements[i];
        const pts = shape(sid);

        const poly = new Array(pts.length + 1);
        poly[0] = [x, y];
        for (let j = 0; j < pts.length; j++) poly[j + 1] = pts[j];

        res[i] = poly;
      }
      return res;
    };

    // --- (6) 공개 함수 ---
    function getPattern(token) {
      if (!token) return null;
      const id = CASE_BY_HASH[H(token)];
      return id ? build(id) : null; // 매칭 없으면 null
    }

    /**
     * - 단일 폴리곤: [ [Mx,My], [dx,dy], [dx,dy], ... ]  => ["M... m... l... Z"]
     * - 폴리곤 n개:  [ 폴리곤, 폴리곤, ... ]             => ["...", "...", ...]
     */
    function toSvgPaths(input) {
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
    }

    const d = toSvgPaths(getPattern(nCode));

    for (let i = 0; i < d.length; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      dAdd(path, d[i]);
      svg.appendChild(path);
    }

    resolve();
  } catch (error) {
    throw error;
  }
});