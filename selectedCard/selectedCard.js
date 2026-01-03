import createSVG from "./createSVG.js";
import createNumber from "./createNumber.js";
import createT from "./createT.js";

export default async (nCode) => {
  const data = await createSVG(nCode);

  // 숫자/문양은 병렬로 그리고 둘 다 끝날 때까지 대기
  await Promise.all([createNumber(data), createT(data)]);

  // 여기까지 오면 SVG + 숫자 + 문양 완료
}