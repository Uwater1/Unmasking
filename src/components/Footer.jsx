import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>210 6111 36 ST SE, Calgary, Alberta, T2C 3W</p>
        <p>Email: <a href="mailto:Unmaskinglungcancercalgary@gmail.com">Unmaskinglungcancercalgary@gmail.com</a></p>
        <p>Phone: 403 801 5000</p>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Unmasking the Reality of Lung Cancer. All rights reserved.</p>
        <div className="social-media">
          <a href="https://www.facebook.com/UnmaskingC/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/company/unmasking-the-reality-of-lung-cancer/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
