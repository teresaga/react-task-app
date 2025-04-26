import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Login } from './layouts/Login/Login';

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar/>
      <div className='flex-grow-1'>
        {/* <HomePage/> */}
        <Login/>
      </div>
      <Footer/>
    </div>
  );
}
