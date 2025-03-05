import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const Step4 = ({ formData, setFormData, vehicles, errors }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, vehicleId: e.target.value });
  };

  return (
    <FormControl component="fieldset" error={Boolean(errors.vehicleId)}>
      <FormLabel component="legend">Select Vehicle Model</FormLabel>
      <RadioGroup value={formData.vehicleId} onChange={handleChange}>
        {vehicles.map((vehicle) => (
          <FormControlLabel
            key={vehicle.id}
            value={String(vehicle.id)}
            control={<Radio />}
            label={vehicle.model}
          />
        ))}
      </RadioGroup>
      {errors.vehicleId && <FormHelperText>{errors.vehicleId}</FormHelperText>}
    </FormControl>
  );
};

export default Step4;
