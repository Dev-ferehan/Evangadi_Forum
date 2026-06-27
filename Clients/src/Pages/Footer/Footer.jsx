import React from 'react';
import classes from './footer.module.css';
import footer_logo from '../../assets/footerLogo.png'
// If using FontAwesome, ensure you have the library installed/linked
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className={classes.footer_wrapper}>
    <div className={classes.footer_outer}>
  


    
      <div className={classes.footer_inner}>
        
        {/* Left Section: Logo */}
        <div className={classes.footer_logo}>
     
          <img src={footer_logo} alt="Evangadi Logo" />
        </div>

        {/* Center Section: Links */}
        <div className={classes.footer_links}>
          <a href="/about">About Us</a>
          <span className={classes.divider}>|</span>
          <a href="/privacy">Privacy Policy</a>
          <span className={classes.divider}>|</span>
          <a href="/terms">Terms of Services</a>
        </div>

        {/* Right Section: Social Icons */}
        <div className={classes.footer_socials}>
          <a href="#"><i className="fab fa-facebook-f"><FaFacebookF/></i></a>
          <a href="#"><i className="fab fa-instagram"><FaInstagram/></i></a>
          <a href="#"><i className="fab fa-youtube">< FaYoutube/></i></a>
          <a href="#"><i className="fab fa-tiktok"><FaTiktok/></i></a>
        </div>
      <p>© 2026 Evangadi. Developed by <a href="#" >Ferehan Ahmed</a></p>
      
      </div>
    </div>
    </footer>
  );
};

export default Footer;