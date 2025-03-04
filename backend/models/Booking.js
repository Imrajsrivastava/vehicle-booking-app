const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Booking", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
  });
};
