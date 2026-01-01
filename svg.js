/*
const WW = window.innerWidth;
const WH = window.innerHeight;
// console.log("window width : ", WW);
// console.log("window height : ", WH);


const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);

const container = document.getElementById("container");


const cardSize = { w: 191, h: 297 };
const numScale = { w: 1, h: 1 }; // number size 비율 -> 18 : 26
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
// g.setAttribute('transform', `translate(0,0) scale(${numScale.w},${numScale.h}) rotate(180, 9, 13)`);
const gr = document.createElementNS(SVG_NS, "g");
// gr.setAttribute('transform', `translate(90,130) scale(${numScale.w},${numScale.h})`);
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

// number size 비율 -> 18 : 26
// NUM 1 - 1은 180도 회전해도 1
const dN1 = `
  M0,0
  m0,4
  l2,-4
  l0,22
  l-2,4
  Z
`;
// NUM 2 - 2는 180도 회전해도 2
const dN2 = `
  M0,0
  m0,2
  l4,-2
  l14,0
  l-14,24
  l14,0
  l-4,2
  l-14,0
  l14,-24
  Z
`;
// NUM 3
const dN3 = `
  M0,0
  m0,2
  l4,-2
  l14,0
  l-12.4,12
  l12.4,0
  l-14.4,14
  l-3.6,0
  l12.4,-12
  l-12.4,0
  l12.4,-12
  Z
`;
const dN3R = `
  M0,0
  m14.4,0
  l3.6,0
  l-12.4,12
  l12.4,0
  l-12.4,12
  l12.4,0
  l-4,2
  l-14,0
  l12.4,-12
  l-12.4,0
  Z
`;
// NUM 4
const dN4 = `
  M0,0
  m0,14
  l2,-4
  l0,11
  l14,-15
  l0,-2
  l2,-4
  l0,22
  l-2,4
  l0,-17
  l-16,17
  Z
`;
const dN4R = `
  M0,0
  m0,4
  l2,-4
  l0,17
  l16,-17
  l0,12
  l-2,4
  l0,-11
  l-14,15
  l0,2
  l-2,4
  Z
`;
// NUM 5 - 5는 180도 회전해도 5
// 108 : 156
const dN5 = `
  M0,0
  m0,8
  l8,-8
  l2.5,0
  l-8.5,8.5
  l0,10.3
  l16,-16
  l0,15.2
  l-8,8
  l-2.5,0
  l8.5,-8.5
  l0,-10.3
  l-16,16
  Z
`;
// NUM 6 - 6을 180도 회전하면 9와 같음
// 90 : 130
const dN6 = `
  M0,0
  m0,8
  l8,-8
  l2.5,0
  l-8.5,8.5
  l0,10.3
  l16,-16
  l0,15.2
  l-8,8
  l-10,0
  l0,-2.8
  l2,-2
  l0,2.8
  l7.5,0
  l6.5,-6.5
  l0,-10.3
  l-16,16
  Z
`;
const dN6R = `
  M0,0
  m0,8
  l8,-8
  l10,0
  l0,2.8
  l-2,2
  l0,-2.8
  l-7.5,0
  l-6.5,6.5
  l0,10.3
  l16,-16
  l0,15.2
  l-8,8
  l-2.5,0
  l8.5,-8.5
  l0,-10.3
  l-16,16
  Z
`;
// NUM 7
const dN7 = `
  M0,0
  m0,2
  l4,-2
  l14,0
  l-15.5,26
  l-2.5,0
  l14,-24
  Z
`;
const dN7R = `
  M0,0
  m15.5,0
  l2.5,0
  l-14,24
  l14,0
  l-4,2
  l-14,0
  Z
`;
// NUM 8 - 8은 180도 회전해도 8
const dN8 = `
  M0,0
  m0,8
  l8,-8
  l10,0
  l0,2.8
  l-2,2
  l0,-2.8
  l-7.5,0
  l-6.5,6.5
  l0,10.3
  l16,-16
  l0,15.2
  l-8,8
  l-10,0
  l0,-2.8
  l2,-2
  l0,2.8
  l7.5,0
  l6.5,-6.5
  l0,-10.3
  l-16,16
  Z
`;
// NUM 9 - 9를 180도 회전하면 6과 같음
const dN9 = `
  M0,0
  m0,8
  l8,-8
  l10,0
  l0,2.8
  l-2,2
  l0,-2.8
  l-7.5,0
  l-6.5,6.5
  l0,10.3
  l16,-16
  l0,15.2
  l-8,8
  l-2.5,0
  l8.5,-8.5
  l0,-10.3
  l-16,16
  Z
`;
const dN9R = `
  M0,0
  m0,8
  l8,-8
  l2.5,0
  l-8.5,8.5
  l0,10.3
  l16,-16
  l0,15.2
  l-8,8
  l-10,0
  l0,-2.8
  l2,-2
  l0,2.8
  l7.5,0
  l6.5,-6.5
  l0,-10.3
  l-16,16
  Z
`;
// NUM 1
const dN10 = `
  M0,0
  m0,4
  l2,-4
  l0,22
  l-2,4
  l0,-22
  Z
  m6,0
  l2,-4
  l10,0
  l0,22
  l-2,4
  l-10,0
  l2,-2
  l7,0
  l1,-2
  l0,-20
  l-7,0
  l-1,2
  l0,20
  l-2,2
  Z
`;
const dN10R = `
  M0,0
  m0,4
  l2,-4
  l10,0
  l0,22
  l-2,4
  l-10,0
  l2,-2
  l7,0
  l1,-2
  l0,-20
  l-7,0
  l-1,2
  l0,20
  l-2,2
  l0,-22
  Z
  m16,0
  l2,-4
  l0,22
  l-2,4
  l0,-22
  Z
`;

path_N.setAttribute("d", dN9
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);
path_NR.setAttribute("d", dN9R
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);
g.appendChild(path_N);
gr.appendChild(path_NR);
svg.appendChild(g);
svg.appendChild(gr);
// svg.appendChild(path_N);
// svg.appendChild(path_NR);

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

  console.log("rect.width : ", rect.width);
  console.log("bbox.width : ", bbox.width);
  console.log("posX_NR :::: ", posX_NR);

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

const PUB_NUM_KEYS = [
  'OEJNIHMKXT', // [79, 69, 74, 78, 73, 72, 77, 75, 88, 84]
  'GIZFNPTSVK', // [71, 73, 90, 70, 78, 80, 84, 83, 86, 75]
  'OCNLTGMFKS', // [79, 67, 78, 76, 84, 71, 77, 70, 75, 83]
  'DKHOXMIVEA', // [68, 75, 72, 79, 88, 77, 73, 86, 69, 65]
  'PDBIZUOFMJ', // [80, 68, 66, 73, 90, 85, 79, 70, 77, 74]
  'KFOUDBRZVI', // [75, 70, 79, 85, 68, 66, 82, 90, 86, 73]
  'MIPGSHDAUF', // [77, 73, 80, 71, 83, 72, 68, 65, 85, 70]
  'SJRWTDGUXH', // [83, 74, 82, 87, 84, 68, 71, 85, 88, 72]
  'HJZUTOXFQA', // [72, 74, 90, 85, 84, 79, 88, 70, 81, 65]
  'JRPFIGSBDN', // [74, 82, 80, 70, 73, 71, 83, 66, 68, 78]
];

const DN = [
  "M0,0 m0,4 l2,-4 l0,22 l-2,4 Z", // 1 - OEJNIHMKXT

  "M0,0 m0,2 l4,-2 l14,0 l-14,24 l14,0 l-4,2 l-14,0 l14,-24 Z", // 2 - GIZFNPTSVK

  "M0,0 m0,2 l4,-2 l14,0 l-12.4,12 l12.4,0 l-14.4,14 l-3.6,0 l12.4,-12 l-12.4,0 l12.4,-12 Z", // 3 - OCNLTGMFKS
  "M0,0 m14.4,0 l3.6,0 l-12.4,12 l12.4,0 l-12.4,12 l12.4,0 l-4,2 l-14,0 l12.4,-12 l-12.4,0 Z", // 3 reverse

  "M0,0 m0,14 l2,-4 l0,11 l14,-15 l0,-2 l2,-4 l0,22 l-2,4 l0,-17 l-16,17 Z", // 4 - DKHOXMIVEA
  "M0,0 m0,4 l2,-4 l0,17 l16,-17 l0,12 l-2,4 l0,-11 l-14,15 l0,2 l-2,4 Z", // 4 reverse

  "M0,0 m0,8 l8,-8 l2.5,0 l-8.5,8.5 l0,10.3 l16,-16 l0,15.2 l-8,8 l-2.5,0 l8.5,-8.5 l0,-10.3 l-16,16 Z", // 5 - PDBIZUOFMJ

  "M0,0 m0,8 l8,-8 l2.5,0 l-8.5,8.5 l0,10.3 l16,-16 l0,15.2 l-8,8 l-10,0 l0,-2.8 l2,-2 l0,2.8 l7.5,0 l6.5,-6.5 l0,-10.3 l-16,16 Z", // 6 - KFOUDBRZVI
  "M0,0 m0,8 l8,-8 l10,0 l0,2.8 l-2,2 l0,-2.8 l-7.5,0 l-6.5,6.5 l0,10.3 l16,-16 l0,15.2 l-8,8 l-2.5,0 l8.5,-8.5 l0,-10.3 l-16,16 Z", // 6 reverse

  "M0,0 m0,2 l4,-2 l14,0 l-15.5,26 l-2.5,0 l14,-24 Z", // 7 - MIPGSHDAUF
  "M0,0 m15.5,0 l2.5,0 l-14,24 l14,0 l-4,2 l-14,0 Z", // 7 reverse

  "M0,0 m0,8 l8,-8 l10,0 l0,2.8 l-2,2 l0,-2.8 l-7.5,0 l-6.5,6.5 l0,10.3 l16,-16 l0,15.2 l-8,8 l-10,0 l0,-2.8 l2,-2 l0,2.8 l7.5,0 l6.5,-6.5 l0,-10.3 l-16,16 Z", // 8 - SJRWTDGUXH

  "M0,0 m0,8 l8,-8 l10,0 l0,2.8 l-2,2 l0,-2.8 l-7.5,0 l-6.5,6.5 l0,10.3 l16,-16 l0,15.2 l-8,8 l-2.5,0 l8.5,-8.5 l0,-10.3 l-16,16 Z", // 9 - HJZUTOXFQA
  "M0,0 m0,8 l8,-8 l2.5,0 l-8.5,8.5 l0,10.3 l16,-16 l0,15.2 l-8,8 l-10,0 l0,-2.8 l2,-2 l0,2.8 l7.5,0 l6.5,-6.5 l0,-10.3 l-16,16 Z", // 9 reverse

  "M0,0 m0,4 l2,-4 l0,22 l-2,4 l0,-22 Z m6,0 l2,-4 l10,0 l0,22 l-2,4 l-10,0 l2,-2 l7,0 l1,-2 l0,-20 l-7,0 l-1,2 l0,20 l-2,2 Z", // 10 - JRPFIGSBDN
  "M0,0 m0,4 l2,-4 l10,0 l0,22 l-2,4 l-10,0 l2,-2 l7,0 l1,-2 l0,-20 l-7,0 l-1,2 l0,20 l-2,2 l0,-22 Z m16,0 l2,-4 l0,22 l-2,4 l0,-22 Z", // 10 reverse
];

function randomNum(_code) {
  return [[0,0], [0,4], [2,-4], [0,22], [-2,4]];
}

const DP = [
  "M0,0 m0,0 l10,2 l20,0 l10,8 l-10,-2 l-6,0 l0,32 l-6,-8 l0,-24 l-10,0 Z", // T
  "M0,50 m16,0 l6,8 l0,24 l10,0 l8,8 l-10,-2 l-20,0 l-10,-8 l10,2 l6,0 Z", // T reverse
];

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————



// ================================
// 2px 외곽(테두리 영역) path 만들기
// ================================

function polygonArea(points) {
  // signed area * 2
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const q = points[(i + 1) % points.length];
    a += p.x * q.y - q.x * p.y;
  }
  return a / 2;
}

function normalize(vx, vy) {
  const len = Math.hypot(vx, vy);
  if (len === 0) return { x: 0, y: 0 };
  return { x: vx / len, y: vy / len };
}

function lineIntersection(a1, a2, b1, b2) {
  // a1->a2 and b1->b2 intersection (infinite lines)
  const x1 = a1.x, y1 = a1.y;
  const x2 = a2.x, y2 = a2.y;
  const x3 = b1.x, y3 = b1.y;
  const x4 = b2.x, y4 = b2.y;

  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(den) < 1e-12) {
    // 평행/거의 평행: fallback으로 a2를 반환(삼각형에서는 거의 안 생김)
    return { x: x2, y: y2 };
  }

  const px =
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / den;
  const py =
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / den;

  return { x: px, y: py };
}

function insetPolygon(points, t) {
  // points: [{x,y}...] (단순 폴리곤)
  // t: 안쪽으로 들어갈 거리(px)
  const n = points.length;
  const area = polygonArea(points);
  const isCCW = area > 0;

  // 각 변의 "안쪽 법선" 구해서, 변을 t만큼 평행이동한 오프셋 선분(직선)을 만든다.
  const offsetLines = [];
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const q = points[(i + 1) % n];

    const dx = q.x - p.x;
    const dy = q.y - p.y;

    // CCW면 내부가 "왼쪽"이므로 left normal이 inward
    // CW면 내부가 "오른쪽"이므로 right normal이 inward
    const left = normalize(-dy, dx);
    const inward = isCCW ? left : { x: -left.x, y: -left.y };

    const p2 = { x: p.x + inward.x * t, y: p.y + inward.y * t };
    const q2 = { x: q.x + inward.x * t, y: q.y + inward.y * t };

    offsetLines.push([p2, q2]);
  }

  // 인접한 오프셋 직선들의 교점이 inset 폴리곤의 꼭짓점
  const inset = [];
  for (let i = 0; i < n; i++) {
    const prev = offsetLines[(i - 1 + n) % n];
    const curr = offsetLines[i];
    const ip = lineIntersection(prev[0], prev[1], curr[0], curr[1]);
    inset.push(ip);
  }

  return inset;
}

function pointsToPath(points) {
  return points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ") + " Z";
}

function makeOutlinePath(points, thicknessPx) {
  // 바깥(points) - 안쪽(inset) 을 evenodd로 구멍 처리
  const inner = insetPolygon(points, thicknessPx);
  const outerD = pointsToPath(points);

  // inner는 반대 방향으로 돌려야 (even-odd/비정상 채움 문제 예방에 더 안전)
  const innerRev = [...inner].reverse();
  const innerD = pointsToPath(innerRev);

  // compound path (outer + inner hole)
  return `${outerD} ${innerD}`;
}

// ================================
// 사용 예: 질문의 삼각형 (60,0) (120,300) (0,300)
// ================================
const triangle = [
  { x: 60, y: 0 },
  { x: 120, y: 120 },
  { x: 0, y: 120 },
];

const outlineD = makeOutlinePath(triangle, 6);

const exPath = document.querySelector("svg.exSVG path");
if (exPath) {
  exPath.setAttribute("d", outlineD);
}
*/

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

function getEncodedPath(input) {
  // ---- 32-bit 해시 2종 (충돌 방지용) ----
  const h1 = fnv1a32(input);
  const h2 = djb2_32(input);
  const len = input.length;

  // ---- 키 선택 (원문 문자열 없이 해시로만 분기) ----
  // 주의: 아래 case 값들은 "입력 문자열 원문"이 아니라 해시 정수입니다.
  let packedB64 = null;

  // (h1,h2,len) 삼중 체크로 충돌 가능성 극소화
  switch (h1 ^ rotl32(h2, 7) ^ (len * 0x9e3779b1)) {
    // 1) OEJNIHMKXT
    case (1426788236 ^ rotl32(1229727654, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 1229727654 && len === 10) packedB64 = joinChunks([
        "KfaFONj9Pqjfq+DfFMJ/LwWbb7dMU3RMfChpgLywxNibDaQCC2ALogIgp8ghEZS/"
      ]);
      break;

    // 2) GIZFNPTSVK
    case (3296441889 ^ rotl32(1668502075, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 1668502075 && len === 10) packedB64 = joinChunks([
        "MAsJlUNb6foZQGKNYaLp3WbE0AOKK/yTHWFcFDP5cBQMsGFlQjpvOXzf+PodTR0I93PTdOFnTehyzq2B",
        "Q+SCsXh1v9osBo6HKL/1x5MhKI1rt0u3"
      ]);
      break;

    // 3) OCNLTGMFKS
    case (3101181229 ^ rotl32(2432479005, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 2432479005 && len === 10) packedB64 = joinChunks([
        "ep+L3EWJd348b25E7sSqoTPA3P7Xn2yh4eySJWR6JpsuG20yhI19jh3h/2QGy2WDzeb9Q5En1ZGaPKrG",
        "OZuNLNiDD128nWmL0g3vLNnYamH7sZ5Vc/BRzGXseDzz+1RfnpB6CKIbKjtPZIwR9Z0D++Km70zVCL9b",
        "1lo5b9qYOtAOArA+nqUXnKcvBLo4q7nH7pzWIAYHXQrjpdVeDJOSw9iailUsQVS/4q1nOuGY9s0VPwES",
        "AQ1QXfuetdU0eUAgiB99VDpUAyqXBBuIfSYF"
      ]);
      break;

    // 4) DKHOXMIVEA
    case (1474438647 ^ rotl32(1871641333, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 1871641333 && len === 10) packedB64 = joinChunks([
        "j/TGPeYn/CgjcVb688KcvMdRU90YrTjR+LAVTNbhURaR8oaWfrVIab5+08S00clx3NVKjzn5CvgawvFi",
        "9VL264l9tRDYphLHO3CRwb27cnN1RibF+mFGJb6a0EEeKaTzLNdrwpWXKnEtU3IkqwCQhGMkN7xMTbFD",
        "MDmEYuwLPKXu9SLrR1hw7dGFkkCUNczNuj0yI93BcWwcKWCKtFc7wwfzXeGzluztHzvRVVGNz/71kVct",
        "qRJEjir452hisMsvMoFAYK56sx66v8wdfgLH"
      ]);
      break;

    // 5) PDBIZUOFMJ
    case (4013201939 ^ rotl32(511468607, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 511468607 && len === 10) packedB64 = joinChunks([
        "gV3Su9LHOXVTZGwB4bECU1XJiME2Sl7CW4y2bBh7T1wie3uWFTE4P9FiLo96cHsrb9Su7Jdyuh5td2XT",
        "jYkV2w75fkBfqw6sQqEO7mBd2X49vAm1D3wtmtqiDsrrdocpaLVwMNME7dKW4ipXfOKpZT9F+IvRTrfs"
      ]);
      break;

    // 6) KFOUDBRZVI
    case (2209320103 ^ rotl32(1504429323, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 1504429323 && len === 10) packedB64 = joinChunks([
        "6omCD9b420n9jXmXJD6Za1of28cSL2a47Nt1HvBtiRPBz9s+GeUfmncWZRLwI08MsACcvwjjvgyfvI1X",
        "i8Duk69S6tfEXmW8aVpN74c0p5pYQn14zhYh7ik8Yv4U8hfOIoK0Fm5KptHSxNrdKghQ0cjuYwMxRqkP",
        "wz8tELqfGNMp07iL1J76j0WkWpN03uUziQwDK+cH2H8HUAGh2uZoj/wmX88Ut5PT5Nh0MgJ5lja8PUKc",
        "xCSGxPAderac6U37RpRkarOeDRbkjn6bQzIMHUISvKpL9OUgHAsmOV61LEJ7Z5yGNU/S3Mgg0QrK/plG",
        "ciWY4SGYJDKU9Ykk1c/a5AsGulStF4Fv+hFGAB3jd9GtmXGxmSRdcJdroKjVVnTYyWz4qnJrbqk6ATnQ",
        "ta7PbRWxnX78Af4kRrFl"
      ]);
      break;

    // 7) MIPGSHDAUF
    case (1945191369 ^ rotl32(2569705805, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 2569705805 && len === 10) packedB64 = joinChunks([
        "mOh3m0YMK3r1K890vM/Id6AVTx+ZZYC7+idlVlmyL4xzpo18gyhfbS+ZZEWPnR481ru3WJ8BXXvpLt8N",
        "zzyVBF9vcSp5eARa39VAIgEGavMQY4gz8FBMZQUrb++2rob2eqIh/adn+6JOy9MO3bAXUi7/V3Eimk2l",
        "nOm5hYovVSFshptyPyEH"
      ]);
      break;

    // 8) SJRWTDGUXH
    case (468969227 ^ rotl32(3491538975, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 3491538975 && len === 10) packedB64 = joinChunks([
        "TxI6z2QaUlDYeM9HAVbtb+KuVY7pxhBZKDkfPEbvzMfutiJR6m946X44zti/pWOrtCteOUdpUBDjEA8R",
        "lQaYQfSDxCnV7OyvFiMA+SU7dqFjDjJ4YCAjQ8e/lZXiYoTyoX+iCSLX5var6iSPoJvyF2hRb+LYbSLL",
        "9ki3dYWLejwJ2B56N2oB0s7O/tuB8yQCWHAlhd3kSzD47ES1XnmJH6NtGS398nJz0dYthdR/VF3CRzxh",
        "nH4B5Daioj5TxZZM"
      ]);
      break;

    // 9) HJZUTOXFQA
    case (3822067391 ^ rotl32(1821554809, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 1821554809 && len === 10) packedB64 = joinChunks([
        "P+NxzB/BW1m6nP8bpPMygvfpSNU+66XIi5MlKqHcjAFY3fE1QnQl9xLrsM2RE0sDBfF1CTijdp3hzwY1",
        "wrrR9WYTTarviKsCPSjtCpdsHUwS2OGw4Ok5XvS0NwwVHkttwT0t/0ljoXw6obbHui+OPvrkDQxc1alx",
        "GCBAEDMED1OHoCRs9MUYk4DBGSOuXrCeXE0JCVpNEvth2tu3dJ/j/bNnrRc37kGU/mgUT86se0LBnQHc",
        "llcahn2jYO8VLBF+cDiTX7iydBAjancTByJUIA86oYiLvaL6+Wnsyd9bolv1gOikf+JPFU9LIG+LR4O5",
        "buS3flTpIMfTMpftfUxTOEFkBxXpZv/uZwubnP0sAqYI1ZFNb0J8stC+Qydf0tWVIS6RnsgneOXBPe7K",
        "YQI6RxnQcF4KIeQazlzL"
      ]);
      break;

    // 10) JRPFIGSBDN
    case (1519478576 ^ rotl32(1091776302, 7) ^ (10 * 0x9e3779b1)) >>> 0:
      if (h2 === 1091776302 && len === 10) packedB64 = joinChunks([
        "DTPaPsMibRd/wpve8qYgVV0QoJ3nO2EW8AE8T2a+r4clNRIag+RbUrn+P+22T1X0pGChO83pIh5GFdLl",
        "orEMQheAWvY004WefBOcI4W3JzY/xYv9iRh8eIC7nbLJEjSTmgezyY7brey12s+tY2mEHK+DiUZXfQjJ",
        "UeGum9qvZao5G71nZF9Jjf7woXb0UsWIFQfonkxS2d2XnjRJ6lL0E7sKAbNQBW4z0CzwvOjbRNbOf4Y7",
        "hM70DKmVbr2z20rH4cZVJfvfO54YxFFjGh0hipdC7icezjvInlmA0YHRUDoQywQzhDoO3I6N2w83D0IW",
        "E0H/tPiSRbm06UZKn/UXUntzsI8JzWLpdtxui+D8bXvVgarFFSroIb0U/aVX/XNHRreTHQebufO3GAoc",
        "p2zauAoZii8JuuljOVyGHDqP8tiIu64zmtxIsJBEbPWNOWdyRggksbN3of8eWUXhtNXTX7RIQHYR25Ns",
        "xMbwu3rMgKl4a+ekJT6SUalIME5ILsaJT+xx/YtShEuo"
      ]);
      break;

    default:
      break;
  }

  if (!packedB64) return null;

  // ---- "어려운 수식" 느낌의 가역 변환(하지만 CPU 최소) ----
  // payload는 (해시로부터 만든 seed) 기반의 xorshift keystream으로 XOR 되어 저장되어 있습니다.
  const seed = makeSeed(h1, h2, len);
  const bytes = base64ToBytes(packedB64);
  unxorInPlace(bytes, seed);

  // ---- 바이너리 -> 중첩 배열 디코딩 ----
  // 내부는 정수(스케일=10)로 저장되어 있고, 여기서 /10 하여 float 복원합니다.
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const state = { off: 0 };
  return decodeNode(view, state, 10);
}

// =================== helpers ===================

function joinChunks(chunks) {
  // 불필요한 연산 최소화(그냥 join)
  return chunks.join("");
}

function rotl32(x, r) {
  return ((x << r) | (x >>> (32 - r))) >>> 0;
}

function fnv1a32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    // h *= 16777619 (32-bit)
    h = (h + ((h << 1) >>> 0) + ((h << 4) >>> 0) + ((h << 7) >>> 0) + ((h << 8) >>> 0) + ((h << 24) >>> 0)) >>> 0;
  }
  return h >>> 0;
}

function djb2_32(str) {
  let h = 5381 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = (((h << 5) + h + (str.charCodeAt(i) & 0xff)) >>> 0);
  }
  return h >>> 0;
}

function makeSeed(h1, h2, len) {
  // "복잡해 보이지만" 연산은 매우 싸게(정수연산 몇 번)
  // 상수는 의미 없게 섞어 놓음
  let x = (h1 ^ rotl32(h2, 1) ^ 0xa5a5a5a5 ^ (len * 0x9e3779b9)) >>> 0;
  x = (x ^ rotl32(x, 13) ^ 0x3c6ef372) >>> 0;
  x = (x + ((x << 3) >>> 0) + 0x1b873593) >>> 0;
  return x >>> 0;
}

function xorshift32Step(x) {
  x ^= (x << 13) >>> 0;
  x ^= (x >>> 17) >>> 0;
  x ^= (x << 5) >>> 0;
  return x >>> 0;
}

function unxorInPlace(u8, seed) {
  let x = seed >>> 0;
  for (let i = 0; i < u8.length; i++) {
    x = xorshift32Step(x);
    u8[i] ^= (x & 0xff);
  }
}

function base64ToBytes(b64) {
  // 브라우저 표준 atob 사용
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i) & 0xff;
  return u8;
}

/**
 * 바이너리 포맷
 * - 0x01: 배열 노드  (uint16 length) + children...
 * - 0x02: 포인트 노드 (int32 xScaled, int32 yScaled)
 */
function decodeNode(view, st, scale) {
  const tag = view.getUint8(st.off); st.off += 1;

  if (tag === 0x02) {
    const x = view.getInt32(st.off); st.off += 4;
    const y = view.getInt32(st.off); st.off += 4;
    return [x / scale, y / scale];
  }

  if (tag === 0x01) {
    const n = view.getUint16(st.off); st.off += 2;
    const arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = decodeNode(view, st, scale);
    return arr;
  }

  // 알 수 없는 포맷이면 실패
  return null;
}

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

// FUNCTIONS ================================
function pathAddClass(p, c) {
  p.classList.add(c);
}
function dAdd(p, d) {
  p.setAttribute("d", d
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
  );
};
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

// SETTING ==================================
const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);
const container = document.getElementById("container");

const cardSize = { w: 191, h: 297 };

// SVG ======================================
const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(SVG_NS, "svg");
svg.classList.add("card");
svg.setAttribute("width", cardSize.w);
svg.setAttribute("height", cardSize.h);
svg.setAttribute('viewBox', `0 0 ${cardSize.w} ${cardSize.h}`);

// PATH =====================================
const path = {
  f: document.createElementNS(SVG_NS, "path"),
  r: document.createElementNS(SVG_NS, "path")
};

pathAddClass(path.f, "n");
pathAddClass(path.r, "nr");

const dd = getEncodedPath("JRPFIGSBDN");
console.log(dd);

// (async () => {
//   const dd = await computeResult("JRPFIGSBDN");
//   console.log(dd);
// })()


// const d = toSvgPaths(dd);


// if (d.length === 1) {
//   dAdd(path.f, d[0]);
//   dAdd(path.r, d[0]);
// } else if (d.length === 2) {
//   dAdd(path.f, d[0]);
//   dAdd(path.r, d[1]);
// }

// svg.appendChild(path.f);
// svg.appendChild(path.r);

// container.appendChild(svg);

// svgTransformNum()