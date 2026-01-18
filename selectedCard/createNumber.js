import { safeBase64Decode } from "./fns/base64Crypt.js";
import dAdd from "./fns/dAdd.js";
import editPos from "./fns/editPos.js";

export default (_d) => new Promise(resolve => {
  try {
    const { nCode, encryptSize, SVG_NS, svg } = _d;

    function buildPath(token) {
      // 1) token -> 32bit key (원문 문자열은 코드에 없음)
      const fnv1a32 = (str) => {
        let h = 0x811c9dc5;
        for (let i = 0; i < str.length; i++) {
          h ^= str.charCodeAt(i) & 0xff;
          h = Math.imul(h, 0x01000193) >>> 0;
        }
        return h >>> 0;
      };

      const KEY_XOR = 0xA5A5A5A5;
      const key = (fnv1a32(String(token)) ^ KEY_XOR) >>> 0;

      // 2) "리턴 배열"은 코드에 직접 쓰지 않고, 난독화된 페이로드(바이너리 base64)로만 보관
      //    (값은 수식으로 복원)
      const DATA_PACK = [
        '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'
      ].join('|');

      const SHAPE_PACK = [
        'BQA=',
        'CQA=',
        '//8CAAsACwA=',
        '//8CAAsACwA=',
        'DQA=',
        '//8CABEAEQA=',
        '//8CAAcABwA=',
        'FQA=',
        '//8CABEAEQA=',
        '//8CAP//AgAGAA4A//8CABAABQA='
      ].join('|');

      // 3) token 원문 없이(문자열 직접 노출 없이) 선택만 수행
      // const CASE = {
      //   4037978665: 1, // (fnv1a32("OEJNIHMKXT") ^ 0xA5A5A5A5) >>> 0
      //   1641943940: 2,
      //   494788744: 3,
      //   4064772178: 4,
      //   1251033014: 5,
      //   638200066: 6,
      //   3595888236: 7,
      //   3193324206: 8,
      //   1182120730: 9,
      //   4281647765: 10
      // };
      const CASE = {
        2179877959: 1,
        267243455: 2,
        2469785277: 3,
        1722792345: 4,
        1256322563: 5,
        4136858122: 6,
        1523635824: 7,
        3675746130: 8,
        1430564634: 9,
        692104513: 10,
      };

      const idx = CASE[key];
      if (!idx) return null;

      // 4) base64 -> bytes
      const b64ToBytes = (b64) => {
        const bin = atob(b64);
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 255;
        return out;
      };

      // 5) "매우 어려운 수식" 느낌으로 값 복원 (정확히 원래 값으로 돌아오도록 설계)
      const A = 31337n;
      const B = 12345n;
      const K = 999983n; // 의미 없는 소수(노이즈)

      const recoverInt = (w) => {
        // stored = scaledInt*A + B  (scaledInt = value*10)
        // scaledInt = ((stored - B) * K) / (A * K)
        const W = BigInt(w);
        const t = (W - B) * K;
        const n = t / (A * K);
        return Number(n);
      };

      const decodeI32 = (bytes) => {
        const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const out = [];
        for (let off = 0; off < bytes.length; off += 4) out.push(dv.getInt32(off, true));
        return out;
      };

      const decodeI16 = (bytes) => {
        const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const out = [];
        for (let off = 0; off < bytes.length; off += 2) out.push(dv.getInt16(off, true));
        return out;
      };

      // shape는 "중첩 구조"만 저장 (리턴 배열 값 자체는 저장하지 않음)
      // 인코딩 규칙: -1, len, ... (리스트 시작), 양수면 leaf(포인트 개수)
      const parseShape = (arr) => {
        let p = 0;
        const walk = () => {
          const t = arr[p++];
          if (t === -1) {
            const n = arr[p++];
            const r = [];
            for (let i = 0; i < n; i++) r.push(walk());
            return r;
          }
          return t;
        };
        return walk();
      };

      const dataB64 = DATA_PACK.split('|')[idx - 1];
      const shapeB64 = SHAPE_PACK.split('|')[idx - 1];

      const rawI32 = decodeI32(b64ToBytes(dataB64));
      const flat = [];
      for (let i = 0; i < rawI32.length; i++) {
        const scaledInt = recoverInt(rawI32[i]);
        // 수식 노이즈(값 유지)
        flat.push((scaledInt + scaledInt * 0) / 10);
      }

      const shape = parseShape(decodeI16(b64ToBytes(shapeB64)));

      // flat -> 최종 중첩 배열 복원
      let cursor = 0;
      const build = (sh) => {
        if (typeof sh === 'number') {
          const pts = [];
          for (let i = 0; i < sh; i++) {
            const x = flat[cursor++];
            const y = flat[cursor++];
            pts.push([x, y]);
          }
          return pts;
        }
        const out = [];
        for (let i = 0; i < sh.length; i++) out.push(build(sh[i]));
        return out;
      };

      return build(shape);
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

    const pathNumber = {
      f: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
      r: document.createElementNS(safeBase64Decode(SVG_NS), "path")
    };

    const dd = buildPath(nCode);
    console.log(dd);
    
    
    const d_num = toSvgPaths(dd);
    
    if (d_num.length === 1) {
      dAdd(pathNumber.f, editPos.f(d_num[0], nCode));
      dAdd(pathNumber.r, editPos.r(d_num[0], nCode, encryptSize));
    } else if (d_num.length === 2) {
      dAdd(pathNumber.f, editPos.f(d_num[0], nCode));
      dAdd(pathNumber.r, editPos.r(d_num[1], nCode, encryptSize));
    };
    
    svg.appendChild(pathNumber.f);
    svg.appendChild(pathNumber.r);

    resolve();
  } catch (error) {
    throw error;
  }
});