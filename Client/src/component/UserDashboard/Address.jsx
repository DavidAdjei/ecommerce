import React from "react";
import { TextField, Select, MenuItem, Grid } from "@mui/material";

const Address = ({ setFormData, formData, page }) => {
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

  return (
    <Grid container spacing={2}>
      {/* City Field */}
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.address.city}
          onChange={handleAddressChange}
        />
      </Grid>

      {/* Region Select */}
      <Grid item xs={12} sm={6} md={6}>
        <Select
          fullWidth
          labelId="region-label"
          name="region"
          value={formData.address.region}
          onChange={handleAddressChange}
          displayEmpty
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
      </Grid>

      {/* Street Field */}
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          fullWidth
          label="Street"
          name="street"
          value={formData.address.street}
          onChange={handleAddressChange}
        />
      </Grid>

      {/* House Number Field */}
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          fullWidth
          label="House Number"
          name="houseNumber"
          value={formData.address.houseNumber}
          onChange={handleAddressChange}
        />
      </Grid>

      {/* Ghana Post Field */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Ghana Post"
          name="ghanaPost"
          value={formData.address.ghanaPost}
          onChange={handleAddressChange}
        />
      </Grid>
    </Grid>
  );
};

export default Address;
