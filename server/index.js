const express = require("express");
const cors = require("cors");

const locationRouter = require("./routes/locationRouter");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/location", locationRouter);

app.listen(3001, () => {
  console.log("Hi i am listening at port 3001");
});
