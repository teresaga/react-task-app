import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Login } from './layouts/LoginAndRegister/Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Register } from './layouts/LoginAndRegister/Register';
import { Tasks } from './layouts/Tasks/Tasks';
import { Task } from './layouts/Tasks/Task';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

export const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className={`d-flex flex-column min-vh-100 ${isHomePage ? 'home-background' : ''}`}>
      <AuthProvider>
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

          <ProtectedRoute path='/tasks' component={Tasks}/>
          <ProtectedRoute path='/task' component={Task}/>

        </Switch>
      </div>

      <Footer/>
      </AuthProvider>
    </div>
  );
}
