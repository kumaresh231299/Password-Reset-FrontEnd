import React from 'react';
import errorImage from '../assets/errorImage.jpg'

const ErrorPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={errorImage} alt='404 Error' height='700' width='800'/>
        </div>
    );
};

export default ErrorPage;