import xorshift32 from "./xorshift32.js";

// ---------- 난독화된 복호화(XOR 스트림) ----------
// XOR이므로 encrypt/decrypt 동일 (payload는 "암호화된 상태"로 저장)
export default (u8, seed) => {
  let s = (seed ^ 0x9e3779b9) >>> 0;
  let acc = 0x85ebca6b >>> 0;

  for (let i = 0; i < u8.length; i++) {
    s = xorshift32(s);
    acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
    const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
    u8[i] ^= m;
  }
  return u8;
};