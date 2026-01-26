import fn3 from "./fn3.js";

export default () => {
  try {
    /* fn3()
      .then((result) => {
        //
      })
      .catch(error => {
        console.log("promise 에서 잡음");
        console.log("errCase : ", error.errCase);
        console.log("message : ", error.message);
      }); */


    /* const ERR = true;
    const PROMISE1 = new Promise((resolve, reject) => {
      resolve(ERR);
    });
    PROMISE1
      .then((_data) => {
        const PROMISE2 = new Promise((resolve, reject) => {
          fn3()
            .then(() => {
              resolve(_data);
            })
            .catch(error => {
              reject(error);
              // console.log("fn3 에서 잡음");
              // console.log("errCase : ", error.errCase);
              // console.log("message : ", error.message);
            })
        });
        PROMISE2
          .then(() => {
            const PROMISE3 = new Promise((resolve, reject) => {
              resolve();
            });
            PROMISE3
              .then(() => {
                //
              })
              .catch(error => {
                console.log("PROMISE3 에서 잡음");
                console.log("errCase : ", error.errCase);
                console.log("message : ", error.message);
              })
          })
          .catch(error => {
            console.log("PROMISE2 에서 잡음");
            console.log("errCase : ", error.errCase);
            console.log("message : ", error.message);
          })
      })
      .catch((error) => {
        console.log("PROMISE1 에서 잡음");
        console.log("errCase : ", error.errCase);
        console.log("message : ", error.message);
      }); */

    const ERR = true;
    const PROMISE1 = new Promise((resolve, reject) => {
      try {
        if (ERR) {
          throw { errCase: "trycatch", message: "Primise try catch TEST" }
        };
        resolve(ERR)
      } catch (error) {
        reject(error);
      }
    });
    PROMISE1
      .then((_data) => {
        try {
          if (ERR) {
            throw { errCase: "then", message: "Primise then TEST" }
          }
        } catch (error) {
          throw error
        }
      })
      .catch((error) => {
        console.log("PROMISE1 에서 잡음");
        console.log("errCase : ", error.errCase);
        console.log("message : ", error.message);
      })

  } catch (error) {
    throw error;
  }
};