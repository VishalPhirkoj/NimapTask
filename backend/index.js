const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const db = require("./db/db");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./routes/index.route"));

// app.get("/", (req, res) => {
//   res.send("Namasthe World");
// });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
