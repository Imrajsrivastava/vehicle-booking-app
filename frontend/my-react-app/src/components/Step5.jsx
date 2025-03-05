import React from "react";
import { TextField, Grid } from "@mui/material";

const Step5 = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.startDate)}
          helperText={errors.startDate}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.endDate)}
          helperText={errors.endDate}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Step5;
