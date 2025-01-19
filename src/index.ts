import router from "./routes/v1/user.route";

require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
