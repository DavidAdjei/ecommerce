import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, List, ListItem, ListItemText, Drawer, AppBar, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOrders, logout } from '../../../redux/Actions/authActions';
import SellerProducts from '../../../component/SellerDashboard/SellerProducts';
import AddProductForm from '../../../component/SellerDashboard/AddProductForm';
import ProfileContent from '../../../component/UserDashboard/ProfileContent';

const menuItems = [
  { id: 1, label: "Profile" },
  { id: 2, label: "My Products" },
  { id: 3, label: "Add Products" }
];

const Dashboard = ({ getOrders, user, logout }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const option = searchParams.get("option") || "Profile";

  const renderContent = () => {
    switch (option) {
      case "Profile" : return <ProfileContent/>;
      case "My Products": return <SellerProducts />;
      case "Add Products": return <AddProductForm />;
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
                onClick={() => navigate(`/dashboard?option=${item.label}`)}
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

Dashboard.propTypes = {
  getOrders: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

Dashboard.defaultProps = {
  user: {}
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { getOrders, logout })(Dashboard);
