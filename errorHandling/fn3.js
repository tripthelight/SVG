export default () =>
  new Promise((resolve, reject) => {
    /* try {
      const ERR = true;
      if (ERR) {
        throw { errCase: "comn", message: "fn3 error test" }
      }
      resolve(ERR);
    } catch (error) {
      reject(error);
    } */

    const ERR = true;
    if (ERR) {
      reject({ errCase: "comn", message: "fn3 error test" });
    };
    resolve(ERR);
  });
