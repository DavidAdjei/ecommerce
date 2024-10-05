import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid2,
  Paper,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { connect } from "react-redux";
import { editUser, uploadImage } from "../../redux/Actions/authActions";
import { setFeedback } from "../../redux/Actions/productActions";

const ProfileContent = ({ user, editUser, setFeedback, uploadImage }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: {
      city: user.address?.city || "",
      region: user.address?.region || "",
      street: user.address?.street || "",
      houseNumber: user.address?.houseNumber || "",
      ghanaPost: user.address?.ghanaPost || "",
    },
  });

  const [image, setImage] = useState(user?.image.url || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData, user._id)
        .then((res) => setFeedback(res))
        .catch((err) => setFeedback({ error: err }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName !== "" || formData.lastName !== "") {
      editUser(formData, user._id)
        .then((res) => setFeedback(res))
        .catch((error) => setFeedback({ error }));
    } else {
      setFeedback({ error: "Name is required" });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <IconButton
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <Avatar
              alt="User Image"
              sx={{
                width: 180,
                height: 180,
                cursor: "pointer",
                bgcolor: image ? "transparent" : "grey.300",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="User"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{ width: "80%", height: "80%", color: "white" }}
                />
              )}
            </Avatar>
            <Typography position="absolute" sx={{ top: "12rem" }} variant="p">
              {!image ? "Upload Image" : "Change Image"}
            </Typography>
          </IconButton>
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          Account Info
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 container spacing={2} size={8}>
              <Grid2 item="true" size={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid2>
              <Grid2 item="true" size={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid2>
            </Grid2>
            <Grid2 item="true" size={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                disabled
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid2>
          </Grid2>
          <Typography variant="h6" paddingBlock={2}>
            Address Details
          </Typography>
          <Grid2 container size={8} spacing={2}>
            <Grid2 item="true" size={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
              />
            </Grid2>
            <Grid2 item="true" size={6}>
              <Select
                fullWidth
                labelId="region-label"
                name="region"
                value={formData.address.region}
                onChange={handleAddressChange}
              >
                <MenuItem value="" disabled>
                  Choose a region
                </MenuItem>
                <MenuItem value="Ahafo Region">Ahafo Region</MenuItem>
                <MenuItem value="Ashanti Region">Ashanti Region</MenuItem>
                <MenuItem value="Bono East Region">Bono East Region</MenuItem>
                <MenuItem value="Bono Region">Bono Region</MenuItem>
                <MenuItem value="Central Region">Central Region</MenuItem>
                <MenuItem value="Eastern Region">Eastern Region</MenuItem>
                <MenuItem value="Greater Accra Region">
                  Greater Accra Region
                </MenuItem>
                <MenuItem value="Northern Region">Northern Region</MenuItem>
                <MenuItem value="North East Region">North East Region</MenuItem>
                <MenuItem value="Oti Region">Oti Region</MenuItem>
                <MenuItem value="Volta Region">Volta Region</MenuItem>
                <MenuItem value="Western Region">Western Region</MenuItem>
                <MenuItem value="Western North Region">
                  Western North Region
                </MenuItem>
              </Select>
            </Grid2>
            <Grid2 item="true" size={6}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
              />
            </Grid2>
            <Grid2 item="true" size={6}>
              <TextField
                fullWidth
                label="House Number"
                name="houseNumber"
                value={formData.address.houseNumber}
                onChange={handleAddressChange}
              />
            </Grid2>
            <Grid2 item="true" size={6}>
              <TextField
                fullWidth
                label="Ghana Post"
                name="ghanaPost"
                value={formData.address.ghanaPost}
                onChange={handleAddressChange}
              />
            </Grid2>
          </Grid2>
          <Box sx={{ marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#f5a022" }}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

ProfileContent.propTypes = {
  user: PropTypes.object,
  editUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { uploadImage, setFeedback, editUser })(
  ProfileContent
);
