const { sequelize, VehicleType, Vehicle } = require("../models");

async function seed() {
  await sequelize.sync({ force: true });

  const carTypes = await Promise.all([
    VehicleType.create({ name: "Hatchback", wheels: 4 }),
    VehicleType.create({ name: "SUV", wheels: 4 }),
    VehicleType.create({ name: "Sedan", wheels: 4 }),
  ]);
  const bikeTypes = await Promise.all([
    VehicleType.create({ name: "Cruiser", wheels: 2 }),
    VehicleType.create({ name: "Sports", wheels: 2 }),
  ]);

  for (let type of carTypes) {
    await Vehicle.create({
      model: `${type.name} Model A`,
      vehicleTypeId: type.id,
    });
  }
  for (let type of bikeTypes) {
    await Vehicle.create({
      model: `${type.name} Model X`,
      vehicleTypeId: type.id,
    });
  }

  console.log("Database seeded!");
}

seed()
  .then(() => process.exit())
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
