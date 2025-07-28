import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Add scroll effect for navbar
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Hope, Advocacy, and Groundbreaking Research</h1>
          <p>Unmasking the reality of lung cancer and empowering patients, caregivers, and advocates through education, support, and action.</p>
          <Link to="/advocacy" className="cta-button">Take Action Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission in Action</h2>
            <p>Discover how we're making a difference in the fight against lung cancer</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <span role="img" aria-label="Medical">🏥</span>
              </div>
              <h3>Patient & Caregiver Hub</h3>
              <p>Access plain-language guides, treatment navigators, and mental health resources designed to support you through every step of your journey.</p>
              <Link to="/patient-hub" className="feature-link">Learn More →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span role="img" aria-label="Megaphone">📢</span>
              </div>
              <h3>Advocacy & Policy</h3>
              <p>Use our one-click tools to email MPs, track legislation, and drive meaningful change in lung cancer research and patient care.</p>
              <Link to="/advocacy" className="feature-link">Get Involved →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span role="img" aria-label="Microscope">🔬</span>
              </div>
              <h3>Research & Clinical Trials</h3>
              <p>Find simplified clinical trial information and stay updated with the latest breakthroughs in lung cancer research and treatment.</p>
              <Link to="/research" className="feature-link">Explore Research →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>People Reached</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Advocates</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Research Studies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
