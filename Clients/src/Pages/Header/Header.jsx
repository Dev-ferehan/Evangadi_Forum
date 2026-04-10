import React from 'react';
import { Link  } from 'react-router-dom';
import classes from './header.module.css';
import logo from '../../assets/logo1.png';
import { useContext } from 'react';
import { AppState } from '../../AppStateCtx';
const Header = () => { 
const{islogin}=useContext(AppState)
  return (
    <header className={classes.header_container}>
      <div className={classes.header_inner}>
        <div className={classes.logo_container}>
          <Link to={'/'}>
          <img 
            src={logo} 
            alt="Evangadi Logo" 
            className={classes.logo_img} 
          />
          </Link>
        </div>

  {
  islogin ? 
(  <nav className={classes.header__nav}>
    <Link to="/" className={classes.nav__link}>Home</Link>
    <Link to="/how-it-works" className={classes.nav__link}>How it works</Link>          
    <Link to="/logout" className={classes.nav__button_link}>
      <button className={classes.nav__button}>
        
        LOGOUT</button>
    </Link>
  </nav>):(
    <nav className={classes.header__nav}>          
    <Link to="/login" className={classes.nav__button_link}>
      <button className={classes.nav__button}>
        
        LOGIN</button>
    </Link>
  </nav>
  )}

      </div>
    </header>
  );
};

export default Header;