import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container, FormLabel, RadioGroup, FormControlLabel, Paper, Radio, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFeedback } from '../../redux/Actions/productActions';
import { setLoading, signUp } from '../../redux/Actions/authActions';

const SignUpForm = ({ setStep, setUserRole, step, setUserData, signUp }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'buyer'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUserTypeChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
        setUserRole(e.target.value);
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.firstName) tempErrors.firstName = "First Name is required";
        if (!formData.lastName) tempErrors.lastName = "Last Name is required";
        if (!formData.email) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid";
        if (!formData.password) tempErrors.password = "Password is required";
        else if (formData.password.length < 6) tempErrors.password = "Password should be at least 6 characters";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setUserData(formData);
        if (formData.password !== formData.confirmPassword) {
            setFeedback({ error: "Passwords do not match" });
            setLoading(false);
            return;
        }
        if (validate()) {
            setUserRole(formData.role);
            signUp(step, formData.role, formData).then((res) => {
                setUserData(res.user);
                setStep(2);
            }).catch(err => {
                setFeedback({ error: err });
            }).finally(() => setLoading(false));
        }
    };

    return (
        <Container
            sx={{
                mt: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom, #5732D8, #B6E7FF)',
                py: 3,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: 'white',
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                variant="outlined"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                variant="outlined"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                variant="outlined"
                                required
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                variant="outlined"
                                required
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}
                            />
                        </Grid>
                    </Grid>
                    <FormLabel component="legend" sx={{ mt: 2, color: 'white' }}>I am a</FormLabel>
                    <RadioGroup
                        row
                        aria-label="role"
                        name="role"
                        value={formData.role}
                        onChange={handleUserTypeChange}
                        sx={{ mb: 2 }}
                    >
                        <FormControlLabel value="buyer" control={<Radio sx={{ color: 'white' }} />} label="Buyer" sx={{ color: 'white' }} />
                        <FormControlLabel value="seller" control={<Radio sx={{ color: 'white' }} />} label="Seller" sx={{ color: 'white' }} />
                    </RadioGroup>
                    <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#5732D8', mt: 2, color: 'white' }}>
                        SIGN UP
                    </Button>
                    <Divider sx={{ my: 3, '&::before, &::after': { borderColor: 'rgba(255, 255, 255, 0.3)' } }}>
                        Or
                    </Divider>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        sx={{ mt: 2, color: 'white', borderColor: 'white' }}
                        onClick={() => window.location.href = `${process.env.REACT_APP_GOOGLE_SIGNUP_URL}?role=${formData.role}`}
                    >
                        Continue with Google
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

SignUpForm.propTypes = {
    setFeedback: PropTypes.func.isRequired,
    signUp: PropTypes.func,
    role: PropTypes.string.isRequired,
    setUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setFeedback, signUp, setLoading })(SignUpForm);
