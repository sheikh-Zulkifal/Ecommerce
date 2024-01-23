import React from "react";
import "./Footer.css"
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download our app for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first piority</p>
        <p>Copyrights 2024 &copy; Zulkifal</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="/">Facebook</a>
        <a href="/">Youtube</a>
      </div>
    </footer>
  );
};

export default Footer;
