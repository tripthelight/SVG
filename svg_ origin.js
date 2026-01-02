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


// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
