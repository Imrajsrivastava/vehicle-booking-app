const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("VehicleType", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    wheels: DataTypes.INTEGER,
  });
};
