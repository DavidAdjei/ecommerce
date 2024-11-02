import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Grid2 } from '@mui/material';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFeedback } from '../../redux/Actions/productActions';
import { setLoading, signUp } from '../../redux/Actions/authActions';

function Step2({ role, setUserData, nextStep, setFeedback, signUp, step, setLoading }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setLoading(true);
        setUserData(form);
        if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
            setFeedback({error: 'Please fill in all fields'});
            setLoading(false);
            return;
        } else {
            if (form.password!== form.confirmPassword) {
                setFeedback({error: 'Passwords do not match'});
                setLoading(false);
                return;
            }
            signUp(step, role, form)
            .then((res) =>{
                    setUserData(res.user);
                    nextStep();
                }
            ).catch(err=>{ 
                setFeedback({ error: err });  
            }).finally(()=> setLoading(false));
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Basic Information
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid2>
                </Grid2>
                <Box mt={3} textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Next
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

Step2.propTypes = {
    setFeedback: PropTypes.func.isRequired,
    signUp: PropTypes.func,
    role: PropTypes.string.isRequired,
    setUserData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {setFeedback, signUp, setLoading})(Step2)