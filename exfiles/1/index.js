const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");
const PORT = 5000;


mongoose.connect(MONGO_URI);

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));



app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB has been connected successfully!")
// })
// mongoose.connection.on("error", (err) => {
//   console.log("MongoDB couldn't be connected successfully!", err)
// })
// const password = "Hf0PJJzjioBXFbLO"
// const URL = `mongodb+srv://bekkidev:${password}@cluster0.oe6qw.mongodb.net/bekkigram`
