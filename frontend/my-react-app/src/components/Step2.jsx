import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const Step2 = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      wheels: e.target.value,
      vehicleTypeId: "",
      vehicleId: "",
    });
  };

  return (
    <FormControl component="fieldset" error={Boolean(errors.wheels)}>
      <FormLabel component="legend">Number of Wheels</FormLabel>
      <RadioGroup value={formData.wheels} onChange={handleChange} row>
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
      </RadioGroup>
      {errors.wheels && <FormHelperText>{errors.wheels}</FormHelperText>}
    </FormControl>
  );
};

export default Step2;
