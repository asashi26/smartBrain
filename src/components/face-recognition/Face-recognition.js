import React from 'react';
import './Face-recognition.css'


const FaceRecognition = ({ imageUrl, box }) => {

  return (
    <div className='center'>
    <div className='absolute mt2'>
      <img id='inputimage' src={imageUrl} alt='#' width='500px' height='auto'/>
      <div className='bouning-box'></div>
    </div>
      
    </div>
  );
}

export default FaceRecognition