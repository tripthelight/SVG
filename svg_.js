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

const START = 0x7fff; // 배열 시작 마커
const END = 0x7ffe; // 배열 종료 마커

const B = (...parts) => parts.join("");

// (1) 입력 문자열 -> 32bit 해시 (FNV-1a)
function fnv1a32(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// (2) 해시 믹싱 (분포 개선)
function mix32(x) {
  x >>>= 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b) >>> 0;
  x ^= x >>> 16;
  return x >>> 0;
}

// (3) xorshift32 기반 바이트 스트림 (복호화)
function xorInPlace(bytes, seed) {
  let x = seed >>> 0;
  let r = 0;
  for (let i = 0; i < bytes.length; i++) {
    if ((i & 3) === 0) {
      x ^= (x << 13) >>> 0;
      x ^= x >>> 17;
      x ^= (x << 5) >>> 0;
      r = x >>> 0;
    }
    const shift = 24 - ((i & 3) << 3);
    bytes[i] ^= (r >>> shift) & 0xff;
  }
  return bytes;
}

// (4) base64 -> Uint8Array
function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 0xff;
  return out;
}

// (5) 토큰 스트림(빅엔디안 int16) -> 중첩 배열 복원
function tokensToNestedArray(tokens) {
  const stack = [];
  let cur = null;
  let root = null;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    if (t === START) {
      const arr = [];
      if (cur) cur.push(arr);
      else root = arr;
      stack.push(cur);
      cur = arr;
      continue;
    }

    if (t === END) {
      cur = stack.pop();
      continue;
    }

    // 수치 토큰은 10배 스케일된 값이므로 /10
    cur.push(t / 10);
  }

  return root;
}

// (6) seed -> payload 선택 (입력 원문 문자열은 코드에 없음)
const TABLE = [
  [
    0x8da12359 >>> 0,
    "73/fwxRrLZ81OCTstSsDyQBAH/XERLytNBBX1VOOxGOXyzispNPglD3QKdY=",
  ],
  [
    0xcb721531 >>> 0,
    B(
      "zKU1RLunoB3E3qHQvEil6cnjHrlcqNgwKPSIPjcktDh7JU6ww9rmBpGE8PFMdQij",
      "r7jrCqYGhq3Xy9piczNwHlUq2UN+4LENfaNTdA=="
    ),
  ],
  [
    0x3c0b998e >>> 0,
    B(
      "14rDjJ9+ok5NyXKUnxQQWN7+C9bid7/XO3g9uqi/Yea2xKii1jiXr9z/HPRT3lQl",
      "0+TpchhsC6Y4ok3sTBJWeF30TDbV2Z+yvbt4/wdKBOw8y/f6i1HyvYumTwSL6mpd",
      "3VKwsoPE2PGMc9+tZQJV9lfbfy1fZO51GBiMhbkdkHzp3xS0A5Lz6m/reRiYV+bh",
      "dXrfxZ8mOP7Q9A9b8nCGMLkDHBQIiXTWa5DkYgruIpaYXPwpfQqXeFyjVhU="
    ),
  ],
  [
    0xe8ac3311 >>> 0,
    B(
      "yPXVSdYgaJjdRWrA/ECzL84bLnzPuHnlT4/AE80Suzi0s/mj+S2uGkxqmignCzNr",
      "8lLHOfGfhwCxEz0Li9TGXxAwGjFpE0ipgKbAWcfL91oCfV1ryb/0aVOlHEcvheNa",
      "IfWHEtPws1j5FlsUHNJID2V8ZIdL7rMFp2Xfz++mzkAhrenjk33owLi4U1iI3IPw",
      "jHw78OsoTeI6xFMdO9YNb3cne64QrKhlbATNHyFPYa1vRUOXoaJ8P6BGS8Y="
    ),
  ],
  [
    0xa994b126 >>> 0,
    B(
      "tkLOwYzTkJNZDg5sMIK74uaTvrcJjhMaIs1okMQa+ICmmXvW+g4jjeXuaiiN/Yml",
      "24FcX0HLiGWhDac/GJrMDR//sc6ej5jCqGHe+6u+K7srHmlTkNf03ZOGrH83HUed",
      "/EwGtaCQv0c2fXg/"
    ),
  ],
  [
    0xd197baa3 >>> 0,
    B(
      "gUWOfc4p2Sc0s/hgs7PSfpY0aWH9t2QUqWS4WnXbNi0QvIcbBFwGPpbvX4P7983H",
      "K9t/AaAqEE47tVC0OUilVPEqiOQ6kglCjZrRtaeIFJaHwfZfF7Spu00AWFuL/AkZ",
      "zpLv4vMuVeJr2eOqrl5+WDIPOpzxMW4S3D6qD0E/1K5RbKn67WEgvmViKRKzGZL8",
      "ZkohoA2u7J5YYmyhy3hC+yJokzGvNwjiDQ6tiq7F+LakQoOeEhzGp9+nHaA+Iss6",
      "gplS8y/Ze3EayLhMNMx9Q1gbGU/cLKkzz8P3d/T1fCBWJaxKC930F4IuqCnS0Rvd",
      "WJ3sVcae09QFyKuIh+UFjEIx6pIN8lTyT9/SkJuzTXcS5IpUdKMWVEAM/O8="
    ),
  ],
  [
    0xe789a1a7 >>> 0,
    B(
      "2+dYpsFmsyCXQ2NgETt4NtmPrcmnjhjRaUqTcFIpKzn8v3y7+d33iyHOuq8LhAqm",
      "UKmq1lRv5WItmo6GZ+0tlUZkQ+VtHtYow12N30xFfB8U7OpE3VAQr7gBOfj6NhWF",
      "uVQm0+5yBXH6pXYGWFEh0Pxj5Vob4u38AgJTTQ=="
    ),
  ],
  [
    0xc3dc4a13 >>> 0,
    B(
      "ZqCbI11G0f4XrWX9aXiuu5flmGYJqc/9rh4O6ifxYHSHEW1mTTvHO/HG+ze1dLiM",
      "kwciAi+VqnpeAklSvaRiGdvirM8OnE3s9bzi2eUgCxISa4ztrax4qfy84KzFund/",
      "nGLlO5fwdjbI4l7fq6MvPPU4ci8k+dpKdi4rd2t/D8THT9aAPl/5rJOkxnvWbeIR",
      "OQJcvJBRnJZtKtCMYGvutzRqrtYY4qdxo51sMw=="
    ),
  ],
  [
    0x8eb27622 >>> 0,
    B(
      "sUPqxqCX/bTbHdlF6WvanrV07COzRC5ieWoU8sM1VJU81YtFtedm2h63jSUBGwkv",
      "57RCg54NQjpg+/Ue2cv6VPeOnfst+1QdKSD0pGatLL/EHsaD5mV6tvKigcRtSHA4",
      "aim9nnK/d26XY+dtH+8lBBLcEBsEz46AyAIQXi4OM057GKc8M17ZrmfC80yXkFE3",
      "5K86cx/c5AJnN+gNvLBoNwLLcDVrneknh90R+/nf7rMKz13dTuF0F0kfza3FnUUZ",
      "qYrtlO7YPINc1R1WcAUwKIpkcHUIXqyK4ZiNWHfG7kVkOssjCXrL7Vx7R6k66Y16",
      "bgOq7hCYQIAF4i3gKqwSYTsbHFHUFvQ9PxIzy8uJT18NesKjcjujA1Z1CGE="
    ),
  ],
  [
    0xc4dab937 >>> 0,
    B(
      "k4F2Fvrbqbedqe5+zL94DNuUa5LqGNMgdTZyf0vcevff/dQ7quCZp5fzho6DCStM",
      "4KBNSVcY74wDlR/0YtQPwuZKvOoE1JwU4gDtC4C/k5JK+ve3GngTsHkHJrYzR6n9",
      "iRiPUgx9o2I7reEO+feD/ackjU3qt446FG60IRBD5/9k6Ysq6Yyle0ZySUtz/jmh",
      "rJVMxCtDQdWsezOBhg5fb5FOZb9084gKO/opIKh2WTvGtl0TP4lgph/W+5dkEjtS",
      "My5NuxmeidDB3pfyx2YqPbUC1wCjj4YSRmX8Oopv4ZxA57dROBF+qByvZftCMgRg",
      "SE/uOLThE2PwXic5E6l2Nk55lalVZDUIN4lX/vwmifq5Leo0xslQKsvZsh3+7s4H",
      "vi7oK0mJtnVqZS9qjrDaVbYoMEB77wWRYEpHwFWmVRbPsk/TUqI4JxFFtLchJgmQ",
      "rU5y7fxfNEfwFTuXJw3hTDBi0N7qnv5i"
    ),
  ],
];

// TABLE에서 seed에 해당하는 payload 찾기
function findPayload(seed) {
  // 일부러 단순 비교 대신, 지저분한 수식으로 변환 후 비교
  // (보안이 아니라 난독화 목적)
  const s = seed >>> 0;
  for (let i = 0; i < TABLE.length; i++) {
    const k = TABLE[i][0] >>> 0;
    const a =
      (Math.imul((k ^ 0x9e3779b9) >>> 0, 0x85ebca6b) + i * 0x27d4eb2f) >>> 0;
    const b =
      (Math.imul((s ^ 0x9e3779b9) >>> 0, 0x85ebca6b) + i * 0x27d4eb2f) >>> 0;
    if (a === b) return TABLE[i][1];
  }
  return null;
}

// ====== 공개 함수 ======
function getResult(input) {
  const seed = mix32(fnv1a32(String(input)));
  const payload = findPayload(seed);
  if (!payload) return null;

  const bytes = b64ToBytes(payload);
  xorInPlace(bytes, seed);

  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tokens = new Int16Array(bytes.byteLength >>> 1);
  for (let i = 0; i < tokens.length; i++) {
    tokens[i] = dv.getInt16(i << 1, false); // big-endian
  }

  return tokensToNestedArray(tokens);
}

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

// FUNCTIONS ==============================================================
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

// SETTING ================================================================
const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);
const container = document.getElementById("container");

const cardSize = { w: 191, h: 297 };

// SVG ====================================================================
const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(SVG_NS, "svg");
svg.classList.add("card");
svg.setAttribute("width", cardSize.w);
svg.setAttribute("height", cardSize.h);
svg.setAttribute('viewBox', `0 0 ${cardSize.w} ${cardSize.h}`);

// PATH ===================================================================
const path = {
  f: document.createElementNS(SVG_NS, "path"),
  r: document.createElementNS(SVG_NS, "path")
};

pathAddClass(path.f, "n");
pathAddClass(path.r, "nr");

const dd = getResult("JRPFIGSBDN");
console.log(dd);
console.log(JSON.stringify(dd));

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