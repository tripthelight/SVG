/** =======================================================================
 * TEST
 */
function testDrawNumCards() {
  const pathT = {
    f: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
    r: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
  }
  
  // 1 ~ 8 에 사용되는 T
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
  // 1 ~ 8 에 사용되는 거꾸로 T
  const dTR = `
    M0,0
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
  // 9 ~ 10 에 사용되는 T
  const dTs = `
    M0,0
    m0,0
    l8,2 
    l19,0 
    l9,8 
    l-9,-2 
    l-5,0 
    l0,28 
    l-5,-8 
    l0,-20 
    l-8,0 
    Z
  `;
  // 9 ~ 10 에 사용되는 거꾸로 T
  const dTRs = `
    M0,0
    m14,0
    l5,8
    l0,20
    l8,0
    l9,8
    l-8,-2
    l-19,0
    l-9,-8
    l9,2
    l5,0
    Z
  `;
  
  function draw1Card() {
    // 중앙 : M75,128
    const posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
    const posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
  
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    const newD = dT
      .trim() // 앞뒤 공백 제거
      .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
      .replace(
        /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
        `M${posX},${posY}`
      );
  
    path.setAttribute('d', newD);
    svg.appendChild(path);
  };
  // draw1Card();
  
  function draw2Card() {
    // 상 : M75,68
    // 하 : M75,188
    const posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
    let posY = 0;
    let newD = "";
    for (let i = 0; i < 2; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 위쪽 T
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 2));
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 아래쪽 T
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 2));
  
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw2Card();
  
  function draw3Card() {
    // 상 : M75,61
    // 중 : M75,128
    // 하 : M75,195
    const posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
    let posY = 0;
    let newD = "";
    for (let i = 0; i < 3; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 위쪽 T
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 중간 T
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 아래쪽 T
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
  
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw3Card();
  
  function draw4Card() {
    // 좌상 : M35,61
    // 우상 : M115,61
    // 좌하 : M35,195
    // 우하 : M115,195
    let posX = 0;
    let posY = 0;
    let newD = "";
  
    for (let i = 0; i < 4; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 좌상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 우상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 좌하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 3) {
        // 우하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw4Card();
  
  function draw5Card() {
    // 좌상 : M35,61 
    // 우상 : M115,61
    // 중앙 : M75,128
    // 좌하 : M35,195
    // 우하 : M115,195
    let posX = 0;
    let posY = 0;
    let newD = "";
  
    for (let i = 0; i < 5; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 좌상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 우상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 중앙 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 3) {
        // 좌하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 4) {
        // 우하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw5Card();
  
  function draw6Card() {
    // 좌상 : M35,61 
    // 우상 : M115,61
    // 좌중 : M35,128
    // 우중 : M115,128
    // 좌하 : M35,195
    // 우하 : M115,195
    let posX = 0;
    let posY = 0;
    let newD = "";
  
    for (let i = 0; i < 6; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 좌상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 우상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 좌중 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 3) {
        // 우중 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 4) {
        // 좌하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 5) {
        // 우하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw6Card();
  
  function draw7Card() {
    // 좌상 : M35,61 
    // 우상 : M115,61
    // 중상 : M75,95
    // 좌중 : M35,128
    // 우중 : M115,128
    // 좌하 : M35,195
    // 우하 : M115,195
    let posX = 0;
    let posY = 0;
    let newD = "";
  
    for (let i = 0; i < 7; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 좌상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 우상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 중상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          - ( dn(encryptSize.t.h) / 1.2)
        );
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 3) {
        // 좌중 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 4) {
        // 우중 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 5) {
        // 좌하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 6) {
        // 우하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw7Card();
  
  function draw8Card() {
    // 좌상 : M35,61
    // 우상 : M115,61
    // 중상 : M75,95
    // 좌중 : M35,128
    // 우중 : M115,128
    // 중하 : M75,161
    // 좌하 : M35,195
    // 우하 : M115,195
    let posX = 0;
    let posY = 0;
    let newD = "";
  
    for (let i = 0; i < 8; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 좌상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 우상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 중상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          - ( dn(encryptSize.t.h) / 1.2)
        );
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 3) {
        // 좌중 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 4) {
        // 우중 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2);
        newD = dT
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 5) {
        // 중하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2);
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) / 1.2)
        );
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 6) {
        // 좌하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 7) {
        // 우하 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 + dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5));
        newD = dTR
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw8Card();
  
  function draw9Card() {
    // 좌상상 : M35,61
    // 우상상 : M115,61
    // 좌상 : M35,108
    // 우상 : M115,108
    // 중앙 : M75,128
    // 좌하 : M35,148
    // 우하 : M115,148
    // 좌하하 : M35,195
    // 우하하 : M115,195
    let posX = 0;
    let posY = 0;
    let newD = "";
  
    for (let i = 0; i < 9; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 좌상상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 우상상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 좌상 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          - ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 3) {
        // 우상 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          + ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 4) {
        // 중앙 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
        );
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 5) {
        // 좌하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          - ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 6) {
        // 우하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          + ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 7) {
        // 좌하하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          - ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 8) {
        // 우하하 T
        // 좌하하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          + ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw9Card();
  
  function draw10Card() {
    // 좌상상 : M35,61
    // 우상상 : M115,61
    // 중상 : M75,88
    // 좌상 : M35,108
    // 우상 : M115,108
    // 좌하 : M35,148
    // 우하 : M115,148
    // 중하 : M75,168
    // 좌하하 : M35,195
    // 우하하 : M115,195
    let posX = 0;
    let posY = 0;
    let newD = "";
  
    for (let i = 0; i < 10; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      if (i === 0) {
        // 좌상상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 - (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 1) {
        // 우상상 T
        posX = Math.floor(dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 + (dn(encryptSize.t.w)));
        posY = Math.floor(dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 - dn(encryptSize.t.h) - (dn(encryptSize.t.h) / 1.5));
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 2) {
        // 중상 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          - ( dn(encryptSize.t.h) )
        );
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 3) {
        // 좌상 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          - ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 4) {
        // 우상 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          + ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          - ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 5) {
        // 좌하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          - ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 6) {
        // 우하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          + ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) - dn(encryptSize.t.h) / 2  )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 7) {
        // 중하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 8) {
        // 좌하하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          - ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      } else if (i === 9) {
        // 우하하 T
        posX = Math.floor(
          ( dn(encryptSize.card.w) / 2 - dn(encryptSize.t.w) / 2 )
          + ( dn(encryptSize.t.w) )
        );
        posY = Math.floor(
          ( dn(encryptSize.card.h) / 2 - dn(encryptSize.t.h) / 2 )
          + ( dn(encryptSize.t.h) + (dn(encryptSize.t.h) / 1.5) )
        );
  
        newD = dTRs
          .trim() // 앞뒤 공백 제거
          .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
          .replace(
            /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
            `M${posX},${posY}`
          );
      };
  
      path.setAttribute('d', newD);
      svg.appendChild(path);
    }
  };
  // draw10Card();
}

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

/** =======================================================================
 * PARAMS
 */
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

const PARAMS = "PDBIZUOFMJ";

/** =======================================================================
 * VARIABLE
 */
const encryptSize = {
  card: { w: "MTkx", h: "Mjk3" }, // card size -> w: 191, h: 297
  num: { w: "MTg=", h: "MjY=" }, // number size -> w: 18, h: 26
  t: { w: "NDA=", h: "NDA=", ws: "MzY=", hs: "MzY=" }, // T size -> w: 40, h: 40, ws: 36, hs: 36
};

/** =======================================================================
 * FUNCTIONS
 */
function pathAddClass(p, c) {
  p.classList.add(c);
}
function dAdd(p, d) {
  p.setAttribute("d", d
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
  );
};

// 영문, 숫자 복호화 - 한글은 안됨
function safeBase64Decode(str) {
  try {
    return atob(str);
  } catch (e) {
    console.error('유효하지 않은 Base64:', e);
    return null;
  }
};
// 영문, 숫자 암호화 - 한글은 안됨
function safeBase64Encode(str) {
  try {
    return btoa(str);
  } catch (e) {
    // Unicode 문제일 가능성
    return btoa(unescape(encodeURIComponent(str)));
  }
};
// btoa / atob 암복호호 사용예시
// const eStr = safeBase64Encode(36); // 암호화
// console.log(eStr);
// const dStr = safeBase64Decode(eStr); // 복호화
// console.log(parseInt(dStr));
// console.log(dStr);

// 숫자 복호화
const dn = (n) => parseInt(safeBase64Decode(n));

// TODO: 인자로 받는 "OEJNIHMKXT"는 암호화 필요 - 
// "OEJNIHMKXT"는 x축 이동이 필요한 숫자 1
const editPos = {
  // 왼쪽 상단 숫자의 시작 M 변경
  f: (d) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${PARAMS === "OEJNIHMKXT" ? 10 + 8 : 10},${10}`
    );
  },
  // 오른쪽 하단 숫자의 시작 M 변경
  r: (d) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${PARAMS === "OEJNIHMKXT" ? Math.floor(parseInt(safeBase64Decode(encryptSize.card.w)) - 10 - 8) : Math.floor(parseInt(safeBase64Decode(encryptSize.card.w)) - 10 - parseInt(safeBase64Decode(encryptSize.num.w)))},${parseInt(safeBase64Decode(encryptSize.card.h)) - 10 - parseInt(safeBase64Decode(encryptSize.num.h))}`
    );
  },
}

/** =======================================================================
 * SETTING
 */
const DIV = document.createElement("div");
DIV.setAttribute("id", "container");
document.body.appendChild(DIV);
const container = document.getElementById("container");

/** =======================================================================
 * SVG
 */
const SVG_NS = "aHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc="; // "http://www.w3.org/2000/svg";
const svg = document.createElementNS(safeBase64Decode(SVG_NS), "svg");
svg.setAttribute("width", safeBase64Decode(encryptSize.card.w));
svg.setAttribute("height", safeBase64Decode(encryptSize.card.h));
svg.setAttribute('viewBox', `0 0 ${safeBase64Decode(encryptSize.card.w)} ${safeBase64Decode(encryptSize.card.h)}`);

/** =======================================================================
 * PATH
 */
// number -----------------------------------------------------------------
function drawNumber() {
  // 브라우저(클라이언트)에서 동작하는 ESModule 코드
  // - 입력 문자열(10개)은 코드에 평문으로 존재하지 않음 (해시로만 매칭)
  // - 결과 배열도 코드에 직접 작성하지 않음 (암호화된 페이로드를 "수식(난독 PRNG+복호+파싱)"으로 복원)
  const __PAYLOADS = Object.create({
    0x550b0f8c: "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==",
    0xc47bb621: "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4=",
    0xb8d8452d: "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz" +
    "8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+Zka" +
    "Y54=",
    0x57e225f7: "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSS" +
    "EF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50ac" +
    "JDc=",
    0xef349a13: "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudq" +
    "t8+9XIyQIU5b",
    0x83af8ca7: "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPn" +
    "RA8Zw+UJo4Kr3E//vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kv" +
    "BsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEA" +
    "s46EkOI=",
    0x73f143c9: "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJi" +
    "snCW5Iofl3YUZ3tn9zN0",
    0x1bf3e70b: "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQ" +
    "mYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ=",
    0xe3d01ebf: "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh2" +
    "1M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4O+RJa6GAJD8SV" +
    "0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeS" +
    "gZv9rDY=",
    0x5a916730: "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAyd" +
    "OOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJ" +
    "we0rZfDc7gbY+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkC" +
    "YHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA==",
  });

  /*
  const __PAYLOADS = Object.create(null);

  // key = FNV-1a 32-bit hash (입력 문자열의 해시), value = 암호화된(base64) 바이너리
  __PAYLOADS[0x550b0f8c] = "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==";
  __PAYLOADS[0xc47bb621] = "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4=";

  __PAYLOADS[0xb8d8452d] =
    "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz" +
    "8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+Zka" +
    "Y54=";

  __PAYLOADS[0x57e225f7] =
    "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSS" +
    "EF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50ac" +
    "JDc=";

  __PAYLOADS[0xef349a13] =
    "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudq" +
    "t8+9XIyQIU5b";

  __PAYLOADS[0x83af8ca7] =
    "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPn" +
    "RA8Zw+UJo4Kr3E//vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kv" +
    "BsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEA" +
    "s46EkOI=";

  __PAYLOADS[0x73f143c9] =
    "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJi" +
    "snCW5Iofl3YUZ3tn9zN0";

  __PAYLOADS[0x1bf3e70b] =
    "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQ" +
    "mYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ=";

  __PAYLOADS[0xe3d01ebf] =
    "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh2" +
    "1M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4O+RJa6GAJD8SV" +
    "0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeS" +
    "gZv9rDY=";

  __PAYLOADS[0x5a916730] =
    "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAyd" +
    "OOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJ" +
    "we0rZfDc7gbY+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkC" +
    "YHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA==";
  */

  function __fnv1a32(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i) & 0xff;
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  function __xorshift32(x) {
    x >>>= 0;
    x ^= (x << 13) >>> 0;
    x ^= x >>> 17;
    x ^= (x << 5) >>> 0;
    return x >>> 0;
  }

  // “어려운 수식” 기반 바이트 복호화(키스트림 생성)
  function __decryptInPlace(u8, seed) {
    let s = (seed ^ 0xa5a5a5a5) >>> 0;

    for (let i = 0; i < u8.length; i++) {
      // i*0x9E3779B9 누산 + xorshift + 비선형 혼합
      const add = Math.imul(i, 0x9e3779b9) >>> 0;
      s = __xorshift32((s + add) >>> 0);

      const rot = ((s >>> 16) | (s << 16)) >>> 0;
      const mix = (Math.imul(s, 0x27d4eb2d) ^ rot) >>> 0;
      const k = mix & 0xff;

      u8[i] ^= k;
    }
  }

  function __b64ToU8(b64) {
    // 브라우저: atob 사용
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 0xff;
    return out;
  }

  function __i16LE(dv, off) {
    return dv.getInt16(off, true);
  }

  function __unscale(i16) {
    // 스케일(×10) 복원 + “의미 없는 0항”을 섞어 수식 난도를 올림 (값은 그대로)
    const q = i16 / 10;
    const z = Math.sqrt(2) - Math.sqrt(2); // 0
    return Math.round((q + z) * 10) / 10;
  }

  function __unpack(u8) {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    let p = 0;

    const depth = dv.getUint8(p++);
    if (depth !== 1 && depth !== 2 && depth !== 3) throw new Error("bad payload");

    // counts 읽기
    let groupCount = 0;
    let pathCount = 0;
    let pathsPerGroup = null;
    let lens = null; // depth2: [len...], depth3: [[len...], ...]

    if (depth === 1) {
      const n = dv.getUint8(p++);
      const out = new Array(n);
      for (let i = 0; i < n; i++) {
        const x = __unscale(__i16LE(dv, p));
        const y = __unscale(__i16LE(dv, p + 2));
        p += 4;
        out[i] = [x, y];
      }
      return out;
    }

    if (depth === 2) {
      pathCount = dv.getUint8(p++);
      lens = new Array(pathCount);
      for (let i = 0; i < pathCount; i++) lens[i] = dv.getUint8(p++);

      const out = new Array(pathCount);
      for (let pi = 0; pi < pathCount; pi++) {
        const n = lens[pi];
        const path = new Array(n);
        for (let i = 0; i < n; i++) {
          const x = __unscale(__i16LE(dv, p));
          const y = __unscale(__i16LE(dv, p + 2));
          p += 4;
          path[i] = [x, y];
        }
        out[pi] = path;
      }
      return out;
    }

    // depth === 3
    groupCount = dv.getUint8(p++);
    pathsPerGroup = new Array(groupCount);
    lens = new Array(groupCount);

    for (let gi = 0; gi < groupCount; gi++) {
      const pc = dv.getUint8(p++);
      pathsPerGroup[gi] = pc;
      const l = new Array(pc);
      for (let pi = 0; pi < pc; pi++) l[pi] = dv.getUint8(p++);
      lens[gi] = l;
    }

    const out = new Array(groupCount);
    for (let gi = 0; gi < groupCount; gi++) {
      const pc = pathsPerGroup[gi];
      const grp = new Array(pc);
      for (let pi = 0; pi < pc; pi++) {
        const n = lens[gi][pi];
        const path = new Array(n);
        for (let i = 0; i < n; i++) {
          const x = __unscale(__i16LE(dv, p));
          const y = __unscale(__i16LE(dv, p + 2));
          p += 4;
          path[i] = [x, y];
        }
        grp[pi] = path;
      }
      out[gi] = grp;
    }
    return out;
  }

  // ✅ 요구사항 함수
  function getResultArray(secretKey) {
    if (typeof secretKey !== "string") throw new TypeError("string required");

    const h = __fnv1a32(secretKey);
    const b64 = __PAYLOADS[h];
    if (!b64) throw new Error("unknown key");

    const bytes = __b64ToU8(b64);
    __decryptInPlace(bytes, h);

    return __unpack(bytes);
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

  const pathNumber = {
    f: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
    r: document.createElementNS(safeBase64Decode(SVG_NS), "path")
  };
  
  const d_num = toSvgPaths(getResultArray(PARAMS));
  
  if (d_num.length === 1) {
    dAdd(pathNumber.f, editPos.f(d_num[0]));
    dAdd(pathNumber.r, editPos.r(d_num[0]));
  } else if (d_num.length === 2) {
    dAdd(pathNumber.f, editPos.f(d_num[0]));
    dAdd(pathNumber.r, editPos.r(d_num[1]));
  };
  
  svg.appendChild(pathNumber.f);
  svg.appendChild(pathNumber.r);
}
drawNumber();

// T ----------------------------------------------------------------------
function drawT() {
  // --- (1) 입력 문자열 평문 노출 방지: 해시로만 분기 ---
  const H = (s) => {
    // FNV-1a 32 + fmix 스타일 후처리(충돌 낮춤)
    let h = 0x811c9dc5 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0;
    h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0;
    h ^= h >>> 16;
    return h >>> 0;
  };

  // 입력 문자열(평문) 없이, 해시값으로만 케이스 결정
  // (아래 숫자들은 "OEJNIHMKXT" 등 평문이 아닌 해시 결과 값)
  /* const CASE_BY_HASH = (() => {
    console.log("CASE_BY_HASH 실행");
    
    const m = Object.create(null);
    m[0xbec62b4d] = 1;
    m[0xa4afcbff] = 2;
    m[0xc7de9c8a] = 3;
    m[0x79bba94a] = 4;
    m[0xccebf413] = 5;
    m[0xceb9b54d] = 6;
    m[0x5b848f1e] = 7;
    m[0xc44bfa9c] = 8;
    m[0x2df2d4a7] = 9;
    m[0xb8af365e] = 10;
    return m;
  })(); */

  const CASE_BY_HASH = Object.create({
    0xbec62b4d: 1,
    0xa4afcbff: 2,
    0xc7de9c8a: 3,
    0x79bba94a: 4,
    0xccebf413: 5,
    0xceb9b54d: 6,
    0x5b848f1e: 7,
    0xc44bfa9c: 8,
    0x2df2d4a7: 9,
    0xb8af365e: 10,
  })

  // --- (2) base64 디코드 ---
  const B = (b64) => {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };

  // --- (3) 도형(d/dr/ds/drs) 복호화: 코드에 원본 배열 없음 ---
  // 값 저장: byte = ((v + 64) XOR 0xA7), v는 int8 범위(-20..32 정도)
  const SHAPE_B64 = [
    "5+ft5fPn7e+RmZ3n58edn+ePkec=", // d
    "9+fh7+f/7efv75GZi+eRn+3l4ec=", // dr
    "5+fv5fTn7u+QmZzn5/ucn+eLn+c=", // ds
    "6efi7+fz7+fu75+ZiueQn+7l4uc="  // drs
  ];

  const DE_SHAPE = (idx) => {
    const k = (0xA7 ^ 0x00) | 0;     // 살짝 우회
    const off = (1 << 6) | 0;        // 64
    const raw = B(SHAPE_B64[idx]);
    const pts = new Array(raw.length >> 1);
    for (let i = 0, p = 0; i < raw.length; i += 2, p++) {
      // "매우 어려운 수식" 느낌: 불필요한 비트연산/우회 섞음
      const a = ((raw[i] ^ k) - off) | 0;
      const b = ((raw[i + 1] ^ k) - off) | 0;
      pts[p] = [a, b];
    }
    return pts;
  };

  const SHAPES = new Array(4);
  const shape = (idx) => (SHAPES[idx] ??= DE_SHAPE(idx));

  // --- (4) 케이스별 배치(좌표/도형 선택)도 암호화된 템플릿으로만 보관 ---
  // 템플릿 형식: [count, (shapeId,x,y)*]
  // 저장: byte = ((val + 17) XOR 0x5C)
  const CASE_TPL_B64 = [
    "", // 0 unused
    "Tk0AzQ==",
    "T00ACU4AkQ==",
    "SE0AEk0AzU4AiA==",
    "SU1oEk3YEk5oiE7YiA==",
    "Sk1oEk3YEk0AzU5oiE7YiA==",
    "S01oEk3YEk1ozU3YzU5oiE7YiA==",
    "RE1oEk3YEk0ALE1ozU3YzU5oiE7YiA==",
    "RU9oEk/YEk8ALE9ozU/YzUgA7khoiEjYiA==",
    "Rk9oEk/YEk9oIU/YIU8AzUho+UjY+UhoiEjYiA==",
    "R09oEk/YEk8ANU9oIU/YIUho+UjY+UgA5UhoiEjYiA=="
  ];

  const decodePlacements = (caseId) => {
    const k = (0x5C ^ 0x00) | 0;
    const off = (0x10 + 1) | 0; // 17
    const raw = B(CASE_TPL_B64[caseId]);

    const dec = (i) => (((raw[i] ^ k) - off) & 0xff) | 0;

    const n = dec(0);
    const out = new Array(n);
    let pos = 1;
    for (let i = 0; i < n; i++) {
      const sId = dec(pos++);      // 0..3
      const x = dec(pos++);        // 0..255
      const y = dec(pos++);        // 0..255
      out[i] = [sId, x, y];
    }
    return out;
  };

  // --- (5) 최종 결과 생성: 반환 배열 리터럴을 직접 작성하지 않음 ---
  const build = (caseId) => {
    const placements = decodePlacements(caseId);

    // case 1은 "단일 폴리곤 배열"을 바로 리턴해야 함
    if (caseId === 1) {
      const [sid, x, y] = placements[0];
      const pts = shape(sid);

      // [[x,y], ...pts] 형태를 계산으로 생성
      const one = new Array(pts.length + 1);
      one[0] = [x, y];
      for (let i = 0; i < pts.length; i++) one[i + 1] = pts[i];
      return one;
    }

    // 나머지는 "폴리곤들의 배열" 리턴
    const res = new Array(placements.length);
    for (let i = 0; i < placements.length; i++) {
      const [sid, x, y] = placements[i];
      const pts = shape(sid);

      const poly = new Array(pts.length + 1);
      poly[0] = [x, y];
      for (let j = 0; j < pts.length; j++) poly[j + 1] = pts[j];

      res[i] = poly;
    }
    return res;
  };

  // --- (6) 공개 함수 ---
  function getPattern(token) {
    if (!token) return null;
    const id = CASE_BY_HASH[H(token)];
    return id ? build(id) : null; // 매칭 없으면 null
  }

  /**
   * - 단일 폴리곤: [ [Mx,My], [dx,dy], [dx,dy], ... ]  => ["M... m... l... Z"]
   * - 폴리곤 n개:  [ 폴리곤, 폴리곤, ... ]             => ["...", "...", ...]
   */
  function toSvgPaths(input) {
    const isPoint = (v) =>
      Array.isArray(v) &&
      v.length === 2 &&
      typeof v[0] === "number" &&
      typeof v[1] === "number" &&
      Number.isFinite(v[0]) &&
      Number.isFinite(v[1]);

    const isPolygon = (arr) => Array.isArray(arr) && arr.length > 0 && arr.every(isPoint);

    const polygonToPath = (poly) => {
      const [mx, my] = poly[0];
      let s = `M${mx},${my}`;

      for (let i = 1; i < poly.length; i++) {
        const [x, y] = poly[i];
        const cmd = i === 1 ? "m" : "l";
        s += ` ${cmd}${x},${y}`;
      }
      return s + " Z";
    };

    if (!Array.isArray(input) || input.length === 0) return [];

    // 1) 단일 폴리곤이면 => 문자열 1개짜리 배열
    if (isPolygon(input)) {
      return [polygonToPath(input)];
    }

    // 2) 폴리곤 묶음이면 => n개 문자열 배열
    if (input.every(isPolygon)) {
      return input.map(polygonToPath);
    }

    throw new TypeError("입력 형식이 올바르지 않습니다.");
  }

  const d = toSvgPaths(getPattern(PARAMS));

  for (let i = 0; i < d.length; i++) {
    const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
    dAdd(path, d[i]);
    svg.appendChild(path);
  }
};
drawT();

/** =======================================================================
 * ADD SVG
 */
container.appendChild(svg);

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

const createSVG = async () => {
  console.log("SVG 그리기");
  // 실제 SVG 생성/DOM 삽입 작업
  return "svg";
};

// const createNumber = async (d) => {
//   console.log("number 그리기", d);
//   // 실제 숫자 그리기 작업
// };

// const createT = async (d) => {
//   console.log("T 그리기", d);
//   // 실제 문양 그리기 작업
// };

// const createSVG = () => new Promise(resolve => {
//   setTimeout(() => {
//     console.log("SVG 그리기");
//     resolve("SVG");
//   }, 2_000);
// });

const createNumber = (d) => new Promise(resolve => {
  setTimeout(() => {
    console.log("number 그리기", d);
    resolve();
  }, 3_000);
});

const createT = (d) => new Promise(resolve => {
  setTimeout(() => {
    console.log("T 그리기", d);
    resolve();
  }, 2_000);
});

async function selectedCard(nCode) {
  console.log("----- selectedCard 함수 실행됨 -----");

  const data = await createSVG();

  // 숫자/문양은 병렬로 그리고 둘 다 끝날 때까지 대기
  await Promise.all([createNumber(data), createT(data)]);

  // 여기까지 오면 SVG + 숫자 + 문양 완료
}

(async () => {
  await selectedCard("PDBIZUOFMJ");
  console.log("----- selectedCard 함수 종료됨 -----");
  console.log("===== 다음 함수 실행 =============");
})();


/*
const createNum = (data) => {
  const newData = data;
  console.log("createNum", newData);
  return newData;
}
const createT = (data) => {
  const newData = data;
  console.log("createT", newData);
  return newData;
}
const selectedCard = nCode => new Promise((reslove) => {
  reslove(nCode);
});

selectedCard("asdf")
  .then(createNum)
  .then(createT)
  .then(() => {
    console.log("끝");
  });
*/
