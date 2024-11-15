import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function HeroSection() {
  return (
    <Box
        className="hero-section" 
      sx={{ 
        height: '50vh', 
        backgroundImage: 'url(../../assets/images/hero.png)', 
        backgroundSize: 'cover', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Box>
        <Typography variant="h3" fontWeight="bold">Raining Offers For Hot Summer!</Typography>
        <Typography variant="h6">25% Off On All Products</Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary">Shop Now</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
