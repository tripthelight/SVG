import fn3 from "./fn3.js";

export default () => {
  try {
    fn3()
      .then((result) => {
        //
      })
      .catch(error => {
        console.log("promise 에서 잡음");
        console.log("errCase : ", error.errCase);
        console.log("message : ", error.message);
      });

    // if (ERR) {
    //   throw { errCase: "comn", message: "fn2 error test" };
    // };
  } catch (error) {
    throw error;
  }
};