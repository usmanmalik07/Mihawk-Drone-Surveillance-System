import React from "react";
import ReactPlayer from "react-player";
 // For video player
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  VideoCameraFront,
  Timeline,
  Storage,
  Security,
  Notifications,
} from "@mui/icons-material";
import "../styles/dashboard.css";

const Dashboard = () => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1e293b", // Sidebar background color
            color: "#fff",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            padding: "16px",
            textAlign: "center",
            borderBottom: "1px solid #444",
            backgroundColor: "#0f172a",
          }}
        >
          Mihawk Surveillance
        </Typography>
        <List>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#334155" } }}>
            <ListItemIcon sx={{ color: "#38bdf8" }}>
              <VideoCameraFront />
            </ListItemIcon>
            <ListItemText primary="Live Feed" />
          </ListItem>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#334155" } }}>
            <ListItemIcon sx={{ color: "#38bdf8" }}>
              <Storage />
            </ListItemIcon>
            <ListItemText primary="Recorded Videos" />
          </ListItem>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#334155" } }}>
            <ListItemIcon sx={{ color: "#38bdf8" }}>
              <Timeline />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#334155" } }}>
            <ListItemIcon sx={{ color: "#38bdf8" }}>
              <Security />
            </ListItemIcon>
            <ListItemText primary="System Status" />
          </ListItem>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#334155" } }}>
            <ListItemIcon sx={{ color: "#38bdf8" }}>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Alerts" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          sx={{ marginBottom: "16px", fontWeight: "bold", color: "#1e293b" }}
        >
          Surveillance Dashboard
        </Typography>

        {/* Video Player */}
        <Box
          sx={{
            width: "100%",
            height: "500px",
            backgroundColor: "#000",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "24px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U" // Sample video
            controls
            width="100%"
            height="100%"
          />
        </Box>

        {/* Widgets Section */}
        <Box sx={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
          {/* Widget 1 */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
              System Status
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              All systems are operational.
            </Typography>
          </Box>

          {/* Widget 2 */}
          <Box
            sx={{
              flex: 1,
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
              Alerts
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              No alerts at the moment.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
