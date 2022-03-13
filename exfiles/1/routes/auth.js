const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")
const login = require("../middleware/login")

router.get("/", (req, res) => {
  res.send("Hello world!");
});
router.get("/protected", login, (req, res) => {
  res.send("Hello user!");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res
      .status(422)
      .json({ error: "Invalid email or password or name provided" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists" });
      }
      bcrypt.hash(password, 10)
        .then(hashedPass => {
          const user = new User({ email, name, password: hashedPass });
          user
            .save()
            .then((user) => {
            res.json({ msg: "added successfull" });
            })
            .catch((err) => {
              console.log(err);
            });
        })

    })
    
});

router.post("/signin", (req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.status(422).json({err: "Please add a email or password"});
  }
  User.findOne({email: email})
    .then(savedUser => {
      if(!savedUser){
        res.status(422).json({err: "Please add another email, this is already in use"})
      }
      
      bcrypt.compare(password, savedUser.password)
      .then((doMatch) => {
        if(doMatch){
          // res.json({msg: "Signed in successfully!"})
          const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
          res.json({token: token})
        }else{
          return res.json({err: "Please add another email or password"})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    })
    
    
})

module.exports = router;
