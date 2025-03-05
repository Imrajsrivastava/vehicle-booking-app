import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const Step3 = ({ formData, setFormData, vehicleTypes, errors }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, vehicleTypeId: e.target.value, vehicleId: "" });
  };

  return (
    <FormControl component="fieldset" error={Boolean(errors.vehicleTypeId)}>
      <FormLabel component="legend">Select Vehicle Type</FormLabel>
      <RadioGroup value={formData.vehicleTypeId} onChange={handleChange}>
        {vehicleTypes.map((type) => (
          <FormControlLabel
            key={type.id}
            value={String(type.id)}
            control={<Radio />}
            label={type.name}
          />
        ))}
      </RadioGroup>
      {errors.vehicleTypeId && (
        <FormHelperText>{errors.vehicleTypeId}</FormHelperText>
      )}
    </FormControl>
  );
};

export default Step3;
