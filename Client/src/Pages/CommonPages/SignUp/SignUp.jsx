import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Box, Grid } from '@mui/material';
import logo from '../../../assets/images/13654036.png';
import SignUpForm from '../../../component/SignUp/SignUpForm';
import SignUpFormStep2 from '../../../component/SignUp/SignUpFormStep2';
import { Navigate, useSearchParams } from "react-router-dom";
import { setLoading } from '../../../redux/Actions/authActions';

const SignUp = ({ setLoading }) => {
    const [step, setStep] = useState(1);
    const [searchParams] = useSearchParams();
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState("buyer");

    useEffect(() => {
        setLoading(true);
        const paramStep = searchParams.get("step");
        const paramRole = searchParams.get("role");

        if (paramStep && paramRole) {
            setStep(parseInt(paramStep));
            setUserRole(paramRole);
        }

        setLoading(false);
    }, [searchParams, setLoading]);

    return (
        <Box 
            sx={{ 
                width: '100%', 
                minHeight: "100%",
                height: {md: '100vh', xs: 'auto'}, 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                background: 'linear-gradient(to bottom, #5732D8, #B6E7FF)' 
            }}
        >
            <Banner />
            <Box 
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flex: 1,
                    p: 2,
                    width: { xs: '100%', md: '50%' },
                }}
            >
                {step === 1 ? (
                    <SignUpForm 
                        userData={userData} 
                        setUserData={setUserData} 
                        step={step} 
                        setStep={setStep} 
                        setUserRole={setUserRole} 
                    />
                ) : (
                    userRole === 'seller' ? (
                        <SignUpFormStep2 
                            userData={userData} 
                            setUserData={setUserData} 
                            step={step} 
                            role={userRole} 
                        />
                    ) : <Navigate to='/login'/>
                )}
            </Box>
        </Box>
    );
};

const Banner = () => (
    <Box
        sx={{
            position: 'relative',
            height: { xs: '40vh', md: '100%' },
            color: 'white',
            display: {md: 'flex', xs: "none"},
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 2,
            width: { xs: '100%', md: '50%' },
        }}
    >
        <Typography 
            variant="h4" 
            sx={{ 
                fontWeight: 'bold', 
                mb: 2, 
                fontSize: { xs: '1.5rem', md: '2.5rem' } 
            }}
        >
            Get all your buying problems solved today
        </Typography>
        <Typography 
            variant="h6" 
            sx={{ 
                mb: 4, 
                fontSize: { xs: '1rem', md: '1.5rem' } 
            }}
        >
            Join [Your Website Name] and get connected to different suppliers across the globe
        </Typography>
        <Box 
            sx={{ 
                maxWidth: { xs: '80%', md: '100%' }, 
                height: { xs: '10rem', md: '20rem' } 
            }}
        >
            <img src={logo} alt="Banner" style={{ maxWidth: '100%', height: '100%' }} />
        </Box>
    </Box>
);

SignUp.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps, { setLoading })(SignUp);
