const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const con = require("../lib/db_connection");
const jwt = require('jsonwebtoken')
const middleware = require("../middleware/auth");

//Get all products
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});


// Gets one product
router.get("/:id", (req, res) => {
    try {
      con.query(`SELECT * FROM products WHERE product_id ="${req.params.id}"`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
      // res.send({ id: req.params.id });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });


  router.put("/:id",middleware, (req, res) => {
    // if(req.user.user_type === "Admin") {
    // the below allows you to only need one const, but every input required is inside of the brackets
    const {
        name,
        price,
        descriptions,
        image,
        category,
        created_date,
        stock
    } = req.body;
    // OR
    // the below requires you to add everything one by one
    //   const email = req.body.email;
    try {
      con.query(
        //When using the ${}, the content of con.query MUST be in the back tick
        `UPDATE products set name="${name}", price="${price}", descriptions="${descriptions}", image="${image}", category="${category}", created_date="${created_date}", stock="${stock}" WHERE product_id ="${req.params.id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }}
    // else{
    //   res.send("Not an Admin, access denied!");
    // } 
  );


  // Add new products
  router.post("/", (req, res) => {
    // if(req.user.user_type === "Admin") {
    // the below allows you to only need one const, but every input required is inside of the brackets
    const {
      name,
      price,
      descriptions,
      image,
      category,
      created_date,
      stock
    } = req.body;
    // OR
    // the below requires you to add everything one by one
    //   const email = req.body.email;
    try {
      con.query(
        //When using the ${}, the content of con.query MUST be in the back tick
        `INSERT INTO products (
            name,
            price,
            descriptions,
            image,
            category,
            created_date,
            stock) VALUES ( "${name}", "${price}", "${descriptions}", "${image}", "${category}", "${created_date}", "${stock}" )`,
        (err, result) => {
          if (err) throw err;
          console.log("product successfully created")
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }}
    // else{
  //     res.send("Not an Admin, access denied!");
  //   } 
 );
  
  // Delete one products
  // router.delete("/:id", (req, res) => {
  //   try {
  //     con.query(
  //       `DELETE FROM products WHERE id=${req.params.id}`,
  //       (err, result) => {
  //         if (err) throw err;
  //         res.send(result);
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   })


    router.delete("/:id", (req, res) => {
      try {
        con.query(
          `DELETE FROM products WHERE product_id="${req.params.id}"`,
          (err, result) => {
            if (err) throw err;
            res.send(result);
          }
        );
      } catch (error) {
        console.log(error);
      }
    });


module.exports = router;