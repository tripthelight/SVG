const WW = window.innerWidth;
const WH = window.innerHeight;
// console.log("window width : ", WW);
// console.log("window height : ", WH);


const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);

const container = document.getElementById("container");

const cardSize = { w: 191, h: 297 };
const numScale = { w: 1, h: 1 };
const tScale = { w: 1, h: 1 };

// number round =============================
// const numRndEl = document.createElement("div");
// numRndEl.classList.add("num-round");
// container.appendChild(numRndEl);
// T round =============================
// const tRndEl = document.createElement("div");
// tRndEl.classList.add("t-round");
// container.appendChild(tRndEl);

// SVG ======================================
const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(SVG_NS, "svg");
svg.classList.add("card");
svg.setAttribute("width", cardSize.w);
svg.setAttribute("height", cardSize.h);
svg.setAttribute('viewBox', `0 0 ${cardSize.w} ${cardSize.h}`);
// svg.setAttribute('preserveAspectRatio', "xMidYMid meet");

const g = document.createElementNS(SVG_NS, "g");
g.setAttribute('transform', `translate(0,0) scale(${numScale.w},${numScale.h})`);
// g.setAttribute('transform', `translate(0,0) scale(${numScale.w},${numScale.h}) rotate(180, 12, 13)`);
const gr = document.createElementNS(SVG_NS, "g");
gr.setAttribute('transform', `translate(0,0) scale(${numScale.w},${numScale.h})`);
// g.setAttribute('fill', '#000');
// g.setAttribute('stroke', 'none');

const path_N = document.createElementNS(SVG_NS, "path");
const path_NR = document.createElementNS(SVG_NS, "path");
path_N.classList.add("n");
path_NR.classList.add("nr");
// path_N.setAttribute('fill', '#000');
// path_N.setAttribute('stroke', 'none');
path_NR.setAttribute('fill', '#FF0000');
// path_NR.setAttribute('stroke', 'none');
// NUM 1 - 1은 180도 회전해도 1
const dN1 = `
  M0,0
  m10,4
  l4,-4
  l0,22
  l-4,4
  Z
`;
// NUM 2 - 2는 180도 회전해도 2
const dN2 = `
  M0,0
  m0,4
  l4,-4
  l20,0
  l-16,22
  l16,0
  l-4,4
  l-20,0
  l14,-22
  Z
`;
// NUM 3
const dN3 = `
  M0,0
  m0,4
  l4,-4
  l16,0
  l-8,10
  l12,0
  l-12,16
  l-4,0
  l8,-12
  l-12,0
  l8,-10
  Z
`;
const dN3R = `
  M0,0
  m12,0
  l4,0
  l-8,12
  l12,0
  l-8,10
  l12,0
  l-4,4
  l-16,0
  l8,-10
  l-12,0
  Z
`;
// NUM 4
const dN4 = `
  M0,0
  m0,10
  l4,-4
  l0,12
  l16,-12
  l0,-2
  l4,-4
  l0,22
  l-4,4
  l0,-15
  l-20,14
  Z
`;
const dN4R = `
  M0,0
  m0,4
  l4,-4
  l0,15
  l20,-14
  l0,15
  l-4,4
  l0,-12
  l-16,12
  l0,2
  l-4,4
  Z
`;
// NUM 5 - 5는 180도 회전해도 5
const dN5 = `
  M0,0
  m0,8
  l8,-8
  l4,0
  l-8,8
  l0,10
  l20,-18
  l0,18
  l-8,8
  l-4,0
  l8,-8
  l0,-10
  l-20,18
  Z
`;
// NUM 6 - 6을 180도 회전하면 9와 같음
const dN6 = `
  M0,0
  m0,8
  l8,-8
  l4,0
  l-8,8
  l0,10
  l20,-18
  l0,18
  l-8,8
  l-16,0
  l4,-4
  l12,0
  l4,-4
  l0,-10
  l-20,18
  Z
`;
const dN6R = `
  M0,0
  m0,8
  l8,-8
  l16,0
  l-4,4
  l-12,0
  l-4,4
  l0,10
  l20,-18
  l0,18
  l-8,8
  l-4,0
  l8,-8
  l0,-10
  l-20,18
  Z
`;
// NUM 7
const dN7 = `
  M0,0
  m0,4
  l4,-4
  l20,0
  l-16,26
  l-6,0
  l14,-22
  Z
`;
const dN7R = `
  M0,0
  m16,0
  l6,0
  l-14,22
  l16,0
  l-4,4
  l-20,0
  Z
`;
// NUM 8 - 8은 180도 회전해도 8
const dN8 = `
  M0,0
  m0,8
  l8,-8
  l16,0
  l-4,4
  l-12,0
  l-4,4
  l0,10
  l20,-18
  l0,18
  l-8,8
  l-16,0
  l4,-4
  l12,0
  l4,-4
  l0,-10
  l-20,18
  Z
`;
// NUM 9 - 9를 180도 회전하면 6과 같음
const dN9 = `
  M0,0
  m0,8
  l8,-8
  l16,0
  l-4,4
  l-12,0
  l-4,4
  l0,10
  l20,-18
  l0,18
  l-8,8
  l-4,0
  l8,-8
  l0,-10
  l-20,18
  Z
`;
const dN9R = `
  M0,0
  m0,8
  l8,-8
  l4,0
  l-8,8
  l0,10
  l20,-18
  l0,18
  l-8,8
  l-16,0
  l4,-4
  l12,0
  l4,-4
  l0,-10
  l-20,18
  Z
`;
// NUM 1
const dN10 = `
  M0,0
  m0,4
  l4,-4
  l0,22
  l-4,4
  l0,-22
  Z
  m8,0
  l4,-4
  l12,0
  l0,22
  l-4,4
  l-12,0
  l4,-4
  l6,0
  l2,-2
  l0,-16
  l-6,0
  l-2,2
  l0,16
  l-4,4
  Z
`;
const dN10R = `
  M0,0
  m0,4
  l4,-4
  l12,0
  l0,22
  l-4,4
  l-12,0
  l4,-4
  l6,0
  l2,-2
  l0,-16
  l-6,0
  l-2,2
  l0,16
  l-4,4
  Z
  m20,0
  l4,-4
  l0,22
  l-4,4
  Z
`;

path_N.setAttribute("d", dN5
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);
path_NR.setAttribute("d", dN5
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);
// g.appendChild(path_N);
// gr.appendChild(path_NR);
// svg.appendChild(g);
// svg.appendChild(gr);
svg.appendChild(path_N);
svg.appendChild(path_NR);

// PATH T ===================================
const gt = document.createElementNS(SVG_NS, "g");
gt.setAttribute('transform', `translate(0,0) scale(${tScale.w},${tScale.h})`);
// gt.setAttribute('transform', `translate(0,0) scale(${tScale.w},${tScale.h}) rotate(180, 95.5, 148.5)`);
const gtr = document.createElementNS(SVG_NS, "g");
gtr.setAttribute('transform', `translate(0,0) scale(${tScale.w},${tScale.h})`);

const path_T = document.createElementNS(SVG_NS, "path"); // width: 64, height: 64
path_T.classList.add("t");
// path_T.setAttribute('fill', '#000');
// path_T.setAttribute('stroke', 'none');
const path_TR = document.createElementNS(SVG_NS, "path"); // width: 64, height: 64
path_TR.classList.add("t_r");
path_TR.setAttribute('fill', '#FF0000');
// const dT = `
//   M0,0
//   l16,2 
//   l30,0 
//   l14,12 
//   l-14,-2 
//   l-10,0 
//   l0,52 
//   l-10,-12 
//   l0,-40 
//   l-10,0 
//   Z
// `;
const dT = `
  M0,0
  m0,0
  l10,2 
  l20,0 
  l10,8 
  l-10,-2 
  l-6,0 
  l0,32 
  l-6,-8 
  l0,-24 
  l-10,0 
  Z
`;
const dTR = `
  M0,50
  m16,0
  l6,8
  l0,24
  l10,0
  l8,8
  l-10,-2
  l-20,0
  l-10,-8
  l10,2
  l6,0
  Z
`;
path_T.setAttribute("d", dT
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);
path_TR.setAttribute("d", dTR
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);

// gt.appendChild(path_T);
// gtr.appendChild(path_TR);
// svg.appendChild(gt);
// svg.appendChild(gtr);
svg.appendChild(path_T);
svg.appendChild(path_TR);
// svg.appendChild(path_T.cloneNode(true));

container.appendChild(svg);

// SIZE CHECK ===============================
// SVG
function svgTransformT() {
  const svgEl = document.querySelector('svg');
  if (!svgEl) return;
  const w = svgEl.getAttribute('width');
  const h = svgEl.getAttribute('height');
  // console.log("CARD width :", w);
  // console.log("CARD height :", h);
  const rect = svgEl.getBoundingClientRect();
  // console.log("CARD width :", rect.width);
  // console.log("CARD height :", rect.height);

  // path
  const path = document.querySelector('svg.card path.t');
  if (!path) return;
  const pathR = document.querySelector('svg.card path.t_r');
  if (!pathR) return;

  const bbox = path.getBBox();
  // console.log(bbox.x);      // 시작 x
  // console.log(bbox.y);      // 시작 y
  // console.log(bbox.width);  // path width
  // console.log(bbox.height); // path height
  
  // path의 "M" 좌표 변경
  const posX_T = Math.floor(rect.width / 2 - bbox.width / 2);
  const posY_T = Math.floor(rect.height / 2 - bbox.height / 2);

  const oldD = path.getAttribute('d');
  // const newD = oldD.replace('M0,0', `M${posX_T},${posY_T}`);
  const newD = oldD.replace(
    /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
    `M${posX_T},${posY_T}`
  );
  path.setAttribute('d', newD);
  
  const posX_TR = Math.floor(rect.width / 2 - bbox.width / 2);
  const posY_TR = Math.floor(rect.height / 2 - bbox.height / 2);
  const oldDr = pathR.getAttribute('d');
  // const newDr = oldD.replace('M0,0', `M${posX_TR},${posY_TR}`);
  const newDr = oldDr.replace(
    /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
    `M${posX_TR},${posY_TR + bbox.height}`
  );
  pathR.setAttribute('d', newDr);
}
svgTransformT();

function svgTransformNum() {
  const svgEl = document.querySelector('svg');
  if (!svgEl) return;
  const w = svgEl.getAttribute('width');
  const h = svgEl.getAttribute('height');
  const rect = svgEl.getBoundingClientRect();

  // path
  const path = document.querySelector('svg.card path.n');
  if (!path) return;
  const pathR = document.querySelector('svg.card path.nr');
  if (!pathR) return;

  const bbox = path.getBBox();
  
  // path의 "M" 좌표 변경
  const posX_N = 10;
  const posY_N = 10;
  const oldD = path.getAttribute('d');
  // const newD = oldD.replace('M0,0', `M${posX_N},${posY_N}`);
  const newD = oldD.replace(
    /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
    `M${posX_N},${posY_N}`
  );
  path.setAttribute('d', newD);
  
  const posX_NR = Math.floor(rect.width - 10 - bbox.width);
  const posY_NR = Math.floor(rect.height - 10 - bbox.height);
  const oldDr = pathR.getAttribute('d');
  // const newDr = oldD.replace('M0,0', `M${posX_NR},${posY_NR}`);
  const newDr = oldDr.replace(
    /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
    `M${posX_NR},${posY_NR}`
  );
  pathR.setAttribute('d', newDr);
}
svgTransformNum();

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

const DN = [
  "M0,0 m10,4 l4,-4 l0,22 l-4,4 Z", // 1
  "M0,0 m0,4 l4,-4 l20,0 l-16,22 l16,0 l-4,4 l-20,0 l14,-22 Z", // 2
  "M0,0 m0,4 l4,-4 l16,0 l-8,10 l12,0 l-12,16 l-4,0 l8,-12 l-12,0 l8,-10 Z", // 3
  "M0,0 m12,0 l4,0 l-8,12 l12,0 l-8,10 l12,0 l-4,4 l-16,0 l8,-10 l-12,0 Z", // 3 reverse
  "M0,0 m0,10 l4,-4 l0,12 l16,-12 l0,-2 l4,-4 l0,22 l-4,4 l0,-15 l-20,14 Z", // 4
  "M0,0 m0,4 l4,-4 l0,15 l20,-14 l0,15 l-4,4 l0,-12 l-16,12 l0,2 l-4,4 Z", // 4 reverse
  "M0,0 m0,8 l8,-8 l4,0 l-8,8 l0,10 l20,-18 l0,18 l-8,8 l-4,0 l8,-8 l0,-10 l-20,18 Z", // 5
  "M0,0 m0,8 l8,-8 l4,0 l-8,8 l0,10 l20,-18 l0,18 l-8,8 l-16,0 l4,-4 l12,0 l4,-4 l0,-10 l-20,18 Z", // 6
  "M0,0 m0,8 l8,-8 l16,0 l-4,4 l-12,0 l-4,4 l0,10 l20,-18 l0,18 l-8,8 l-4,0 l8,-8 l0,-10 l-20,18 Z", // 6 reverse
  "M0,0 m0,4 l4,-4 l20,0 l-16,26 l-6,0 l14,-22 Z", // 7
  "M0,0 m16,0 l6,0 l-14,22 l16,0 l-4,4 l-20,0 Z", // 7 reverse
  "M0,0 m0,8 l8,-8 l16,0 l-4,4 l-12,0 l-4,4 l0,10 l20,-18 l0,18 l-8,8 l-16,0 l4,-4 l12,0 l4,-4 l0,-10 l-20,18 Z", // 8
  "M0,0 m0,8 l8,-8 l16,0 l-4,4 l-12,0 l-4,4 l0,10 l20,-18 l0,18 l-8,8 l-4,0 l8,-8 l0,-10 l-20,18 Z", // 9
  "M0,0 m0,8 l8,-8 l4,0 l-8,8 l0,10 l20,-18 l0,18 l-8,8 l-16,0 l4,-4 l12,0 l4,-4 l0,-10 l-20,18 Z", // 9 reverse
  "M0,0 m0,4 l4,-4 l0,22 l-4,4 l0,-22 Z m8,0 l4,-4 l12,0 l0,22 l-4,4 l-12,0 l4,-4 l6,0 l2,-2 l0,-16 l-6,0 l-2,2 l0,16 l-4,4 Z", // 10
  "M0,0 m0,4 l4,-4 l12,0 l0,22 l-4,4 l-12,0 l4,-4 l6,0 l2,-2 l0,-16 l-6,0 l-2,2 l0,16 l-4,4 Z m20,0 l4,-4 l0,22 l-4,4 Z", // 10 reverse
];

function randomNum(_code) {
  return [[0,0], [10,4], [4,-4], [0,22], [-4,4]];
}

const DP = [
  "M0,0 m0,0 l10,2 l20,0 l10,8 l-10,-2 l-6,0 l0,32 l-6,-8 l0,-24 l-10,0 Z", // T
  "M0,50 m16,0 l6,8 l0,24 l10,0 l8,8 l-10,-2 l-20,0 l-10,-8 l10,2 l6,0 Z", // T reverse
];

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————