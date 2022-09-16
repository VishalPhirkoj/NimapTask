const db = require("../db/db");

const addCategory = async (req, res) => {
  try {
    const insertCategory = async () => {
      try {
        // console.log(req.body);
        let sql = `Insert into testdb.categorymst (CategoryName) values('${req.body.categoryName}')`;
        await db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            res.json({
              status: true,
              message: "Category Added.",
              result: result,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    const checkCategory = async () => {
      // console.log(req);

      let sql = `Select * from categorymst where CategoryName='${req.body.categoryName}'`;
      await db.query(sql, (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          if (!result.length) {
            insertCategory();
          } else {
            res.json({
              status: "exist",
              message: `This CategoryName "${req.body.categoryName}" is already exits! `,
            });
            console.log(
              `This CategoryName ${req.body.categoryName} is already exits! `
            );
          }
        }
      });
    };
    checkCategory();
  } catch (err) {
    console.log(`addCategory Error: ${err}`);
  }
};

const categoryList = async (req, res) => {
  try {
    let sql = `SELECT * FROM testdb.categorymst`;
    await db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        // console.log(JSON.stringify(result));
        // console.table({ result: result });
        // res.redirect("/login");
        res.json({
          status: true,
          // message: "Category Added.",
          result: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const insertProduct = async () => {
      try {
        // console.log(req.body);
        let sql = `Insert into testdb.productmst (ProductName, CategoryId) values('${req.body.productName}', ${req.body.categoryId})`;
        await db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            // console.log(JSON.stringify(result));
            // console.table({ result: result });
            // res.redirect("/login");
            res.json({
              status: true,
              message: `${req.body.productName} Product Added.`,
              result: result,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    const checkProduct = async () => {
      // console.log(req);

      let sql = `Select * from productmst where ProductName='${req.body.productName}'`;
      await db.query(sql, (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          if (!result.length) {
            insertProduct();
          } else {
            res.json({
              status: "exist",
              message: `This Product Name "${req.body.productName}" is already exits! `,
            });
            // console.log(
            //   // `This Product Name "${req.body.productName}" is already exits! `
            // );
          }
        }
      });
    };
    checkProduct();
  } catch (err) {
    console.log(`addProduct Error: ${err}`);
  }
};

// const productList = async (req, res) => {
//   try {
//     let sql = `SELECT P.*, C.CategoryName FROM productmst P,categorymst C WHERE C.CategoryId=P.CategoryId`;
//     await db.query(sql, (err, result) => {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         res.json({
//           status: true,
//           result: result,
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
const productsPerPage = 10;
const productList = async (req, res) => {
  try {
    let sql = `SELECT P.*, C.CategoryName FROM productmst P,categorymst C WHERE C.CategoryId=P.CategoryId`;
    await db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const noOfProducts = result.length;
        const numberOfPages = Math.ceil(noOfProducts / productsPerPage);
        res.json({
          status: true,
          result: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    console.log(req.params);
    let sql = `SELECT P.*, C.CategoryName FROM productmst P,categorymst C WHERE C.CategoryId=P.CategoryId AND P.ProductId=${req.params["id"]}`;
    await db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(result);
        res.json({
          status: true,
          result: result[0],
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const insertProduct = async () => {
      try {
        let sql = `UPDATE productmst SET CategoryId=${req.body.categoryId}, ProductName='${req.body.productName}' WHERE ProductId=${req.body.productId}`;
        // console.log(sql);
        await db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            res.json({
              status: true,
              message: `${req.body.productName} Product Updated.`,
              result: result,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    insertProduct();
  } catch (err) {
    console.log(`addProduct Error: ${err}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    let sql = `DELETE FROM productmst WHERE ProductId=${req.body.productId}`;
    await db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        res.json({
          status: true,
          message: `Product Deleted.`,
          result: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCategory,
  categoryList,
  addProduct,
  productList,
  getProduct,
  updateProduct,
  deleteProduct,
};
