import { safeBase64Decode } from "./base64Crypt.js";

export default {
  // 왼쪽 상단 숫자의 시작 M 변경
  f: (d, p) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${p === "OEJNIHMKXT" ? 10 + 8 : 10},${10}`
    );
  },
  // 오른쪽 하단 숫자의 시작 M 변경
  r: (d, p, s) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${p === "OEJNIHMKXT" ? Math.floor(parseInt(safeBase64Decode(s.card.w)) - 10 - 8) : Math.floor(parseInt(safeBase64Decode(s.card.w)) - 10 - parseInt(safeBase64Decode(s.num.w)))},${parseInt(safeBase64Decode(s.card.h)) - 10 - parseInt(safeBase64Decode(s.num.h))}`
    );
  },
}