import React from "react";
import "./Profile.css";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  AppBar,
  Typography,
} from "@mui/material";
import ProfileContent from "../../component/UserDashboard/ProfileContent";
import OrdersContent from "../../component/UserDashboard/OrdersContent";
import WishlistContent from "../../component/UserDashboard/WishlistContent";
import SettingsContent from "../../component/UserDashboard/SettingsContent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
<IoCartOutline size={30} />;

const menuItems = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Orders" },
  { id: 3, label: "Wishlist" },
  { id: 4, label: "Settings" },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const option = searchParams.get("option") || "Profile";

  const renderContent = () => {
    switch (option) {
      case "Profile":
        return <ProfileContent />;
      case "Orders":
        return <OrdersContent />;
      case "Wishlist":
        return <WishlistContent />;
      case "Settings":
        return <SettingsContent />;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <Box className="user_dashboard" sx={{ display: "flex" }}>
      {/* Sidebar Menu */}
      <Drawer
        className="dashboard_menu"
        variant="permanent"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            position: "relative",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                className={option === item.label ? "active_page" : ""}
                button
                key={item.id}
                onClick={() => navigate(`/profile?option=${item.label}`)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        className="dashboard_main"
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <AppBar
          position="relative"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, p: "1rem" }}
        >
          <Typography variant="h6" noWrap>
            {option}
          </Typography>
        </AppBar>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default UserDashboard;
