import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Login } from './layouts/LoginAndRegister/Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Register } from './layouts/LoginAndRegister/Register';

export const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className={`d-flex flex-column min-vh-100 ${isHomePage ? 'home-background' : ''}`}>
      <Navbar/>

      <div className='d-flex flex-column flex-grow-1'>
        <Switch>

          <Route path='/' exact>
            <Redirect to='/home'/>
          </Route>

          <Route path='/home'>
            <HomePage/>
          </Route>

          <Route path='/login'>
            <Login/>
          </Route>

          <Route path='/register'>
            <Register/>
          </Route>

        </Switch>
      </div>

      <Footer/>
    </div>
  );
}
