import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Grid2 } from '@mui/material'; // Updated import for Grid2
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFeedback } from '../../redux/Actions/productActions';
import { setLoading, signUp } from '../../redux/Actions/authActions';

const SignUpFormStep2 = ({ signUp, setUserData, user, userData, step, role }) => {
    const [formData, setFormData] = useState({
        provider: '',
        accountNumber: '',
        expiryDate: '',
        billingAddress: {
            city: '',
            region: '',
            street: '',
            houseNumber: '',
            ghanaPost: ''
        },
    });

    useEffect(() => {
        user && setUserData({ ...userData, user });
    }, [setUserData, user, userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setFormData({ ...formData, billingAddress: { ...formData.billingAddress, [e.target.name]: e.target.value } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        signUp(step, role, { ...userData, paymentInfo: formData })
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
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Complete Supplier Signup</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Provider"
                                name="provider"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.provider}
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Account Number"
                                name="accountNumber"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.accountNumber}
                                onChange={handleChange}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={2}>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Expiry Date"
                                name="expiryDate"
                                variant="outlined"
                                margin="normal"
                                value={formData.expiryDate}
                                onChange={handleChange}
                            />
                        </Grid2>
                    </Grid2>
                    <Typography variant="h6" sx={{ mt: 2 }}>Billing Address</Typography>
                    <Grid2 container spacing={2} sm={12}>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.billingAddress.city}
                                onChange={handleAddressChange}
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Region"
                                name="region"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.billingAddress.region}
                                onChange={handleAddressChange}
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="street"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.billingAddress.street}
                                onChange={handleAddressChange}
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="House Number"
                                name="houseNumber"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.billingAddress.houseNumber}
                                onChange={handleAddressChange}
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ghana Post Code"
                                name="ghanaPost"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.billingAddress.ghanaPost}
                                onChange={handleAddressChange}
                            />
                        </Grid2>
                    </Grid2>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Finish Registration
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

SignUpFormStep2.propTypes = {
    setFeedback: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { setFeedback, signUp, setLoading })(SignUpFormStep2);
