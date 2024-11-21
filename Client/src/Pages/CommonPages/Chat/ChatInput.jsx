import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]); 
  const [caption, setCaption] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For slider navigation

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (currentImageIndex >= index && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      message,
      images,
      caption
    }
    const messageType = images.length ? 'image' : 'text';
    await onSendMessage(newMessage, messageType); 
    setMessage('');
    setImages([]);
    setCaption('');
    setCurrentImageIndex(0);
  };

  return (
    <form className="chat-input" onSubmit={handleSendMessage}>
      {/* Image Preview Section */}
      {images.length > 0 && (
        <div className="image-slider">
          <div className="slider-container">
            <IconButton onClick={handlePrevImage} disabled={images.length === 1}>
              <ArrowBackIosIcon />
            </IconButton>
            <div className="image-preview">
              <img
                src={URL.createObjectURL(images[currentImageIndex])}
                alt={`Preview ${currentImageIndex + 1}`}
                style={{ maxWidth: '300px', maxHeight: '200px' }}
              />
              <IconButton
                size="small"
                className="delete-image-btn"
                onClick={() => handleRemoveImage(currentImageIndex)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
            <IconButton onClick={handleNextImage} disabled={images.length === 1}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
          <div className='input-container'>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption for these images..."
              className="caption-input"
            />
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <IconButton color="primary" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
            <IconButton color="primary" type="submit" disabled={!message && images.length === 0}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      )}

      {
        images.length === 0 && (
          <div className="input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <input
              type="file"
              accept="image/*"
              multiple
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <IconButton color="primary" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
            <IconButton color="primary" type="submit" disabled={!message && images.length === 0}>
              <SendIcon />
            </IconButton>
          </div>
        )
      }
      
    </form>
  );
}

export default ChatInput;
