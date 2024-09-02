import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ErrorPage from './Pages/ErrorPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<LandingPage />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/reset-password/:id/:token' element={<ResetPassword />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;