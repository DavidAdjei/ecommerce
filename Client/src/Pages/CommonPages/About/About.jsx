import React from 'react';
import { Container, Typography, Box, Grid2, List, ListItem, ListItemText, Button, Card, CardMedia, CardContent } from '@mui/material';
import styles from './About.module.css';
import { Link } from 'react-router-dom';
import teamMember1 from '../../../assets/images/ai-generated-8575440_1280.png'; // Replace with actual image paths
import teamMember2 from '../../../assets/images/ai-generated-8577448_1280.png'; // Replace with actual image paths
import teamMember3 from '../../../assets/images/janis-dzenis-MgYs_oZcxho-unsplash.jpg'; // Replace with actual image paths

const About = () => {
  return ( 
    <Container maxWidth="lg" sx={{ py: 5 }} className={styles.aboutUs}> 
      <Box sx={{ textAlign: 'center', mb: 5 }}> 
        <Typography variant="h2" component="h1" gutterBottom> 
          About Us 
        </Typography> 
        <Typography variant="h6" component="p" color="textSecondary"> 
          Welcome to <strong>[Your Website Name]</strong>, where buyers and sellers connect, trade, and grow together. 
        </Typography> 
      </Box> 
      <Grid2 container spacing={4}> 
        {/* Mission Section */} 
        <Grid2 item xs={12} md={6}> 
          <Typography variant="h4" component="h2" gutterBottom className={styles.section}> 
            Our Mission 
          </Typography> 
          <Typography variant="body1"> 
            At <strong>[Your Website Name]</strong>, our mission is simple: <strong>to empower individuals and businesses by providing a platform that fosters entrepreneurship, innovation, and community.</strong> 
          </Typography> 
        </Grid2> 
        {/* What We Offer Section */} 
        <Grid2 item xs={12} md={6}> 
          <Typography variant="h4" component="h2" gutterBottom className={styles.section}> 
            Why Choose Us? 
          </Typography> 
          <List> 
            <ListItem> 
              <ListItemText 
                primary="User-Friendly Platform" 
                secondary="Our website is designed with you in mind, making it easy for both buyers and sellers to navigate, list products, and complete transactions." 
              /> 
            </ListItem> 
            <ListItem> 
              <ListItemText 
                primary="Diverse Marketplace" 
                secondary="From handmade crafts to the latest tech gadgets, our marketplace offers a wide range of products to suit every taste and need." 
              /> 
            </ListItem> 
            <ListItem> 
              <ListItemText 
                primary="Secure Transactions" 
                secondary="Your safety is our priority. We use advanced security measures to protect your personal information and ensure secure transactions." 
              /> 
            </ListItem> 
            <ListItem> 
              <ListItemText 
                primary="Community Support" 
                secondary="We believe in the power of community. Our support team is always here to help you with any questions or concerns, and our community forums provide a space for users to connect and share tips." 
              /> 
            </ListItem> 
          </List> 
        </Grid2> 
      </Grid2> 
      {/* Values Section */} 
      <Box sx={{ my: 5 }} className={styles.section}> 
        <Typography variant="h4" component="h2" gutterBottom> 
          Meet the Team 
        </Typography> 
        <Grid2 container spacing={4} className={styles.teamGrid}> 
          <Grid2 item xs={12} sm={6} md={4}> 
            <Card className={styles.teamCard}> 
              <CardMedia component="img" height="200" image={teamMember1} alt="Team Member 1" /> 
              <CardContent> 
                <Typography variant="h6">John Doe</Typography> 
                <Typography variant="body2" color="textSecondary">CEO & Founder</Typography> 
                <Typography variant="body2" color="textSecondary">john.doe@example.com</Typography> 
                <Typography variant="body2" color="textSecondary">+1 234 567 890</Typography> 
              </CardContent> 
            </Card> 
          </Grid2> 
          <Grid2 item xs={12} sm={6} md={4}> 
            <Card className={styles.teamCard}> 
              <CardMedia component="img" height="200" image={teamMember2} alt="Team Member 2" /> 
              <CardContent> 
                <Typography variant="h6">Jane Smith</Typography> 
                <Typography variant="body2" color="textSecondary">Chief Technology Officer</Typography> 
                <Typography variant="body2" color="textSecondary">jane.smith@example.com</Typography> 
                <Typography variant="body2" color="textSecondary">+1 234 567 891</Typography> 
              </CardContent> 
            </Card> 
          </Grid2> 
          <Grid2 item xs={12} sm={6} md={4}> 
            <Card className={styles.teamCard}> 
              <CardMedia component="img" height="200" image={teamMember3} alt="Team Member 3" /> 
              <CardContent> 
                <Typography variant="h6">Emily Johnson</Typography> 
                <Typography variant="body2" color="textSecondary">Head of Marketing</Typography> 
                <Typography variant="body2" color="textSecondary">emily.johnson@example.com</Typography> 
                <Typography variant="body2" color="textSecondary">+1 234 567 892</Typography> 
              </CardContent> 
            </Card> 
          </Grid2> 
        </Grid2> 
      </Box> 
      {/* Join Us Today Section */} 
      <Box sx={{ my: 5 }} className={styles.section}> 
        <Typography variant="h4" component="h2" gutterBottom> Join Us Today </Typography> 
        <Typography variant="body1" > 
          Ready to start your journey with us? Sign up as a seller to showcase your products to a global audience, or sign up as a buyer to discover unique items you won't find anywhere else. 
        </Typography> 
        <Grid2 container justifyContent="center" spacing={2}> 
          <Grid2 item> 
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} to="/signup-seller" 
              className={styles.button}
            > 
              Sign Up as a Seller 
            </Button> 
          </Grid2> 
          <Grid2 item> 
            <Button 
              variant="contained" 
              color="secondary" 
              component={Link} to="/signup-buyer" 
              className={styles.button}
            > 
              Sign Up as a Buyer 
            </Button> 
          </Grid2> 
        </Grid2> 
      </Box> 
      {/* In-App Chat Feature Section */} 
      <Box sx={{ textAlign: 'center', my: 5 }} className={styles.chatFeature}> 
        <Typography variant="h6" gutterBottom> In-App Chat Feature </Typography> 
        <Typography variant="body1" > 
          Our website also includes an in-app chat feature that allows buyers and sellers to communicate directly, making it easier to ask questions, negotiate prices, and build trust. 
        </Typography> 
      </Box> 
    </Container> 
  ); 
};

export default About;
