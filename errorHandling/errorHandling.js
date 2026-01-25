import fn1 from "./fn1.js";

try {
  const errState = fn1();
  console.log("errState : ", errState);
} catch (error) {
  console.log("try catch 에서 잡음");
  console.log("errCase : ", error.errCase);
  console.log("message : ", error.message);
};
