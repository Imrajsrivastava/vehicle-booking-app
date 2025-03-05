import React, { useState, useEffect } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import {
  Container,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import apiClient from "./api";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleTypeId: "",
    vehicleId: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (formData.wheels) {
      console.log("Selected wheels:", formData.wheels);
      apiClient
        .get(`/vehicle-types?wheels=${formData.wheels}`)
        .then((res) => {
          if (res.data.length === 0) {
            console.log("No vehicle types found for wheels:", formData.wheels);
          }
          setVehicleTypes(res.data);
        })
        .catch((err) => console.error("Error fetching vehicle types:", err));
    }
  }, [formData.wheels]);

  useEffect(() => {
    if (formData.vehicleTypeId) {
      apiClient
        .get(`/vehicles?vehicleTypeId=${formData.vehicleTypeId}`)
        .then((res) => {
          if (res.data.length === 0) {
            console.log(
              "No vehicles found for vehicleTypeId:",
              formData.vehicleTypeId
            );
          }
          setVehicles(res.data);
        })
        .catch((err) => console.error("Error fetching vehicles:", err));
    }
  }, [formData.vehicleTypeId]);

  // Validate current step fields.
  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
    } else if (step === 2) {
      if (!formData.wheels) newErrors.wheels = "Please select number of wheels";
    } else if (step === 3) {
      if (!formData.vehicleTypeId)
        newErrors.vehicleTypeId = "Please select a vehicle type";
    } else if (step === 4) {
      if (!formData.vehicleId)
        newErrors.vehicleId = "Please select a specific model";
    } else if (step === 5) {
      if (!formData.startDate)
        newErrors.startDate = "Please select a start date";
      if (!formData.endDate) newErrors.endDate = "Please select an end date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 5) {
      setErrors({});
      setStep(step + 1);
    } else {
      apiClient
        .post("/bookings", formData)
        .then((res) => {
          console.log("Submission successful:", res.data);
          setSnackbarOpen(true);
          setFormData({
            firstName: "",
            lastName: "",
            wheels: "",
            vehicleTypeId: "",
            vehicleId: "",
            startDate: "",
            endDate: "",
          });
          setErrors({});
          setStep(1);
        })
        .catch((err) => {
          const errorMsg = err.response?.data?.error || "Submission failed";
          setErrors({ submission: errorMsg });
        });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Paper style={{ padding: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Vehicle Booking Form
        </Typography>
        {step === 1 && (
          <Step1
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            setFormData={setFormData}
            vehicleTypes={vehicleTypes}
            errors={errors}
          />
        )}
        {step === 4 && (
          <Step4
            formData={formData}
            setFormData={setFormData}
            vehicles={vehicles}
            errors={errors}
          />
        )}
        {step === 5 && (
          <Step5
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}
        {errors.submission && (
          <Typography color="error" variant="body2">
            {errors.submission}
          </Typography>
        )}
        <Box
          mt={2}
          display="flex"
          justifyContent={step === 1 ? "flex-end" : "space-between"}
          width="100%"
        >
          {step > 1 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button variant="contained" color="primary" onClick={handleNext}>
            {step === 5 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Welcome! Your booking was successful.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
