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
            <a href="https://www.facebook.com/UnmaskingC/" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              padding: '0',
              margin: '0 0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              transition: 'background-color 0.3s ease'
            }}>
              <img 
                src="/facebook.png" 
                alt="Facebook" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  padding: '0',
                  margin: '0',
                  filter: 'invert(1) brightness(2)'
                }}
              />
            </a>
            <a href="https://www.linkedin.com/company/unmasking-the-reality-of-lung-cancer/" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              padding: '0',
              margin: '0 0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              transition: 'background-color 0.3s ease'
            }}>
              <img 
                src="/linkedin.png" 
                alt="LinkedIn" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  padding: '0',
                  margin: '0',
                  filter: 'invert(1) brightness(2)'
                }}
              />
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
