import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Hope, Advocacy, and Groundbreaking Research</h1>
          <p>Unmasking the reality of lung cancer and empowering patients, caregivers, and advocates.</p>
          <Link to="/advocacy" className="cta-button">Take Action Now</Link>
        </div>
      </section>

      <section className="content-with-image">
        <div className="text-content">
          <section id="features" className="features-grid">
            <div className="feature-card">
              <h3>Patient & Caregiver Hub</h3>
              <p>Plain-language guides, treatment navigators, and mental health resources.</p>
              <Link to="/patient-hub">Learn More</Link>
            </div>
            <div className="feature-card">
              <h3>Advocacy & Policy</h3>
              <p>One-click tools to email MPs, track legislation, and drive change.</p>
              <Link to="/advocacy">Get Involved</Link>
            </div>
            <div className="feature-card">
              <h3>Research & Clinical Trials</h3>
              <p>Simplified clinical trial finders and the latest research news.</p>
              <Link to="/research">Explore Research</Link>
            </div>
          </section>
        </div>
        <aside className="side-image">
          <img src="/side.jpeg" alt="What you can't see can hurt you" />
        </aside>
      </section>
    </div>
  );
}

export default Home;
