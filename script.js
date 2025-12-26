const WW = window.innerWidth;
const WH = window.innerHeight;
console.log("window width : ", WW);
console.log("window height : ", WH);


const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);

const container = document.getElementById("container");


const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(SVG_NS, "svg");
svg.setAttribute("width", "312");
svg.setAttribute("height", "314");
svg.setAttribute('viewBox', `0 0 312 314`);
// svg.setAttribute('preserveAspectRatio', "xMidYMid meet");

const g = document.createElementNS(SVG_NS, "g");
g.setAttribute('transform', 'translate(0,0) scale(1,1)');
g.setAttribute('fill', '#000');
g.setAttribute('stroke', 'none');

const path_T = document.createElementNS(SVG_NS, "path");
/* const d = `
  M140 290
  c-6 -16 -11 -65 -11 -109 0 -110 -7 -120 -75 -113 -49 5 -53 4 -45 -12 22 -40 42 -46 170 -52 69 -3 127 -4 129 -3 2 1 -1 11 -7 22 -10 19 -47 38 -86 44 -18 3 -21 16 -31 116 -11 121 -26 155 -44 107
  z
`; */
const d = `M 50 50 C 50 250 250 50 250 250 `;
path_T.setAttribute("d", d);

g.appendChild(path_T);
svg.appendChild(g);
container.appendChild(svg);