import selectedCard from "./selectedCard/selectedCard.js";

// OEJNIHMKXT // [79, 69, 74, 78, 73, 72, 77, 75, 88, 84]
// GIZFNPTSVK // [71, 73, 90, 70, 78, 80, 84, 83, 86, 75]
// OCNLTGMFKS // [79, 67, 78, 76, 84, 71, 77, 70, 75, 83]
// DKHOXMIVEA // [68, 75, 72, 79, 88, 77, 73, 86, 69, 65]
// PDBIZUOFMJ // [80, 68, 66, 73, 90, 85, 79, 70, 77, 74]
// KFOUDBRZVI // [75, 70, 79, 85, 68, 66, 82, 90, 86, 73]
// MIPGSHDAUF // [77, 73, 80, 71, 83, 72, 68, 65, 85, 70]
// SJRWTDGUXH // [83, 74, 82, 87, 84, 68, 71, 85, 88, 72]
// HJZUTOXFQA // [72, 74, 90, 85, 84, 79, 88, 70, 81, 65]
// JRPFIGSBDN // [74, 82, 80, 70, 73, 71, 83, 66, 68, 78]

function __fnv1a32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

const numArr = [
  "ff521a60",
  "aa5f693b",
  "dce1874e",
  "f9b39f42",
  "a14d2a55",
  "ef2a6cd8",
  "52a63bfe",
  "6606a5bb",
  "9b65303d",
  "d5ea93e0",
];

// const __PAYLOADS = Object.create(null);
// const hexStr = "0x" + (Number("0x" + __fnv1a32(numArr[0]).toString(16))).toString(16);
// const key = Number(hexStr);
// console.log(hexStr);
// __PAYLOADS[key] = "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==";
// console.log(__PAYLOADS[key]);
// console.log(__PAYLOADS[0xf762852]);

const __PAYLOADS = Object.create(null);
for (let i = 0; i < numArr.length; i++) {
  const hexStr = "0x" + (Number("0x" + __fnv1a32(numArr[i]).toString(16))).toString(16);
  console.log(hexStr);
  const key = Number(hexStr);
  __PAYLOADS[key] = i;
}
console.log(__PAYLOADS[0xf762852]);

/* (async () => {
  const DIV = document.createElement("div");
  DIV.setAttribute("id", "container");
  document.body.appendChild(DIV);

  await selectedCard("JRPFIGSBDN");
  // console.log("===== 다음 함수 실행 =============");
})(); */