// 이모지(😀) 같은 “서로게이트 페어/조합문자”까지 정확히 뒤집고 싶다면 아래처럼 하시면 더 안전합니다.

export function reverseStringUnicode(str) {
  return Array.from(String(str)).reverse().join("");
}