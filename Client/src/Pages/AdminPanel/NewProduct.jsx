import React, { useState } from 'react';
import UserInput from '../../features/UserInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../component/AdminMenu';

export default function NewProduct() {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  const [imageType, setImageType] = useState('link'); // 'link' or 'upload'
  const [imageLink, setImageLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageTypeChange = (e) => {
    setImageType(e.target.value);
    if (e.target.value === 'link') {
      setImageFile(null);
    }
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageLink('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !description || !stock || !price || (!imageLink && !imageFile) || !category) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      let imageData;
      if (imageType === 'link') {
        imageData = { image: imageLink };
      } else {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await axios.post('http://localhost:8000/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageData = { image: response.data.imageUrl };
      }

      const { data } = await axios.post('http://localhost:8000/addProducts', {
        name,
        description,
        price,
        stock,
        category,
        ...imageData,
      });

      if (!data.error) {
        setLoading(false);
        setError('');
        console.log('Product added');
        navigate('/admin');
        // Provide more user-friendly feedback here, such as displaying a success message.
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className='main_left' >
      <AdminMenu/>
      <div className='add_product'>
        {error && <p>{error }</p>}
        <form onSubmit={handleSubmit}>
          <h2>Add New Product</h2>
          <UserInput
            type="text"
            value={name}
            name="name"
            placeholder="Enter Product Name"
            setValue={setName}
          />
          <UserInput
            type="text"
            value={description}
            name="description"
            placeholder="Short description"
            setValue={setDesc}
          />
          <UserInput
            type="number"
            value={price}
            name="price"
            placeholder="Enter Product Price"
            setValue={setPrice}
          />
          <UserInput
            type="number"
            value={stock}
            name="stock"
            placeholder="Number of Products"
            setValue={setStock}
          />
          <UserInput
            type="text"
            value={category}
            name="category"
            placeholder="Category of the product"
            setValue={setCategory}
          />
          <div className='toogle_image-type'>
            <label className='label'>
              <input
                type="radio"
                value="link"
                checked={imageType === 'link'}
                onChange={handleImageTypeChange}
              />
              Add Image Link
            </label>
            <label className='label'>
              <input
                type="radio"
                value="upload"
                checked={imageType === 'upload'}
                onChange={handleImageTypeChange}
              />
              Upload Image
            </label>
          </div>
          {imageType === 'link' ? (
            <UserInput
              type="text"
              value={imageLink}
              name="imageLink"
              placeholder="Enter Image Link"
              setValue={setImageLink}
            />
          ) : (
            <input
                type="file"
                accept='image/*'
              name="imageFile"
              onChange={handleImageFileChange}
            />
          )}
          <input type="submit" className='submit_btn'/>
        </form>
      </div>
    </div>
    
  );
}
