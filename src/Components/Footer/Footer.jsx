import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css'; // Import the CSS file for styling
// import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { LiaFacebook } from "react-icons/lia";
import footer_logo from '../../assets/image/footer_logo.png'
import { RiYoutubeLine } from "react-icons/ri";
import { LiaInstagram } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className={classes.footerContainer}>
      <div className={classes.footerSection}>
        <div className={classes.footer_logo}>
            <Link to={"/"}>
            <img src={footer_logo} alt="" />
            </Link>
        </div>
        <div className={classes.socialIcons}>
          <a href="https://www.facebook.com/evangadinetworks" target="_blank" rel="noopener noreferrer">
            <LiaFacebook className={classes.icon_color}/>
          </a>
          <a href="https://www.instagram.com/evangadinetworks" target="_blank" rel="noopener noreferrer">
            <LiaInstagram className={classes.icon_color}/>
          </a>
          <a href="https://www.youtube.com/evangadinetworks" target="_blank" rel="noopener noreferrer">
           <RiYoutubeLine className={classes.icon_color}/>
          </a>
        </div>
      </div>
      <div className={classes.footerSection}>
        <h3>Useful Links</h3>
        <ul>
          <li><Link to="/how-it-works">How It Works</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </div>
      <div className={classes.footerSection}>
        <h3>Contact Info</h3>
        <ul>
          <li><Link to="/evangadi-networks">Evangadi Networks</Link></li>
          <li><Link to={"mailto:support@evangadi.com"}>support@evangadi.com</Link></li>
          <li><Link to={"tel:+12023862702"}>+1-202-386-2702</Link></li>
        </ul>
         
      </div>
    </footer>
  );
}

export default Footer;
