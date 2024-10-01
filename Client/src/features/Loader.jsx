import React from 'react';
import { Atom } from 'react-loading-indicators';
import './features.css';

const Loader = () => {
  return (
    <div className='loader_container'>
      <Atom color="#32cd32" size={50} text="Please Wait" textColor='#b5faaf' />
    </div>
  );
}

export default Loader;
