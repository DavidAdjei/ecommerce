import React from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductCard from '../../../component/ProductCard';

function FeaturedProducts() {
  const {featuredProducts} = useSelector((state) => state.product);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" mb={4}>Featured Products</Typography>
      <Grid2 sx={{
          display: "flex",
          gap: "1.4rem",
          pb: '1rem',
          paddingInline: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }} spacing={2}>
        {featuredProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </Grid2>
    </Box>
  );
}

export default FeaturedProducts;
