const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config/key")
const mongoose = require('mongoose');
const User = mongoose.model(("User"))

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization) {
    res.status(401).json({error: 'You must logged in first!'})
  }
  const token = authorization.replace("Bekki ", "")
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err){
      return res.json({error: "You must login first!"})
    }
    const {_id} = payload;
    User.findById({_id})
      .then(userData => {
        req.user = userData;
        next()
      })
    
  })
}