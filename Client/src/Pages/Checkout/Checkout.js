import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Grid2, 
    Paper, 
    Divider 
} from '@mui/material';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from "../../features/Loader";
import './checkout.css'
import { setFeedback } from '../../redux/Actions/productActions';
import { placeOrder } from '../../redux/Actions/cartActions';
import Address from '../../component/UserDashboard/Address';
import { addAddress } from '../../redux/Actions/authActions';


const CheckoutPage = ({setFeedback, user, cart, placeOrder, addAddress}) => {
    const [loading, setLoading] = useState(false)
  // User address state
    const [formData, setFormData] = useState({
        address: {
            city: user.address?.city || "",
            region: user.address?.region || "",
            street: user.address?.street || "",
            houseNumber: user.address?.houseNumber || "",
            ghanaPost: user.address?.ghanaPost || "",
      }
  });  
    const submitOrder = () => {
        setLoading(true);
        if (!user.address) {
            setFeedback({ error: "Add an address" });
            setLoading(false);
        } else {
            placeOrder(user._id, cart).then((res) => {
                setLoading(false);
                window.location.href = res?.data?.authorization_url;
            }).catch(err => { setFeedback({ error: err });  setLoading(false);});
        } 
    }

    const handleAddAddress = (e) => {
        setLoading(true);
        e.preventDefault();
        addAddress(formData.address, user._id)
            .then(res => setFeedback(res))
            .catch(error => setFeedback({ error }))
            .finally(() => setLoading(false));
  };

  // Delivery information logic
    const deliveryMessage = () => {
        if (!user.address) {
            return "Add an address first"
        } else if (user.address.region === 'Greater Accra Region') {
            return 'Orders within Greater Accra will be delivered by the end of every week.'
        } else {
            return 'Orders outside Greater Accra will be delivered by the end of every month.'
        }
    };

  return (
      <Box display="flex" justifyContent="center" sx={{ padding: '2rem', width: "100%" }}>
          {loading && <Loader/>}
          <Box display="flex" flexDirection="column" sx={{width: "40rem"}}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>  
            <Paper sx={{ padding: '1rem', marginBottom: '2rem' }}>
                <Typography variant="h6">Your Order</Typography>
                <Divider sx={{ marginY: '1rem' }} />
                {Object.values(cart).map((item)  => (
                  <Grid2 display="flex" justifyContent="space-between" container key={item.product._id} sx={{ marginBottom: '1rem' }}>
                      <Grid2 item xs={6}>
                        <Typography>{item.product.title}</Typography>
                      </Grid2>
                      <Grid2 item xs={6}>
                        <Typography align="right">Quantity: {item.quantity} | Price: GH&#8373; {item.product.price}</Typography>
                      </Grid2>
                  </Grid2>
                ))}
                <Divider sx={{ marginY: '1rem' }} />
                <Typography variant="body1" align="right">
                    Total: GH&#8373; {Object.values(cart).reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
                </Typography>
            </Paper>
            <Paper sx={{ padding: '1rem', marginBottom: '2rem' }}>
                <Typography variant="h6">Shipping Address</Typography>
                <Divider sx={{ marginY: '1rem' }} />
                {user.address ? (
                      <Box>
                          <Typography>House Number {formData.address.houseNumber}</Typography>
                          <Typography>{formData.address.street}</Typography>
                          <Typography>{formData.address.city}</Typography>
                          <Typography>{formData.address.region}</Typography>
                          <Typography>{formData.address.ghanaPost}</Typography>
                      </Box>
                ) : (
                    <Box display={`flex`} flexDirection={`column`} gap={2}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                        No address provided. Please add an address.
                        </Typography>
                        <Address setFormData={setFormData} formData={formData} page={`checkout`}/>
                        <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleAddAddress}
                        >
                        Add Address
                        </Button>
                    </Box>
                )}
              </Paper>
              <Paper sx={{ padding: '1rem', marginBottom: '2rem' }}>
                <Typography variant="h6">Delivery Information</Typography>
                <Divider sx={{ marginY: '1rem' }} />
                <Typography variant="body1">{deliveryMessage()}</Typography>
              </Paper>
              <Button
                className="checkout_button"
                variant="contained"
                color="success"
                onClick={submitOrder}
              >
                  Checkout
              </Button>
          </Box>
    </Box>
  );
};

CheckoutPage.propTypes = {
    cart: PropTypes.object.isRequired,
    setFeedback: PropTypes.func,
    addAddress: PropTypes.func,
    placeOrder: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    cart: state.cart.cart,
    user: state.auth.user
})


export default connect(mapStateToProps, {setFeedback, placeOrder, addAddress})(CheckoutPage)