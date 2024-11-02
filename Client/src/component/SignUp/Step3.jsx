import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Container, Grid2 } from '@mui/material';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFeedback } from '../../redux/Actions/productActions';
import { setLoading, signUp } from '../../redux/Actions/authActions';

function Step3({ setUserData, signUp, setFeedback, userData, step, role, user, setLoading }) {
    const [payment, setPayment] = useState({
        provider: '',
        accountNumber: '',
        expiryDate: '',
        billingAddress: {
            city: '',
            region: '',
            street: '',
            houseNumber: '',
            ghanaPost: ''
        }
    });

    useEffect(()=> {
        user && setUserData({...userData, user});
    },[setUserData, user, userData])

    const handleChange = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setPayment({
            ...payment,
            billingAddress: { ...payment.billingAddress, [e.target.name]: e.target.value }
        });
    };

    const handleSubmit = () => {
        setLoading(true);
        signUp(step, role, {...userData, paymentInfo: payment})
            .then(() => {
                setFeedback({ message: "Registration successful! Redirecting to login" });
                window.location.href = "/login";
            })
            .catch((err) => {
                setFeedback({ error: err });
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                {role === "seller" && (
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Payment Details
                    </Typography>
                )}
                <Grid2 container spacing={2}>
                    {
                        role === "seller" && (
                            <>
                                <Grid2 item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Provider"
                                        name="provider"
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid2>
                                <Grid2 item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Account Number"
                                        name="accountNumber"
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid2>
                                <Grid2 item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Expiry Date"
                                        name="expiryDate"
                                        type="date"
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid2>
                            </>
                        )
                    }
                    <Grid2 item xs={12} sm={12}>
                        <Typography variant="h6">Billing Address</Typography>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            onChange={handleAddressChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Region"
                            name="region"
                            onChange={handleAddressChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Street"
                            name="street"
                            onChange={handleAddressChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="House Number"
                            name="houseNumber"
                            onChange={handleAddressChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Ghana Post Code"
                            name="ghanaPost"
                            onChange={handleAddressChange}
                            variant="outlined"
                        />
                    </Grid2>
                </Grid2>
                <Box mt={3} textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Complete Registration
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

Step3.propTypes = {
    setFeedback: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})


export default connect(mapStateToProps, {setFeedback, signUp, setLoading})(Step3)