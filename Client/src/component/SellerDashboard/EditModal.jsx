import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography, Grid } from "@mui/material";


const EditModal = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSpecChange = (index, value) => {
    const updatedSpecs = [...formData.specs];
    updatedSpecs[index] = value;
    setFormData({ ...formData, specs: updatedSpecs });
  };

  const handleAddSpec = () => {
    setFormData({ ...formData, specs: [...formData.specs, ""] });
  };

  const handleRemoveSpec = (index) => {
    const updatedSpecs = formData.specs.filter((_, i) => i !== index);
    setFormData({ ...formData, specs: updatedSpecs });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "80%",
          maxWidth: 600,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Product
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="RAM"
              value={formData.RAM}
              onChange={(e) => handleChange("RAM", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ETA (days)"
              type="number"
              value={formData.eta}
              onChange={(e) => handleChange("eta", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Specs
            </Typography>
            {formData.specs.map((spec, index) => (
              <Grid container spacing={1} key={index} alignItems="center">
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    value={spec}
                    onChange={(e) => handleSpecChange(index, e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveSpec(index)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button variant="outlined" onClick={handleAddSpec} sx={{ mt: 1 }}>
              Add Spec
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => onSave(formData)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
