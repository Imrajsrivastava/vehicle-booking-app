const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Vehicle", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    model: DataTypes.STRING,
    vehicleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
