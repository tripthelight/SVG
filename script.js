const WW = window.innerWidth;
const WH = window.innerHeight;
console.log("window width : ", WW);
console.log("window height : ", WH);


const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);

const container = document.getElementById("container");

const cardSize = { w: 191, h: 297 };
const numScale = { w: 1, h: 1 };

// number round =============================
const numRndEl = document.createElement("div");
numRndEl.classList.add("num-round");
container.appendChild(numRndEl);

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
g.setAttribute('fill', '#000');
g.setAttribute('stroke', 'none');

const path_N = document.createElementNS(SVG_NS, "path");
path_N.classList.add("n");
// NUM 1
const dN1 = `
  M0,0
  m10,4
  l4,-4
  l0,22
  l-4,4
  Z
`;
// NUM 2
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
// NUM 5
const dN5 = `
  M0,0
  m0,8
  l8 -8
  l4 0
  l-8 8
  l0 10
  l20 -18
  l0 18
  l-8 8
  l-4 0
  l8 -8
  l0 -10
  l-20 18
  Z
`;
// NUM 6
const dN6 = `
  M0,0
  m0,8
  l8 -8
  l4 0
  l-8 8
  l0 10
  l20 -18
  l0 18
  l-8 8
  l-16 0
  l4 -4
  l12 0
  l4 -4
  l0 -10
  l-20 18
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

path_N.setAttribute("d", dN7
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);
g.appendChild(path_N);
svg.appendChild(g);

// T
const path_T = document.createElementNS(SVG_NS, "path"); // width: 64, height: 64
path_T.classList.add("t");
const dT = `
  M0,0
  l16,2 
  l30,0 
  l14,12 
  l-14,-2 
  l-10,0 
  l0,52 
  l-10,-12 
  l0,-40 
  l-10,0 
  Z
`;
path_T.setAttribute("d", dT
  .trim() // 앞뒤 공백 제거
  .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
);

// g.appendChild(path_T);
// svg.appendChild(g);
svg.appendChild(path_T);

container.appendChild(svg);


// size check
// SVG
const svgEl = document.querySelector('svg');
const w = svgEl.getAttribute('width');
const h = svgEl.getAttribute('height');
console.log("CARD width :", w);
console.log("CARD height :", h);
const rect = svgEl.getBoundingClientRect();
console.log("CARD width :", rect.width);
console.log("CARD height :", rect.height);
// path
const path = document.querySelector('svg.card path.t');
const bbox = path.getBBox();
console.log(bbox.x);      // 시작 x
console.log(bbox.y);      // 시작 y
console.log(bbox.width);  // path width
console.log(bbox.height); // path height

// path의 "M" 좌표 변경
const posX = Math.floor(rect.width / 2 - bbox.width / 2);
const posY = Math.floor(rect.height / 2 - bbox.height / 2);
const oldD = path.getAttribute('d');
// const newD = oldD.replace('M0,0', `M${posX},${posY}`);
const newD = oldD.replace(
  /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
  `M${posX},${posY}`
);
path.setAttribute('d', newD);