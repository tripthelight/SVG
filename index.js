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

(async () => {
  const DIV = document.createElement("div");
  DIV.setAttribute("id", "container");
  document.body.appendChild(DIV);

  await selectedCard("OEJNIHMKXT");
  console.log("===== 다음 함수 실행 =============");
})();