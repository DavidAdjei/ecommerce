import React from 'react';
import { Box, Button, Typography, Container, Grid2 } from '@mui/material';

function Step1({ setRole, nextStep }) {
    const handleRoleSelection = (role) => {
        setRole(role);
        nextStep(); 
    };

    return (
        <Container maxWidth="xs">
            <Box textAlign="center" mt={5}>
                <Typography variant="h5" gutterBottom>
                    Sign Up as
                </Typography>
                <Grid2 container spacing={2} justifyContent="center">
                    <Grid2 item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleRoleSelection("buyer")}
                        >
                            Buyer
                        </Button>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={() => handleRoleSelection("seller")}
                        >
                            Seller
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
}

export default Step1;
