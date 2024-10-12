import React from 'react';
import { Container, Typography, Box, Grid2, List, ListItem, ListItemText, Button } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" component="p" color="textSecondary">
          Welcome to <strong>Best Price Enterprise</strong>, where we bring you the latest and greatest in Mobile Phones, Laptops, Books, Furnitures and any m more.
        </Typography>
      </Box>

      <Grid2 container spacing={4}>
        {/* Mission Section */}
        <Grid2 item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At <strong>Best Price Enterprise</strong>, our mission is simple: <strong>to deliver top-tier products with unmatched convenience.</strong> 
            We believe shopping should be an enjoyable, hassle-free experience where customers can easily find what they need at prices that suit their budget.
          </Typography>
        </Grid2>

        {/* What We Offer Section */}
        <Grid2 item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            What We Offer
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Mobile Phones" secondary="From iPhones to Andriod phones, we have everything you need to stay on top of the trends." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Laptops" secondary="Whether you’re looking for gaming laptop, school laptop or a laptop for personal use, we.ve got you covered." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Books" secondary="Our selection of novels of different genres, offer something for every taste and style." />
            </ListItem>
          </List>
        </Grid2>
      </Grid2>

      {/* Values Section */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Customer-Centric Approach:</strong> We put our customers first, continuously improving our platform and services based on your feedback and evolving needs.
          <br />
          <strong>Quality Assurance:</strong> We’re committed to maintaining the highest standards of quality, ensuring that every product in our store meets strict guidelines before it reaches your doorstep.
          <br />
          <strong>Innovation:</strong> We constantly evolve to stay ahead of the trends, integrating cutting-edge technology to make your shopping experience smooth and enjoyable.
          <br />
          <strong>Sustainability:</strong> We prioritize sustainable sourcing practices, minimal packaging waste, and energy-efficient processes to reduce our footprint.
        </Typography>
      </Box>

      {/* Our Promise Section */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Promise
        </Typography>
        <Typography variant="body1" paragraph>
          We promise to deliver <strong>safe, secure, and reliable shopping experiences.</strong> Our website uses the latest encryption technologies, and we partner with globally recognized payment gateways.
        </Typography>
      </Box>

      {/* Why Shop With Us Section */}
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Shop With Us?
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Fast Shipping" secondary="Enjoy speedy delivery with real-time tracking on all orders." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Easy Returns" secondary="Hassle-free returns if you're not 100% satisfied with your purchase." />
          </ListItem>
          <ListItem>
            <ListItemText primary="24/7 Customer Support" secondary="Our friendly customer service team is available round the clock to assist you." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Diverse Payment Options" secondary="We support multiple payment methods, including Paystack and PayPal." />
          </ListItem>
        </List>
      </Box>

      {/* Join Our Community Section */}
      <Box sx={{ textAlign: 'center', my: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body1" paragraph>
          When you shop at <strong>Best Price Enterprise</strong>, you're not just making a purchase — you're becoming part of a community. 
          Follow us on social media and subscribe to our newsletter for the latest updates.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Subscribe to Newsletter
        </Button>
      </Box>
    </Container>
  );
};

export default About;