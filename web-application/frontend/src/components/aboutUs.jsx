import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";

const AboutUs = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
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
      {/* Text Section */}
      <Box flex="2" sx={{ width: "100%" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "#333" }}
        >
          Message From The CEO
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#555", lineHeight: "1.8", mb: 3 }}
        >
          Welcome to Mihawk,
          <br />
          <br />
          Your trusted partner in cutting-edge drone surveillance and monitoring solutions.
           I'm ABC, the CEO of Mihawk, and I’m thrilled to share our mission and vision with you.
          <br />
          <br />
          At Mihawk, we revolutionize surveillance by harnessing the power of advanced drone technology. Whether it's safeguarding critical infrastructure, monitoring vast landscapes, or ensuring public safety, our state-of-the-art drone systems are designed to deliver precision, efficiency, and reliability.
          <br />
          <br />
          Our team of innovators and experts specialize in cutting-edge technologies, including AI-driven analytics, real-time data processing, and autonomous navigation systems. Together, we provide comprehensive surveillance solutions tailored to meet the unique challenges of industries like defense, agriculture, disaster management, and urban security.
          <br />
          <br />
          Integrity and transparency are the cornerstones of our culture. We
          earn your trust by delivering excellence and practicing open
          communication. Moreover, we actively support social causes and
          embrace sustainable practices to make a positive impact on our world.
          <br />
          <br />
          Let's shape the future together through technology. Choose InvoZone
          for exceptional results and leverage our resource augmentation or
          remote teams of software developers.
          <br />
          <br />
          Join us on this exciting journey, and let's make a difference
          together.
        </Typography>
      </Box>

      {/* CEO Section */}
      <Box
        flex="1"
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#f5f8ff",
          borderRadius: "8px",
          p: 3,
        }}
      >
        <Avatar
          alt="CEO"
          src="https://via.placeholder.com/150"
          sx={{
            width: "120px",
            height: "120px",
            margin: "0 auto",
            border: "4px solid #fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          mt={2}
          mb={1}
          sx={{ color: "#333" }}
        >
          ABC
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          CEO of Mihawk, Pakistan
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0e76a8",
              "&:hover": { backgroundColor: "#094a63" },
              color: "#fff",
            }}
          >
            LinkedIn
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#EA4335",
              "&:hover": { backgroundColor: "#a9311b" },
              color: "#fff",
            }}
          >
            Email
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
