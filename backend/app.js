const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const { VehicleType, Vehicle, Booking, sequelize } = require("./models");
const app = express();

app.use(bodyParser.json());

app.use("/api", apiRoutes);
// checking the connection
VehicleType.findAll().then((vh) => {
  console.log(vh);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
