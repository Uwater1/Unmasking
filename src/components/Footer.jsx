import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-section">
          <h3>Contact Us</h3>
          <p>210 6111 36 ST SE, Calgary, Alberta, T2C 3W</p>
          <p>Email: <a href="mailto:Unmaskinglungcancercalgary@gmail.com">Unmaskinglungcancercalgary@gmail.com</a></p>
          <p>Phone: 403 801 5000</p>
          
          <div className="social-media">
            <a href="https://www.facebook.com/UnmaskingC/" target="_blank" rel="noopener noreferrer">
              <img src="/facebook.png" alt="Facebook" width="24" height="24" /> 
            </a>
            <a href="https://www.linkedin.com/company/unmasking-the-reality-of-lung-cancer/" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" width="24" height="24" />
            </a>
          </div>
        </div>
        
        <p className="copyright">
          &copy; {new Date().getFullYear()} Unmasking the Reality of Lung Cancer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
