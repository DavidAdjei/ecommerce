import PropTypes from 'prop-types'
 import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { connect } from 'react-redux';
const image1 = require("../../assets/images/iPhone-15-release-date-expectations-your-guide-to-potential-specs-features-and-pricing.jpg");
const image2 = require("../../assets/images/PlayStation-5.jpg");
const image3 = require("../../assets/images/iPhone-15-release-date-expectations-your-guide-to-potential-specs-features-and-pricing.jpg");

const WishlistContent = () => {

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Product 1', price: 100, image: image1 },
    { id: 2, name: 'Product 2', price: 200, image: image2 },
    { id: 3, name: 'Product 3', price: 300, image: image3 },
  ]);

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const moveToCart = (productId) => {
    removeFromWishlist(productId);
    alert(`Moved product ${productId} to cart`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {wishlist.length === 0 ? (
        <Typography>Your wishlist is empty!</Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlist.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Price: ${item.price}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={() => removeFromWishlist(item.id)}
                    sx={{ marginRight: 1, marginTop: 1 }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCart />}
                    onClick={() => moveToCart(item.id)}
                    sx={{ marginTop: 1 }}
                  >
                    Move to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

WishlistContent.propTypes = {
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, {})(WishlistContent)