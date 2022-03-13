const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default: "https://res.cloudinary.com/bolibekjnfjenfjnfjnfpjnfjnfenkjfwjf/image/upload/v1647139365/User_Avatar_2_zic9un.png"
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  

})

model("User", userSchema);