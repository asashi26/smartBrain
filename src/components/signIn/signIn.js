import React from 'react';
import './Face-recognition.css'


const SignIn = ({imageUrl, box}) => {

    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='#' width='500px' height='auto'/>
                <div className='bounding-box'
                     style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>

        </div>
    );
};

export default SignIn