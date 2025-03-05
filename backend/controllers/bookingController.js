const { Booking } = require("../models");
const { Op } = require("sequelize");

const createBooking = async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
  try {
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
};

module.exports = {
  createBooking,
};
