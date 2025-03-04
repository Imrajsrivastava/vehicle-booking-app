const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const VehicleType = require("./VehicleType")(sequelize);
const Vehicle = require("./Vehicle")(sequelize);
const Booking = require("./Booking")(sequelize);

VehicleType.hasMany(Vehicle, { foreignKey: "vehicleTypeId" });
Vehicle.belongsTo(VehicleType, { foreignKey: "vehicleTypeId" });

Vehicle.hasMany(Booking, { foreignKey: "vehicleId" });
Booking.belongsTo(Vehicle, { foreignKey: "vehicleId" });

module.exports = {
  sequelize,
  VehicleType,
  Vehicle,
  Booking,
};
