import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BrandLogos() {
  const brandLogos = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', alt: 'Apple', dealsIn: 'Mobiles'},
    { src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg', alt: 'Samsung', dealsIn: 'Mobiles'},
    { src: 'https://gizchina.it/wp-content/uploads/2020/01/Xiaomi-redmi-logo.jpg', alt: 'Redmi', dealsIn: 'Mobiles'},
    { src: 'https://th.bing.com/th/id/OIP.1iPNTfjfh0vl8ksxYH4mOQHaHa?rs=1&pid=ImgDetMain', alt: 'HP', dealsIn: 'Laptops'},
    { src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg', alt: 'Dell', dealsIn: 'Laptops'},
  ];

  const navigate = useNavigate();

  const handleNavigation = ( dealsIn ,name) => {
    const category = dealsIn;
    const filters = {
      Brand: {
        [name]: true,
      },
    };
    const params = new URLSearchParams();
    params.set("category", category);
    params.set("filters", JSON.stringify(filters));
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography gutterBottom variant='h4' textAlign='center'>
        Top Brands
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {brandLogos.map((brand, index) => (
          <Grid item key={index}>
            <Box
              component="img"
              src={brand.src}
              alt={brand.alt}
              sx={{
                width: '100px',
                height: '100px',
                bgcolor: 'white',
                borderRadius: '50%',
                padding: '8px',
                objectFit: 'contain',
                cursor: 'pointer'
              }}
              onClick={() => handleNavigation(brand.dealsIn, brand.alt)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BrandLogos;
