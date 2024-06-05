const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require('cors')

app.use(cors({origin:"http://localhost:5173"}))
// app.use(cors())


app.use(bodyParser.json());

app.use("/api", userRoutes);

app.use((req, res) => {
  res.status(404).send({ msg: "Error hai bhai" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
