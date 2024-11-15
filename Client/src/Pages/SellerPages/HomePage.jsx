import React from "react";
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './home.css';
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  
  return (
    <Box className="seller-hero-section">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome Back, {user.firstName}!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manage your products, view sales stats, and grow your business with ease.
      </Typography>
      
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/add-product')}
          >
            Add New Product
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/my-products')}
          >
            View My Products
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default HomePage;