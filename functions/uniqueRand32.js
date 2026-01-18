import rand32 from "./rand32.js";

/**
 * 난수 생성기
 * 숫자를 받아 그 숫자만큼의 랜덤한 난수 생성
 * @param {number} 생성할 배열 length
 * @returns {Arran<number>}
 */
export default (n) => {
  if (!Number.isInteger(n) || n < 0) throw new TypeError("n must be a non-negative integer");
  const set = new Set();
  while (set.size < n) set.add(rand32());
  return [...set];
};

// ✅ 사용 예시
// console.log(uniqueRand32(4));