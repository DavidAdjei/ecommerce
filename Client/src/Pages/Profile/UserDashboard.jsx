import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.css';
import { Box, List, ListItem, ListItemText, Drawer, AppBar, Typography } from '@mui/material';
import ProfileContent from '../../component/UserDashboard/ProfileContent';
import OrdersContent from '../../component/UserDashboard/OrdersContent';
import WishlistContent from '../../component/UserDashboard/WishlistContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrders, logout } from '../../redux/Actions/authActions';

const menuItems = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Orders" },
  { id: 3, label: "Wishlist" }
];

const UserDashboard = ({ getOrders, user, logout }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const option = searchParams.get("option") || "Profile";

  useEffect(() => {
    getOrders(user._id).catch(() => {
      alert('Failed to fetch orders.');
    });
  }, [getOrders, user]);

  const renderContent = () => {
    switch (option) {
      case "Profile": return <ProfileContent />;
      case "Orders": return <OrdersContent />;
      case "Wishlist": return <WishlistContent />;
      default: return <ProfileContent />;
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const content = useMemo(() => renderContent(), [option]);

  return (
    <Box className="user_dashboard" sx={{ display: "flex" }}>
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
                sx={{ backgroundColor: option === item.label ? 'lightgray' : 'transparent' }}
                button = "true"
                key={item.id}
                onClick={() => navigate(`/profile?option=${item.label}`)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button="true" onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box className="dashboard_main" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, p: "1rem" }}>
          <Typography variant="h6" noWrap>
            {option}
          </Typography>
        </AppBar>
        {content}
      </Box>
    </Box>
  );
};

UserDashboard.propTypes = {
  getOrders: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

UserDashboard.defaultProps = {
  user: {}
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { getOrders, logout })(UserDashboard);
