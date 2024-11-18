import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InfoIcon from '@mui/icons-material/Info';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './Footer.module.css';
import { useSelector } from 'react-redux';

export default function Footer() {
  const {isAuth} = useSelector(state => state.auth)
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div className={styles.leftSection}>
            <Typography sx={{ fontSize: "1.6rem" }} className={styles.companyInfo}>Info</Typography>
            <div className={styles.footerLeftLinks}>
              <div className={styles.footerNavSection}>
                <Typography className={styles.footerNavTitle}>Pages</Typography>
                <ul className={styles.footerNavList}>
                  <li>
                    <HomeIcon className={styles.footerNavIcon} />
                    <Link to="/" className={styles.footerNavLink}>Home</Link>
                  </li>
                  <li>
                    <StoreIcon className={styles.footerNavIcon} />
                    <Link to="/products" className={styles.footerNavLink}>Product</Link>
                  </li>
                  {
                    !isAuth && (
                      <li>
                        <PersonAddIcon className={styles.footerNavIcon} />
                        <Link to="/signup" className={styles.footerNavLink}>Sign Up</Link>
                      </li>
                    )
                  }
                  
                </ul>
              </div>
              <div className={styles.footerNavSection}>
                <Typography className={styles.footerNavTitle}>Information</Typography>
                <ul className={styles.footerNavList}>
                  <li>
                    <InfoIcon className={styles.footerNavIcon} />
                    <Link to="/about" className={styles.footerNavLink}>About Us</Link>
                  </li>
                  <li>
                    <ReviewsIcon className={styles.footerNavIcon} />
                    <span className={styles.footerNavLink}>Testimonials</span>
                  </li>
                </ul>
              </div>
              <div className={styles.footerNavSection}>
                <Typography className={styles.footerNavTitle}>Get in Touch</Typography>
                <ul className={styles.footerNavList}>
                  <li>
                    <LocationOnIcon className={styles.footerNavIcon} />
                    <span className={styles.footerNavLink}>Company Location</span>
                  </li>
                  <li>
                    <EmailIcon className={styles.footerNavIcon} />
                    <span className={styles.footerNavLink}>Company email and number</span>
                  </li>
                  <li>
                    <LinkedInIcon className={styles.footerNavIcon} />
                    <a href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" className={styles.footerNavLink}>
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <TwitterIcon className={styles.footerNavIcon} />
                    <a href="https://www.twitter.com/yourcompany" target="_blank" rel="noopener noreferrer" className={styles.footerNavLink}>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <InstagramIcon className={styles.footerNavIcon} />
                    <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noopener noreferrer" className={styles.footerNavLink}>
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <Typography variant="h6">Contact Us</Typography>
            <form className={styles.contactForm}>
              <TextField
                className={styles.contactFormField}
                label="Name"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
              <TextField
                className={styles.contactFormField}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
              <TextField
                className={styles.contactFormField}
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
              <Button variant="contained" color="primary">
                Send
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
