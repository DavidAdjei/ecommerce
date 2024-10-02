import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Typography, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import Loader from "../../features/Loader";
import './checkout.css'
import { setFeedback } from '../../redux/Actions/productActions';
import { placeOrder } from '../../redux/Actions/cartActions';

const CheckoutPage = ({ setFeedback, user, cart, placeOrder }) => {
    const [loading, setLoading] = useState(false);
    const calculateTotal = () => {
        return Object.values(cart).reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    };
    const submitOrder = () => {
        setLoading(true);
        placeOrder(user._id, cart).then((res) => {
            setLoading(false);
            window.location.href = res?.data?.authorization_url;
        }).catch(err => { setFeedback({ error: err });  setLoading(false);});
    }

    const handleAddAddress = () => {
        alert('A add address modal will appear');
    };

    return (
        <Box className="checkout" sx={{ p: 3 }}>
            {loading && <Loader/>}
        <Paper className="checkout_summary" elevation={3}>
            <Typography variant="h5">
            Order Summary
            </Typography>
            <List>
            {Object.values(cart).map((item) => (
                <ListItem key={item.product._id}>
                    <ListItemText
                        primary={item.product.title}
                        secondary={`Quantity: ${item.quantity} | Price: GH₵ ${item.product.price}`}
                    />
                </ListItem>
            ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>
            Total: GH&#8373; {calculateTotal()}
            </Typography>
        </Paper>
        <Paper className="checkout_address" elevation={3}>
            <Typography variant="h5" gutterBottom>
                Shipping Address
            </Typography>
            {user.address ? (
                <Typography>{user.address}</Typography>
                ) : (
                <Button variant="contained" color="primary" onClick={handleAddAddress}>
                    Add Address
                </Button>
            )}
        </Paper>
        <Button
            className="checkout_button"
            variant="contained"
            color="primary"
            onClick={submitOrder}
        >
            Checkout
        </Button>
        </Box>
    );
};

CheckoutPage.propTypes = {
    cart: PropTypes.object.isRequired,
    setFeedback: PropTypes.func,
    placeOrder: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart,
    user: state.auth.user
})


export default connect(mapStateToProps, {setFeedback, placeOrder})(CheckoutPage)