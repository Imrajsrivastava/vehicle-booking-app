const { VehicleType, Vehicle } = require("../models");

const getVehicleTypes = async (req, res) => {
  const wheels = parseInt(req.query.wheels);
  try {
    const types = await VehicleType.findAll({ where: { wheels } });
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVehicles = async (req, res) => {
  const vehicleTypeId = req.query.vehicleTypeId;
  try {
    const vehicles = await Vehicle.findAll({ where: { vehicleTypeId } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getVehicleTypes,
  getVehicles,
};
