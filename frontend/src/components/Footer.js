import React from "react";
import "./styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Books Ocean. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
