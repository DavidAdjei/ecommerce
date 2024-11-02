import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addProduct, setFeedback } from '../../redux/Actions/productActions';

const AddProductForm = ({user, addProduct, setFeedback}) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    specs: [],
  });
  const [extraFields, setExtraFields] = useState({
    brand: '',
    RAM: '',
    displaySize: '',
    eta: '',
    For: '',
    Genre: '',
    Language: '',
    type: '',
  });
  const [selectedField, setSelectedField] = useState('');
  const [specText, setSpecText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleExtraFieldChange = (e) => {
    const { name, value } = e.target;
    setExtraFields({ ...extraFields, [name]: value });
  };

  const handleAddSpec = () => {
    if (specText.trim()) {
      setProduct((prev) => ({ ...prev, specs: [...prev.specs, specText.trim()] }));
      setSpecText('');
    }
  };

  const handleExtraFieldSelect = (e) => {
    setSelectedField(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completeProduct = { ...product, ...extraFields };
    addProduct(user._id, completeProduct).then((res) => {
      setFeedback(res);
      setProduct({ title: '', description: '', price: '', category: '', specs: [] });
        setExtraFields({
          brand: '',
          RAM: '',
          displaySize: '',
          eta: '',
          For: '',
          Genre: '',
          Language: '',
          type: '',
        });
        setSelectedField('');
    }).catch((error) => {
      setFeedback({error});
    })
  }
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Add New Product</Typography>

      <TextField label="Title" name="title" fullWidth required value={product.title} onChange={handleChange} margin="normal" />
      <TextField label="Description" name="description" fullWidth value={product.description} onChange={handleChange} margin="normal" multiline rows={4} />
      <TextField label="Price" name="price" type="number" fullWidth value={product.price} onChange={handleChange} margin="normal" />
      <TextField label="Category" name="category" fullWidth value={product.category} onChange={handleChange} margin="normal" />

      <Box display="flex" alignItems="center" gap={1}>
        <TextField label="Specifications" fullWidth value={specText} onChange={(e) => setSpecText(e.target.value)} />
        <Button variant="contained" onClick={handleAddSpec}>Add Spec</Button>
      </Box>

      <FormControl fullWidth margin="normal">
        <InputLabel id="extra-fields-label">Add Extra Fields</InputLabel>
        <Select labelId="extra-fields-label" value={selectedField} onChange={handleExtraFieldSelect}>
          <MenuItem value="brand">Brand</MenuItem>
          <MenuItem value="RAM">RAM</MenuItem>
          <MenuItem value="displaySize">Display Size</MenuItem>
          <MenuItem value="eta">ETA</MenuItem>
          <MenuItem value="For">For</MenuItem>
          <MenuItem value="Genre">Genre</MenuItem>
          <MenuItem value="Language">Language</MenuItem>
          <MenuItem value="type">Type</MenuItem>
        </Select>
      </FormControl>

      {selectedField && (
        <TextField
          label={selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}
          name={selectedField}
          fullWidth
          value={extraFields[selectedField]}
          onChange={handleExtraFieldChange}
          margin="normal"
        />
      )}

      <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px' }}>Add Product</Button>
    </form>
  );
};

AddProductForm.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})


export default connect(mapStateToProps, {addProduct, setFeedback})(AddProductForm)