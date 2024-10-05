import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid2,
} from "@mui/material";
import { Delete, ShoppingCart } from "@mui/icons-material";
import { connect } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
} from "../../redux/Actions/authActions";
import { addToCart } from "../../redux/Actions/cartActions";
import { setFeedback } from "../../redux/Actions/productActions";
import Loader from "../../features/Loader";

const WishlistContent = ({
  user,
  wishList,
  getWishlist,
  removeFromWishlist,
  addToCart,
  setFeedback,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getWishlist(user._id)
      .catch((error) => setFeedback(error))
      .finally(() => setLoading(false));
  }, [getWishlist, user, setFeedback]);

  const handleRemove = (productId) => {
    removeFromWishlist(user._id, productId)
      .then((res) => setFeedback(res))
      .catch((error) => setFeedback({ error }));
  };

  const moveToCart = (product) => {
    addToCart(product);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {wishList?.length < 1 || !wishList ? (
        <Typography>Your wishlist is empty!</Typography>
      ) : (
        <Grid2 container spacing={3}>
          {wishList.map((item) => (
            <Grid2
              className="wishlist_item"
              item="true"
              xs={12}
              sm={6}
              md={4}
              key={item.id}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imgs[0]}
                  alt={item.title}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: GH&#8373;{item.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={() => handleRemove(item._id)}
                    sx={{ marginRight: 1, marginTop: 1 }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCart />}
                    onClick={() => moveToCart(item)}
                    sx={{ marginTop: 1 }}
                  >
                    Move to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
      {loading && <Loader />}
    </Box>
  );
};

WishlistContent.propTypes = {
  getWishlist: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
  setFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wishList: state.auth.wishList,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getWishlist,
  removeFromWishlist,
  addToCart,
  setFeedback,
})(WishlistContent);
