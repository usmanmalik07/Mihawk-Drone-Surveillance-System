import React from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";

const contactUs = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="flex-start"
      p={4}
      border="1px solid #ddd"
      borderRadius="8px"
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
      sx={{
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#fff",
        gap: 3,
      }}
    >
      {/* Form Section */}
      <Box flex="1" mr={2} sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{ color: "#333" }}
        >
          Your Vision, Our Expertise
        </Typography>
        <Typography variant="body1" mb={3} sx={{ color: "#555" }}>
          Submit your information to drive success forward.
        </Typography>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <RadioGroup row aria-label="type" name="type">
            <FormControlLabel
              value="staff_augmentation"
              control={<Radio sx={{ color: "#3f51b5" }} />}
              label="Staff Augmentation"
              sx={{ color: "#555" }}
            />
            <FormControlLabel
              value="dedicated_teams"
              control={<Radio sx={{ color: "#3f51b5" }} />}
              label="Dedicated Teams"
              sx={{ color: "#555" }}
            />
            <FormControlLabel
              value="fixed_gigs"
              control={<Radio sx={{ color: "#3f51b5" }} />}
              label="Fixed Gigs"
              sx={{ color: "#555" }}
            />
          </RadioGroup>
        </FormControl>
        <Box component="form" autoComplete="off">
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: "#f9f9f9" }}
          />
          <TextField
            fullWidth
            label="Contact Number"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: "#f9f9f9" }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: "#f9f9f9" }}
          />
          <TextField
            fullWidth
            label="Enter your preferred tech stack"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: "#f9f9f9" }}
          />
          <TextField
            fullWidth
            label="Tell us how we can help"
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2, backgroundColor: "#f9f9f9" }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "#3f51b5" }} />}
            label="Get NDA"
            sx={{ mb: 1, color: "#555" }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "#3f51b5" }} />}
            label="I understand and agree to the terms & conditions."
            sx={{ mb: 2, color: "#555" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "10px",
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#303f9f" },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>

      {/* Info Section */}
      <Box
        flex="1"
        p={2}
        borderLeft="1px solid #ddd"
        sx={{
          width: "100%",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          height: "auto",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: "#333" }}>
          Mihawk, In a Nutshell
        </Typography>
        <Typography variant="body1" mb={1} sx={{ color: "#555" }}>
          <strong>Top Talent Pool</strong>: We have a well-established
          community of 500+ field-experienced software developers.
        </Typography>
        <Typography variant="body1" mb={1} sx={{ color: "#555" }}>
          <strong>Quick Response</strong>: Our team will share CVs within 48
          hours.
        </Typography>
        <Typography variant="body1" mb={1} sx={{ color: "#555" }}>
          <strong>Wallet-friendly Pricing</strong>: Our well-engineered hiring
          practices eliminate additional costs by 50%.
        </Typography>
        <Box mt={2} sx={{ textAlign: "center" }}>
          <img
            src="../assets/cam.gif"
            alt="Certifications"
            style={{ maxWidth: "80%", borderRadius: "4px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default contactUs;
