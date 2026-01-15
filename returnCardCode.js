/*
[79, 69, 74, 78, 73, 72, 77, 75, 88, 84]
[71, 73, 90, 70, 78, 80, 84, 83, 86, 75]
[79, 67, 78, 76, 84, 71, 77, 70, 75, 83]
[68, 75, 72, 79, 88, 77, 73, 86, 69, 65]
[80, 68, 66, 73, 90, 85, 79, 70, 77, 74]
[75, 70, 79, 85, 68, 66, 82, 90, 86, 73]
[77, 73, 80, 71, 83, 72, 68, 65, 85, 70]
[83, 74, 82, 87, 84, 68, 71, 85, 88, 72]
[72, 74, 90, 85, 84, 79, 88, 70, 81, 65]
[74, 82, 80, 70, 73, 71, 83, 66, 68, 78]
*/

/* function swapPairs(str) {
  const arr = [...str];
  for (let i = 0; i + 1 < arr.length; i += 2) {
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
  }
  return arr.join("");
};

function swapReverse(str) {
  if (str.length % 2 === 1) {
    // 홀수: 마지막 글자를 맨 앞으로
    str = str.slice(-1) + str.slice(0, -1);
  }
  // 짝수/홀수 공통: 짝수번째(2,4,...) 글자를 앞글자 앞으로 => pair swap
  return swapPairs(str);
}; 
function swap(str) {
  if (str.length % 2 === 1) {
    // 홀수: 맨 앞글자를 맨 뒤로
    str = str.slice(1) + str[0];
  }
  // 짝수/홀수 공통: pair swap (fn1의 역연산)
  return swapPairs(str);
};*/

console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————

function createP() {
  // ------------------------------
  // 1) 난독화(P) 생성기
  // ------------------------------
  function makeP({
    // keysByRow: 길이 10, 각 원소는 길이 10의 [a,b,c] 배열들
    // 즉 총 100개의 3-튜플 키
    keysByRow,
    // outs: 길이 10, 각 원소는 길이 10의 결과 숫자 배열
    // 질문에 적어주신 10개 배열이 여기에 들어갑니다.
    outs,
    // 출력 P 조각 개수(기본 14)
    pieces = 14,
    // seed (복호화쪽과 맞춰야 함)
    seed = 0xa5f1523d,
  } = {}) {
    // ---- 유효성 최소 검사 (코드 복잡도는 유지하면서도 안전)
    if (!Array.isArray(keysByRow) || keysByRow.length !== 10) {
      throw new Error("keysByRow는 길이 10이어야 합니다.");
    }
    if (!Array.isArray(outs) || outs.length !== 10) {
      throw new Error("outs는 길이 10이어야 합니다.");
    }

    const REC = 16; // [u16,u16,u16] + [10 bytes]
    const totalRecs = 10 * 10;
    const raw = new Uint8Array(totalRecs * REC);
    const dv = new DataView(raw.buffer);

    // ---- (A) 직렬화: 100 레코드 채우기
    // row r (0..9): keysByRow[r][c] 중 하나를 받으면 outs[r]를 리턴해야 하므로
    // 각 row마다 10개의 키를 동일 output과 함께 저장
    let recIndex = 0;

    for (let r = 0; r < 10; r++) {
      const rowKeys = keysByRow[r];
      const outArr = outs[r];

      if (!Array.isArray(rowKeys) || rowKeys.length !== 10) {
        throw new Error(`keysByRow[${r}]는 길이 10이어야 합니다.`);
      }
      if (!Array.isArray(outArr) || outArr.length !== 10) {
        throw new Error(`outs[${r}]는 길이 10이어야 합니다.`);
      }

      for (let c = 0; c < 10; c++) {
        const key = rowKeys[c];
        if (!Array.isArray(key) || key.length !== 3) {
          throw new Error(`keysByRow[${r}][${c}]는 [a,b,c]여야 합니다.`);
        }

        const a = key[0] | 0;
        const b = key[1] | 0;
        const cc = key[2] | 0;

        const off = recIndex * REC;

        // u16LE 3개 (0..65535 범위를 벗어나면 하위 16비트만 저장됨)
        dv.setUint16(off + 0, a & 0xffff, true);
        dv.setUint16(off + 2, b & 0xffff, true);
        dv.setUint16(off + 4, cc & 0xffff, true);

        // output 10 bytes (0..255 가정. 아니면 하위 8비트만 저장)
        for (let i = 0; i < 10; i++) {
          raw[off + 6 + i] = outArr[i] & 0xff;
        }

        recIndex++;
      }
    }

    // ---- (B) 스트림 XOR (암/복호화 동일)
    xorStreamInPlace(raw, seed);

    // ---- (C) Base64 인코딩
    const b64 = u8ToB64(raw);

    // ---- (D) 조각내기 + 홀수 인덱스 뒤집기
    const P = splitAndScramble(b64, pieces);

    return P;
  }

  // ------------------------------
  // 2) 내부 유틸들
  // ------------------------------
  function xs32(seed) {
    let x = seed >>> 0;
    return () => {
      x ^= (x << 13) >>> 0;
      x ^= x >>> 17;
      x ^= (x << 5) >>> 0;
      return x >>> 0;
    };
  };

  function xorStreamInPlace(u8, seed) {
    const next = xs32(seed);
    for (let i = 0; i < u8.length; i++) {
      const r = next();
      // 기존 코드와 같은 느낌의 키 생성(인덱스 섞기 + 바이트 선택)
      const k = ((r ^ Math.imul(i, 0x9e3779b9)) >>> ((i & 3) << 3)) & 0xff;
      u8[i] ^= k;
    }
    return u8;
  };

  function u8ToB64(u8) {
    // 브라우저 우선
    if (typeof btoa === "function") {
      let bin = "";
      // 큰 데이터도 버티도록 chunk 처리
      const CH = 0x8000;
      for (let i = 0; i < u8.length; i += CH) {
        const part = u8.subarray(i, i + CH);
        bin += String.fromCharCode(...part);
      }
      return btoa(bin);
    }
    // Node.js
    return Buffer.from(u8).toString("base64");
  };

  function splitAndScramble(b64, pieces) {
    const n = Math.max(2, pieces | 0);
    const len = b64.length;

    // 길이를 n등분하되, 앞쪽이 1글자씩 더 가지도록 분배
    const base = (len / n) | 0;
    const extra = len - base * n;

    const out = new Array(n);
    let pos = 0;

    for (let i = 0; i < n; i++) {
      const take = base + (i < extra ? 1 : 0);
      let chunk = b64.slice(pos, pos + take);
      pos += take;

      // 홀수 인덱스는 뒤집기
      if (i & 1) chunk = chunk.split("").reverse().join("");

      out[i] = chunk;
    }
    return out;
  };

  // 사용 예시
  const P = makeP({
    keysByRow: [
      [[2645,527,1193], [901,1165,2892], [1375,1701,2046], [1970,214,300], [2728,219,657], [850,2700,2196], [298,1100,1629], [2036,1379,536], [2047,1841,663], [967,2269,1013]],
      [[1425,2932,51], [35,2469,550], [807,943,2727], [897,107,1440], [687,1507,1835], [2402,933,239], [1569,165,567], [63,1792,1187], [2342,1347,2293], [301,727,2614]],
      [[1994,2775,78], [828,2735,1311], [2150,110,1769], [2297,2647,3000], [1176,1284,1032], [1178,2093,1331], [2584,2474,2431], [1544,1399,2284], [196,467,2900], [380,2544,1495]],
      [[2357,290,1173], [289,21,1488], [2394,1644,2076], [318,1929,503], [1097,2257,2103], [884,177,1887], [2749,605,1782], [1798,499,2325], [2646,737,769], [1940,2984,2758]],
      [[2371,249,1596], [2356,116,2812], [1721,232,1276], [644,1607,1866], [1582,2136,2234], [2089,1597,1986], [2567,2488,823], [2413,1214,571], [1129,594,2930], [2585,1966,1822]],
      [[1811,2220,235], [1296,2468,2684], [780,2116,1751], [2923,2894,1756], [2785,120,1453], [1920,2460,1871], [321,65,1516], [2945,964,1264], [1247,2004,615], [265,1838,1289]],
      [[1318,1338,991], [2534,1931,2443], [2880,2201,87], [2393,29,2381], [966,2060,2533], [1878,1034,2422], [554,1427,1908], [2367,779,2082], [1998,282,799], [1309,1466,2640]],
      [[1367,809,1033], [2689,1862,1670], [1848,924,2751], [820,1922,39], [2766,477,2343], [2193,125,709], [2267,2750,1517], [2063,341,413], [166,1057,2511], [835,679,1062]],
      [[1230,2755,2198], [814,1646,1700], [462,416,342], [272,635,2497], [2266,935,1982], [1239,1645,2579], [2961,2275,959], [529,1255,2583], [1556,1091,2147], [1608,1563,711]],
      [[565,1807,1672], [2973,308,947], [1014,970,1736], [622,903,1774], [84,883,355], [906,2011,1224], [2979,2854,630], [1119,2179,2779], [167,2521,587], [2141,43,2039]],
    ],
    outs: [
      [79, 69, 74, 78, 73, 72, 77, 75, 88, 84],
      [71, 73, 90, 70, 78, 80, 84, 83, 86, 75],
      [79, 67, 78, 76, 84, 71, 77, 70, 75, 83],
      [68, 75, 72, 79, 88, 77, 73, 86, 69, 65],
      [80, 68, 66, 73, 90, 85, 79, 70, 77, 74],
      [75, 70, 79, 85, 68, 66, 82, 90, 86, 73],
      [77, 73, 80, 71, 83, 72, 68, 65, 85, 70],
      [83, 74, 82, 87, 84, 68, 71, 85, 88, 72],
      [72, 74, 90, 85, 84, 79, 88, 70, 81, 65],
      [74, 82, 80, 70, 73, 71, 83, 66, 68, 78]
    ],
    pieces: 14,          // P 조각 수
    seed: 0xa5f1523d,    // decode쪽 seed와 동일해야 함
  });

  // console.log(JSON.stringify(P));

};
// createP();


console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————

function wd() {
  const weirdDecode = (() => {
    /* const P = [
      "Nin5Qzo9+g/ONoVuKmySlOxy7h9URJNQAyyLod/HFKiVyj7v5mk6/LqGseujpqhiS9e/shRkiUh35OBoWLPTdBONK0QdLKX0uI62YaLuZ0YL+5nemll5KD/BTAgq6twxW7T0ApFu2Zn6PABHd6uq2fLtIgtVqY9b",
      "mMeU8GgEQFvCoa01lLvUKiN9iJVOhcXH40ZJjUrg9jau8UwB53hQGB0qTyv51AtSRkh81k5M9tQuay383XHjBa7CPiAO2rPJbbr8toJcpx8rKnVuvelutk8gcU7Xxo5Q0eXHndw2UIryA/dETvpy8dhYlilugP+E",
      "OPpjKfZQNwtK944LgxfqNVC08Ns0lgPBkoSas0sAJOIWw1tQ9XmLjV74RBrPaLkqtsl59eJVGugGmCikWBOYrZ/CHK+Vd4Xdsd2m1L3Sd8bq86vyt1mkO7lXFMruXr+0UcFJLXRTAr3uTma8ch/thaRPeteSYwQ2",
      "hGQEUoPnIpZKoOLMHGSrtliAgRc5E5qoqMRgDlaZ3dOjBZ9d9CDAcEM7ncSKdH+GVcUztFztasQS8MnTNYbhFJknvVkA2wBvqwEPTuHaoVdLbcv/GX2RnfN7/fhAsda1QtHkDVEsnCwOCV+t029xBgmri9GNT4Ny",
      "rlFwxuf6Tyfo0DDCO0FsbHpY6VLWDt2asuV+lec77dhidTaETFbOznzvQKM3/uA6WOpjNoIfxJGBsLEWYb0U/smigt9ffV0f7vZbYAq8vjXh0nMIjQw9/91QtpB1YsqoD5C5mvNgSfVwN2hK9UVMp3uRMV3G5nLT",
      "UOPW5Abl85SSvmwgs6fF1TwOQss41NiLBSQYQHLWoezXFIG2qfbHlSVUI7UHTtWd1u3tZGMDSiZzaO2S9pJQDi9Bjq2rGjArvQY8ZX20mJ5h7YNKKrvly/jrhGxwN8arBvkcumonWZiiwxQvlCB+Z7brkPuw2k0Q",
      "iII2JYtIC3EWodFF2Y0VvfeDa1rtKq45VPkViqkzul+Uu+Llz4IkubpU/zpucrW3tLHea1yWJE9RszVo/ci4gfaLzZe1DHIn+Cfv/cr2Wur/DA1NDKakdCb46QsFeU+gsX6xREkOlfNlE8Ki6VMn+pDW3xGpZDih",
      "r3PUwi8kAiCaWhnHw0Tc+rTcBsdlchC9kxLkw0xTS8bWwjzE94VyLaQsZNNm+V0AgIRaFajBzI5eoBLtLyxuaiYvXDeW52brj7LU7sKO9BVBqb/qmQLYuRS8qkzGBItjJFLQ7jBoWD+Wy7XZoAH7RPOLgAHYxTTh",
      "unjN5MRypbhtgZKxkE1rw7xxMbAtTMOJmaLXC6XHFZB1RfUWl2hfkleweGgUrkSw+nDNcZvrjepR8p8qL2rzzLRGhLaP8NRQnpQjvzQeZSbw6DIMVjto2iWTPcLkgmv1DtGjaZsoB3EMXjDC2Zl1zoj6Lggu5P+4",
      "oTm2aQLZ4AdMPcEgshTCOla7X0WLidGiysFc89GW/2xe4jfyNTRrAC1JgEXf6wQBHXj+rwvEaYDrh+UF3Jn/PEID52k8T1VZRay0FtckPU4MhHV5K0Td7vfkrshRYLNwucdD58AxvuYdaLpYkiNPYBclDCBcT/7d",
      "K2L3fyz4Iwsw8AygTs8PiM295I3+IETSoo9jZ3/8DvLxqSBsj2XMNWU1E37l5e3tMz2v8AKk0v1N1FmcmO/yBXBbRea/kVJacVWT3RJQnfzewkbsG78z5eNAMIXewhJ7vCq60eEHziNDHItbjXs3Ff1j4u9d7ziE",
      "CzevpfKG7UNL1YWCFu3cMZh8SeX0fRj8OoYdyyMxQR3oF4mSJoqTSrM/DYUQgD829/O3+k4StCyuPngYulwbMOOp6iEPgXA4lSVPFt29ZxEELZd8pJzOB0185ofgfFhBLg7O35lQ2n+/LV0pFHAYg3LKNai1zi+b",
      "gVXSSCzv1k5GB5/y/6tPS9/wXXi5+nFluN6mcgIWa3cyeu7Z1MKOrjx7ADpE33FKYhki/mAp6/R61Mk8Rkp/dMleXNVQe4WcJ2hQvSi+Rhx/fsU6/t4VwQp1vQMRT4NDoqTs8j7cu/0A+ic8uelj2Q4Pu8g3a5on",
      "==guF6KUQABFrFYOLwKpr4KQoOdzMTi1TeP9kNgSuGtc6XhPTlf9FEOS",
    ]; */

    // (입력/출력 숫자들이 코드에 그대로 노출되지 않도록) 데이터는 난독화된 문자열 조각으로만 보관
    // 난독화 코드 규칙 :
    // 짝수번째 문자 : 짝수번째 문자를 바로 앞 문자로 이동시켜 놓음
    // 홀수번째 문자 : 맨 뒤에 있는 문자를 맨 앞으로 보내고, 짝수번째 문자를 바로 앞 문자로 이동시켜 놓음
    /* const P = [
      "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",
      "==ug6FUKAQFBFrOYwLpK4rQKOozdTM1ieT9PNkSgGuctX6PhlT9fEFSO",
    ]; */

    const P = [
      "cyZSSO8z/gzLLYhkNX2ciad1oBGOR5RfEzeWpsrKHb2nxiXtI2wl/bKBovahq718pNhCss9ijF9t7OBnRrrPbseGAE1bK6XyvIyrbqLjdEF/8",
      "GB0qb2H7/MtTbow9oQYJ0lxuZ+nI5nVjcuLCdiBIrvvLbz7+TFZGlRwsKf0sjq0o1Y8ndU4VRGZFmq3FudQwdgqxCXNpXHKx82gfsaUtgveCMpYrF2wipD/ynGqfHpRNgX52hprAyK7JuIt8zAxSJ/CJxl1+RbV",
      "Qh35BwU8ufL2V79uJYk7FWY7LUFk+tsMWCzmPka/B+lfBgSnRPgnCPBKII1YPwda/4kTmg/kKra",
      "knMFMVqM42F87XV835taHT6w8edpX3od3zKGDb3rYqhX2KyiTcuFYtP87Fc0goabSfgUxz0jIm3wWlnyc0vKYI1qdyogNvwl2PNix",
      "TayvZcSRIodeAr3uTma8",
      "BHUUfgK55Loe7yOewqjOzH8tN4Ud7ovcBjLPK+8hklcpMa4CSGdQM6rszLuxukAklyk5DsRUxQ+MH1MABjbeFgoxUDxchog4kPUbn1uVmNIQO9FXGX77N87jDAqDaeIZWhaJlqtSRMK5OP16vyppHoytmPf0tz+8wYNWdSN9Xht/hc",
      "Kmg1L4zg33RC/u0zzIP1Fifm9QiFL6AcmVuON8jeEr5dNxeIuKZ1bOznzvQKM3/uA6YeFSOEId0J6LtrMOZ60c9V+ih9APd1IS6exHbxGwrT1h1qENygk28d9R",
      "MGdCIwNy2F9VoS2wtDnaXvVfgv54J9WRmHkxkjmUtJDbvjo7TuiiBzEi6nBvkcumonWZiiwhw4nCU87fLsn3+y6EVWSXW5s9lXRWEqNF17AlnPox+RnZ2mXqp59e9fxV5p",
      "SComC032oXFVnMSlaoAan9xX4eXDmpxLBSYh",
      "LmPlKAObuckYxXJsrEcWEJFMJEgIlf+OWuo6mgZzR3Og/i2bFTCgMUcN8mxCPX6",
      "645VPkViqkzul9auXrqgoI+r6hb7Chydryz1LSibieYP01cryt/4NSjgrqLbJICD20m8CD84Mj7T/TQCA5P+KOgcSfh+Q4aZVK6IHFTSrMCjf94EdKk/Fwp+7bU1x0jZDyigC/8am8xIv4d5+cq8nrzT",
      "40yWqQqc5rmvbUjvEhcTyTEh0Idu9LCOe+vGDouLrOVp2Luv3LVLr6RxFkCp3evsMqcxty9vM8EgP9LONKW63RrF//",
      "7Bjf+WEEQPhpgkLBr4TtWh90IcTiteX8xC3VZZS+aj8erXO7jNHcs4Ypzp7R3iIixmUdm0d97N7PqTsGFg6vNC6zNGIIsRMIZ3m9Cn0W+cXUfqVy8pX4jcMPrhOhJ+pQvIn3jyy1BC7ax89NLnpU5sCMddC5f528Cm",
      "==AvZmLRT0QBplJIFwXpdz60u+s2YfyyCWP79VwJl+acegQMXde9YsuV285ZFAsVDczw/B+pzci8aouvZb7/vpqXGFpXWQhu1Bg2Yod2+sLdXOxU6OStNtXLEeYfNWNiWd0ctJ1R5Q8xlBu6qMS/dHR7X532apTHxJyvLCMFfDSfchnaCgBe3eNo89n+LsHixTxQehK69XoBGVV0qvnSnLlkKveojrKC7AMI2IWGLSidIkx5WyX2CdC+Wg4e/sMAU5woF4mSJoqTSrM/PU/QpFM52PP3pMZRxiTtX7QImJgYkOOp6iEPgXA4lSlNAwmOcVlARZN5hJjIVQF9+oAiv4hFLg7O35lQ2n+/LRUBDnzZk3LKNai1zi+bEiD5coepgJSHwc2hWtJHW9SzGog3I5iE7Zg0PfIPaFP5/07St3SwE+/kWFQyJSUeZZ0n+ceTbRxBnzPkNelydNf0leH/WvzuuP+42rWCk0mNYPWOoZ5oRB/GvfndtFpscfkIZFYH3K5iBkcX0aR44gwNw/dfdt2lhnX2U0LagoMMYs0dtBvAhCK5EInJiVGgyAUeaqWo9mzZ4b+wBnAtY+1OokVeXygwEvD/4gOCL4zr12EM3RD9x+YAt6k/U10ZSiD1TlsoNwhJ/bF7FojflH/kkg3SPN9Ri8sCyIRzhmJeHr5DnC5P/DclDCBcT/7d4+f5Hygr6HVyx5ZxFfDTGInAlwvadd98gXXht3sOYuD0qlD"
    ];

    // 짝수길이 문자열 : 짝수번째 문자를 바로 앞 문자로 이동
    // 홀수길이 문자열 : 맨 앞에 있는 문자를 맨뒤로 보내고, 짝수번째 문자를 바로 앞 문자로 이동
    const swapPairs = (str) => {
      const arr = [...str];
      for (let i = 0; i + 1 < arr.length; i += 2) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
      return arr.join("");
    };
    const swap = (str) => {
      if (str.length % 2 === 1) {
        // 홀수: 맨 앞글자를 맨 뒤로
        str = str.slice(1) + str[0];
      }
      // 짝수/홀수 공통: pair swap (fn1의 역연산)
      return swapPairs(str);
    };

    const B64 = (() => {
      // 홀수 인덱스 조각은 뒤집어서 저장되어 있으므로 여기서 다시 뒤집어 복원
      let s = "";
      for (let i = 0; i < P.length; i++) {
        const t = P[i];
        // const t = swap(P[i]);
        s += (i & 1) ? t.split("").reverse().join("") : t;
      }
      return s;
    })();

    const b64ToU8 = (s) => {
      s = String(s).replace(/[^A-Za-z0-9+/=]/g, "");
      if (typeof atob === "function") {
        const bin = atob(s);
        const u8 = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i) & 255;
        return u8;
      }
      // Node.js fallback
      return Uint8Array.from(Buffer.from(s, "base64"));
    };

    const xs32 = (seed) => {
      let x = seed >>> 0;
      return () => {
        x ^= (x << 13) >>> 0;
        x ^= x >>> 17;
        x ^= (x << 5) >>> 0;
        return (x >>> 0);
      };
    };

    const decryptInPlace = (u8) => {
      const next = xs32(0xa5f1523d);
      for (let i = 0; i < u8.length; i++) {
        const r = next();
        const k = ((r ^ Math.imul(i, 0x9e3779b9)) >>> ((i & 3) << 3)) & 255;
        u8[i] ^= k;
      }
      return u8;
    };

    const raw = decryptInPlace(b64ToU8(B64));
    const dv = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    const mix = (x) => {
      x |= 0;
      x ^= x >>> 16;
      x = Math.imul(x, 0x7feb352d);
      x ^= x >>> 15;
      x = Math.imul(x, 0x846ca68b);
      x ^= x >>> 16;
      return x >>> 0;
    };

    const REC = 16;

    return (tri) => {
      const a = ((tri && tri[0]) ?? 0) | 0;
      const b = ((tri && tri[1]) ?? 0) | 0;
      const c = ((tri && tri[2]) ?? 0) | 0;

      // 의미 없는 태그(복잡도 증가용)
      const tag = mix(a ^ (b << 11) ^ (c << 22));

      for (let off = 0; off < raw.byteLength; off += REC) {
        const ra = dv.getUint16(off, true);
        const rb = dv.getUint16(off + 2, true);
        const rc = dv.getUint16(off + 4, true);

        if (((ra ^ a) | (rb ^ b) | (rc ^ c)) === 0) {
          // "배열을 직접 리턴": 중간 리스트 만들지 않고 바로 반환
          return Array.from({ length: 10 }, (_, i) => raw[off + 6 + i] ^ ((tag >>> ((i & 3) << 3)) & 0));
        }
      }

      throw new Error("지원하지 않는 입력입니다.");
    };
  })();

  const r = weirdDecode([1608,1563,711]);
  console.log(r);
};
wd();



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————

function createP2() {
  function makeP({
    keysByRow,
    outs,
    pieces = 14,
    seed = 0xa5f1523d,

    // ✅ 추가: 조각 모양(길이 분포) 제어
    // mode:
    // - "even"  : 기존처럼 균등 분배(기본)
    // - "random": 가변/랜덤 길이(재현 가능)
    split = {
      mode: "random",
      // 랜덤 가변 분할용 시드(같은 값이면 항상 같은 P 모양)
      splitSeed: 0x6d2b79f5,
      // 최소/최대 조각 길이(너무 작으면 조각이 과도하게 많아지거나 비정상적으로 보일 수 있음)
      minPieceLen: 32,
      maxPieceLen: 220,
      // "random"일 때, 마지막 조각이 너무 짧아지면 이전 조각과 합치기 기준
      minLastLen: 16,
    },
  } = {}) {
    if (!Array.isArray(keysByRow) || keysByRow.length !== 10) {
      throw new Error("keysByRow는 길이 10이어야 합니다.");
    }
    if (!Array.isArray(outs) || outs.length !== 10) {
      throw new Error("outs는 길이 10이어야 합니다.");
    }

    const REC = 16;
    const totalRecs = 10 * 10;

    const raw = new Uint8Array(totalRecs * REC);
    const dv = new DataView(raw.buffer);

    // (A) 직렬화
    let recIndex = 0;
    for (let r = 0; r < 10; r++) {
      const rowKeys = keysByRow[r];
      const outArr = outs[r];

      if (!Array.isArray(rowKeys) || rowKeys.length !== 10) {
        throw new Error(`keysByRow[${r}]는 길이 10이어야 합니다.`);
      }
      if (!Array.isArray(outArr) || outArr.length !== 10) {
        throw new Error(`outs[${r}]는 길이 10이어야 합니다.`);
      }

      for (let c = 0; c < 10; c++) {
        const key = rowKeys[c];
        if (!Array.isArray(key) || key.length !== 3) {
          throw new Error(`keysByRow[${r}][${c}]는 [a,b,c]여야 합니다.`);
        }

        const a = key[0] | 0;
        const b = key[1] | 0;
        const cc = key[2] | 0;

        const off = recIndex * REC;
        dv.setUint16(off + 0, a & 0xffff, true);
        dv.setUint16(off + 2, b & 0xffff, true);
        dv.setUint16(off + 4, cc & 0xffff, true);

        for (let i = 0; i < 10; i++) raw[off + 6 + i] = outArr[i] & 0xff;

        recIndex++;
      }
    }

    // (B) 스트림 XOR
    xorStreamInPlace(raw, seed);

    // (C) Base64 인코딩
    const b64 = u8ToB64(raw);

    // (D) 조각내기 + 홀수 조각 뒤집기
    const P =
      split?.mode === "random"
        ? splitAndScrambleRandom(b64, pieces, split)
        : splitAndScrambleEven(b64, pieces);

    return P;
  }

  // ------------------------------
  // 내부 유틸
  // ------------------------------
  function xs32(seed) {
    let x = seed >>> 0;
    return () => {
      x ^= (x << 13) >>> 0;
      x ^= x >>> 17;
      x ^= (x << 5) >>> 0;
      return x >>> 0;
    };
  }

  function xorStreamInPlace(u8, seed) {
    const next = xs32(seed);
    for (let i = 0; i < u8.length; i++) {
      const r = next();
      const k = ((r ^ Math.imul(i, 0x9e3779b9)) >>> ((i & 3) << 3)) & 0xff;
      u8[i] ^= k;
    }
    return u8;
  }

  function u8ToB64(u8) {
    if (typeof btoa === "function") {
      let bin = "";
      const CH = 0x8000;
      for (let i = 0; i < u8.length; i += CH) {
        const part = u8.subarray(i, i + CH);
        bin += String.fromCharCode(...part);
      }
      return btoa(bin);
    }
    return Buffer.from(u8).toString("base64");
  }

  // ------------------------------
  // (1) 균등 분할
  // ------------------------------
  function splitAndScrambleEven(b64, pieces) {
    const n = Math.max(2, pieces | 0);
    const len = b64.length;

    const base = (len / n) | 0;
    const extra = len - base * n;

    const out = new Array(n);
    let pos = 0;

    for (let i = 0; i < n; i++) {
      const take = base + (i < extra ? 1 : 0);
      let chunk = b64.slice(pos, pos + take);
      pos += take;
      if (i & 1) chunk = chunk.split("").reverse().join("");
      out[i] = chunk;
    }
    return out;
  }

  // ------------------------------
  // (2) ✅ 가변/랜덤 분할 (재현 가능)
  // ------------------------------
  function splitAndScrambleRandom(b64, pieces, opt) {
    const n = Math.max(2, pieces | 0);
    const len = b64.length;

    const splitSeed = (opt?.splitSeed ?? 0x6d2b79f5) >>> 0;
    let minPieceLen = (opt?.minPieceLen ?? 32) | 0;
    let maxPieceLen = (opt?.maxPieceLen ?? 220) | 0;
    const minLastLen = (opt?.minLastLen ?? 16) | 0;

    // 안전 보정
    if (minPieceLen < 1) minPieceLen = 1;
    if (maxPieceLen < minPieceLen) maxPieceLen = minPieceLen;

    const rnd = xs32(splitSeed);

    // 목표 조각 수 n개를 "무조건" 만들되, 길이 분포는 랜덤하게
    // 전략:
    // - 앞에서부터 랜덤 길이로 잘라 나가되
    // - 남은 길이를 고려해 "남은 조각 수를 만들 수 있게" 클램프
    const cuts = new Array(n);
    let remaining = len;

    for (let i = 0; i < n; i++) {
      const leftPieces = n - i;

      // 남은 조각들이 최소 길이(minPieceLen)를 가질 수 있게 최대치를 제한
      const maxAllowed = Math.max(
        minPieceLen,
        remaining - minPieceLen * (leftPieces - 1)
      );

      // 최소/최대 후보
      const lo = Math.min(minPieceLen, maxAllowed);
      const hi = Math.min(maxPieceLen, maxAllowed);

      // 마지막 조각은 남은 걸 다 가져가게(하지만 너무 짧으면 이전 조각에 합치기 후보)
      let take;
      if (i === n - 1) {
        take = remaining;
      } else {
        // 랜덤 길이
        const r = rnd();
        take = lo + (r % (hi - lo + 1));
      }

      cuts[i] = take;
      remaining -= take;
    }

    // 마지막이 너무 짧으면, 이전 조각에 흡수(조각 수는 유지하기 위해 재분배)
    // -> n개 유지가 중요하면, 앞쪽 조각에서 1~k 글자를 마지막에 이식하는 방식 사용
    if (cuts[n - 1] < minLastLen && n >= 2) {
      const need = minLastLen - cuts[n - 1];
      // 앞 조각들에서 조금씩 빼오기
      for (let i = n - 2; i >= 0 && cuts[n - 1] < minLastLen; i--) {
        const canGive = Math.max(0, cuts[i] - minPieceLen);
        const give = Math.min(canGive, need - (minLastLen - cuts[n - 1]));
        if (give > 0) {
          cuts[i] -= give;
          cuts[n - 1] += give;
        }
      }
    }

    // 이제 실제로 조각 생성
    const out = new Array(n);
    let pos = 0;

    for (let i = 0; i < n; i++) {
      let chunk = b64.slice(pos, pos + cuts[i]);
      pos += cuts[i];

      if (i & 1) chunk = chunk.split("").reverse().join("");
      out[i] = chunk;
    }

    return out;
  };

  // 사용
  const P = makeP({
    keysByRow: [
      [[2645,527,1193], [901,1165,2892], [1375,1701,2046], [1970,214,300], [2728,219,657], [850,2700,2196], [298,1100,1629], [2036,1379,536], [2047,1841,663], [967,2269,1013]],
      [[1425,2932,51], [35,2469,550], [807,943,2727], [897,107,1440], [687,1507,1835], [2402,933,239], [1569,165,567], [63,1792,1187], [2342,1347,2293], [301,727,2614]],
      [[1994,2775,78], [828,2735,1311], [2150,110,1769], [2297,2647,3000], [1176,1284,1032], [1178,2093,1331], [2584,2474,2431], [1544,1399,2284], [196,467,2900], [380,2544,1495]],
      [[2357,290,1173], [289,21,1488], [2394,1644,2076], [318,1929,503], [1097,2257,2103], [884,177,1887], [2749,605,1782], [1798,499,2325], [2646,737,769], [1940,2984,2758]],
      [[2371,249,1596], [2356,116,2812], [1721,232,1276], [644,1607,1866], [1582,2136,2234], [2089,1597,1986], [2567,2488,823], [2413,1214,571], [1129,594,2930], [2585,1966,1822]],
      [[1811,2220,235], [1296,2468,2684], [780,2116,1751], [2923,2894,1756], [2785,120,1453], [1920,2460,1871], [321,65,1516], [2945,964,1264], [1247,2004,615], [265,1838,1289]],
      [[1318,1338,991], [2534,1931,2443], [2880,2201,87], [2393,29,2381], [966,2060,2533], [1878,1034,2422], [554,1427,1908], [2367,779,2082], [1998,282,799], [1309,1466,2640]],
      [[1367,809,1033], [2689,1862,1670], [1848,924,2751], [820,1922,39], [2766,477,2343], [2193,125,709], [2267,2750,1517], [2063,341,413], [166,1057,2511], [835,679,1062]],
      [[1230,2755,2198], [814,1646,1700], [462,416,342], [272,635,2497], [2266,935,1982], [1239,1645,2579], [2961,2275,959], [529,1255,2583], [1556,1091,2147], [1608,1563,711]],
      [[565,1807,1672], [2973,308,947], [1014,970,1736], [622,903,1774], [84,883,355], [906,2011,1224], [2979,2854,630], [1119,2179,2779], [167,2521,587], [2141,43,2039]],
    ],
    outs: [
      [79, 69, 74, 78, 73, 72, 77, 75, 88, 84],
      [71, 73, 90, 70, 78, 80, 84, 83, 86, 75],
      [79, 67, 78, 76, 84, 71, 77, 70, 75, 83],
      [68, 75, 72, 79, 88, 77, 73, 86, 69, 65],
      [80, 68, 66, 73, 90, 85, 79, 70, 77, 74],
      [75, 70, 79, 85, 68, 66, 82, 90, 86, 73],
      [77, 73, 80, 71, 83, 72, 68, 65, 85, 70],
      [83, 74, 82, 87, 84, 68, 71, 85, 88, 72],
      [72, 74, 90, 85, 84, 79, 88, 70, 81, 65],
      [74, 82, 80, 70, 73, 71, 83, 66, 68, 78]
    ],
    pieces: 14,
    seed: 0xa5f1523d,
    split: {
      mode: "random",
      splitSeed: 0x12345678, // 이 값만 바꾸면 P '모양'이 바뀜(복호 결과는 동일)
      minPieceLen: 20,
      maxPieceLen: 180,
      minLastLen: 16,
    },
  });

  console.log(JSON.stringify(P));
};
// createP2();

// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————



// console.clear();

// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————
// ———————————————————————————————————————————————————————————