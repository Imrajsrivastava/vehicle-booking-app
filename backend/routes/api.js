const express = require("express");
const router = express.Router();
const { VehicleType, Vehicle, Booking, sequelize } = require("../models");

router.get("/vehicle-types", async (req, res) => {
  const wheels = parseInt(req.query.wheels);
  try {
    const types = await VehicleType.findAll({ where: { wheels } });
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/vehicles", async (req, res) => {
  const vehicleTypeId = req.query.vehicleTypeId;
  try {
    const vehicles = await Vehicle.findAll({ where: { vehicleTypeId } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/bookings", async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
  try {
    const { Op } = require("sequelize");
    const overlapping = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
        ],
      },
    });
    if (overlapping) {
      return res
        .status(400)
        .json({ error: "Booking dates overlap with an existing booking" });
    }
    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
