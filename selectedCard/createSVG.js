import { safeBase64Decode } from "./fns/base64Crypt.js"

export default async (nCode) => {
  const encryptSize = {
    card: { w: "MTkx", h: "Mjk3" }, // card size -> w: 191, h: 297
    num: { w: "MTg=", h: "MjY=" }, // number size -> w: 18, h: 26
    t: { w: "NDA=", h: "NDA=", ws: "MzY=", hs: "MzY=" }, // T size -> w: 40, h: 40, ws: 36, hs: 36
  };

  const SVG_NS = "aHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc="; // "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(safeBase64Decode(SVG_NS), "svg");
  svg.setAttribute("width", safeBase64Decode(encryptSize.card.w));
  svg.setAttribute("height", safeBase64Decode(encryptSize.card.h));
  svg.setAttribute('viewBox', `0 0 ${safeBase64Decode(encryptSize.card.w)} ${safeBase64Decode(encryptSize.card.h)}`);

  const container = document.getElementById("container");
  container.appendChild(svg);

  return {
    nCode,
    encryptSize,
    SVG_NS,
    svg
  };
}