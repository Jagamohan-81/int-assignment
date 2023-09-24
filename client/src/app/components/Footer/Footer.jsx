import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container ">
      <div className="footer-content flex flex-col sm:flex-row justify-between items-center md:px-4 md:py-2">
        <div className="footer-logo text-2xl font-bold">Explore Earth Ltd.</div>
        <div className="footer-links md:flex hidden flex-row justify-around ">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/terms">Terms of Use</a>
        </div>
      </div>
      <div className="footer-bottom pb-2">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
