import selectedCard from "./selectedCard/selectedCard.js";
import { randomMixedString } from "./module/randomMixedString.js";
import { reverseString } from "./module/reverseString.js";


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

const eSet = [
  "abc66a04",
  "817ee384",
  "fecb195f",
  "ad27ef26",
  "3292d5df",
  "cff14059",
  "f5d95a31",
  "8875f72a",
  "bbbe1cbc",
  "6324b9a",
];

const fnv1a32 = (str) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
};

const bSet = eSet.map((item) => {
  return (fnv1a32(item) ^ 0xA5A5A5A5) >>> 0
});
console.log(bSet);



function __fnv1a32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

const kSet = [
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

/* const vSet = [
  "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==",
  "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4=",
  "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz" +
  "8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+Zka" +
  "Y54=",
  "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSS" +
  "EF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50ac" +
  "JDc=",
  "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudq" +
  "t8+9XIyQIU5b",
  "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPn" +
  "RA8Zw+UJo4Kr3E//vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kv" +
  "BsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEA" +
  "s46EkOI=",
  "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJi" +
  "snCW5Iofl3YUZ3tn9zN0",
  "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQ" +
  "mYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ=",
  "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh2" +
  "1M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4O+RJa6GAJD8SV" +
  "0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeS" +
  "gZv9rDY=",
  "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAyd" +
  "OOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJ" +
  "we0rZfDc7gbY+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkC" +
  "YHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA==",
]; */
const vSet = [
  "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==",
  "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4=",
  "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+ZkaY54=",
  "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSSEF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50acJDc=",
  "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudqt8+9XIyQIU5b",
  "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPnRA8Zw+UJo4Kr3E//vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kvBsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEAs46EkOI=",
  "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJisnCW5Iofl3YUZ3tn9zN0",
  "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQmYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ=",
  "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh21M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4O+RJa6GAJD8SV0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeSgZv9rDY=",
  "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAydOOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJwe0rZfDc7gbY+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkCYHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA==",
];

// for (const k of vSet) {
//   console.log(k.length);
// }

// const __PAYLOADS = Object.create(null);
// const hexStr = "0x" + (Number("0x" + __fnv1a32(numArr[0]).toString(16))).toString(16);
// const key = Number(hexStr);
// console.log(hexStr);
// __PAYLOADS[key] = "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==";
// console.log(__PAYLOADS[key]);
// console.log(__PAYLOADS[0xf762852]);

// const __PAYLOADS = Object.create(null);
// for (let i = 0; i < kSet.length; i++) {
//   const hexStr = "0x" + (Number("0x" + __fnv1a32(kSet[i]).toString(16))).toString(16);
//   console.log(hexStr);
//   const key = Number(hexStr);
//   __PAYLOADS[key] = vSet[i];
// }
// console.log(__PAYLOADS[0x8cf4ebbf]);


/* const CASE_BY_HASH = Object.create({
  0xbec62b4d: "Tk0AzQ==", // "ff521a60"
  0xa4afcbff: "T00ACU4AkQ==", // "aa5f693b"
  0xc7de9c8a: "SE0AEk0AzU4AiA==", // "dce1874e"
  0x79bba94a: "SU1oEk3YEk5oiE7YiA==", // "f9b39f42"
  0xccebf413: "Sk1oEk3YEk0AzU5oiE7YiA==", // "a14d2a55"
  0xceb9b54d: "S01oEk3YEk1ozU3YzU5oiE7YiA==", // "ef2a6cd8"
  0x5b848f1e: "RE1oEk3YEk0ALE1ozU3YzU5oiE7YiA==", // "52a63bfe"
  0xc44bfa9c: "RU9oEk/YEk8ALE9ozU/YzUgA7khoiEjYiA==", // "6606a5bb"
  0x2df2d4a7: "Rk9oEk/YEk9oIU/YIU8AzUho+UjY+UhoiEjYiA==", // "9b65303d"
  0xb8af365e: "R09oEk/YEk8ANU9oIU/YIUho+UjY+UgA5UhoiEjYiA==", // "d5ea93e0"
}); */

// 문자열의 끝 "=="을 삭제하고 기존 문자열의 뒤에 42글자만틈 랜덤한 문자를 추가함
/* const CASE_BY_HASH = Object.create({
  0xbec62b4d: "Tk0AzQIo/iIdYTbiOdpcZO9Du!TbCFKEJdixjtx8Dd", // "ff521a60" -> 1
  0xa4afcbff: "T00ACU4AkQ+iyGkdUvB/Utbcm7+wVbXpbi8+/hwpcY", // "aa5f693b" -> 2
  0xc7de9c8a: "SE0AEk0AzU4AiAOVIDUXI/bEioO0+cN6TrchAnbE/c", // "dce1874e" -> 3
  0x79bba94a: "SU1oEk3YEk5oiE7YiA5Sp7Lag/KbaX(R3}Rp&eh,6>", // "f9b39f42" -> 4
  0xccebf413: "Sk1oEk3YEk0AzU5oiE7YiA5zc{}9VX_)jV49ym5sdm", // "a14d2a55" -> 5
  0xceb9b54d: "S01oEk3YEk1ozU3YzU5oiE7YiA][t&I7yn)Aj*5fJt", // "ef2a6cd8" -> 6
  0x5b848f1e: "RE1oEk3YEk0ALE1ozU3YzU5oiE7YiAv-SV;J-r=9MS", // "52a63bfe" -> 7
  0xc44bfa9c: "RU9oEk/YEk8ALE9ozU/YzUgA7khoiEjYiA)?%VQ3qT", // "6606a5bb" -> 8
  0x2df2d4a7: "Rk9oEk/YEk9oIU/YIU8AzUho+UjY+UhoiEjYiA2O[v", // "9b65303d" -> 9
  0xb8af365e: "R09oEk/YEk8ANU9oIU/YIUho+UjY+UgA5UhoiEjYiA", // "d5ea93e0" -> 10
}); */

// 1. 문자열의 끝 "=="을 삭제하고 기존 문자열의 뒤에 42글자만틈 랜덤한 문자를 추가함
// 2. 그 42글자의 문자열 순서를 뒤집음
const CASE_BY_HASH = Object.create({
  0xbec62b4d: "dD8xtjxidJEKFCbT!uD9OZcpdOibTYdIi/oIQzA0kT", // "ff521a60" -> 1
  0xa4afcbff: "Ycpwh/+8ibpXbVw+7mcbtU/BvUdkGyi+QkA4UCA00T", // "aa5f693b" -> 2
  0xc7de9c8a: "c/EbnAhcrT6Nc+0OoiEb/IXUDIVOAiA4UzA0kEA0ES", // "dce1874e" -> 3
  0x79bba94a: ">6,he&pR}3R(XabK/gaL7pS5AiY7Eio5kEY3kEo1US", // "f9b39f42" -> 4
  0xccebf413: "mds5my94Vj)_XV9}{cz5AiY7Eio5UzA0kEY3kEo1kS", // "a14d2a55" -> 5
  0xceb9b54d: "tJf5*jA)ny7I&t[]AiY7Eio5UzY3Uzo1kEY3kEo10S", // "ef2a6cd8" -> 6
  0x5b848f1e: "SM9=r-J;VS-vAiY7Eio5UzY3Uzo1ELA0kEY3kEo1ER", // "52a63bfe" -> 7
  0xc44bfa9c: "Tq3QV%?)AiYjEiohk7AgUzY/Uzo9ELA8kEY/kEo9UR", // "6606a5bb" -> 8
  0x2df2d4a7: "v[O2AiYjEiohU+YjU+ohUzA8UIY/UIo9kEY/kEo9kR", // "9b65303d" -> 9
  0xb8af365e: "AiYjEiohU5AgU+YjU+ohUIY/UIo9UNA8kEY/kEo90R", // "d5ea93e0" -> 10
});

// console.log(reverseString(CASE_BY_HASH[0xb8af365e]));


// for (const k in CASE_BY_HASH) {
//   console.log(CASE_BY_HASH[k].length);
// }

// const str = "R09oEk/YEk8ANU9oIU/YIUho+UjY+UgA5UhoiEjYiA";
// const n = randomMixedString(42 - str.length)
// const sum = str + n;
// console.log(sum);
// console.log(sum.length);


/*
const str = "S01oEk3YEk1ozU3YzU5oiE7YiA][t&I7yn)Aj*5fJt";
console.log(str.length);
*/

(async () => {
  const DIV = document.createElement("div");
  DIV.setAttribute("id", "container");
  document.body.appendChild(DIV);

  await selectedCard("6324b9a");
  // console.log("===== 다음 함수 실행 =============");
})();