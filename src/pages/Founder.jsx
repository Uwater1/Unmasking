import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Founder() {
  return (
    <div className="founder-page">
      <section className="page-header">
        <div className="container">
          <h1>Our Founder</h1>
          <p className="subtitle">Dedicated to making a difference in the fight against lung cancer</p>
        </div>
      </section>

      <section className="founder-section">
        <div className="container founder-container">
          <div className="founder-profile">
            <div className="founder-image">
              {/* Replace with actual image path */}
              <div className="founder-placeholder">
                <span>Diane MA Colton</span>
              </div>
            </div>
            <div className="founder-details">
              <h2>Diane MA Colton, FDFS</h2>
              <div className="founder-titles">
                <p><i className="fas fa-briefcase"></i> CEO, Mobility Financial Services Inc. (est. 2007)</p>
                <p><i className="fas fa-award"></i> Fellow of Distinguished Financial Services</p>
                <p><i className="fas fa-ribbon"></i> Founder and Chair, Unmasking the Reality of Lung Cancer Society</p>
                <p><i className="fas fa-medal"></i> Recipient of the King Charles III Coronation Medal</p>
              </div>
            </div>
          </div>

          <div className="founder-story">
            <h3>Her Story</h3>
            <div className="story-content">
              <p>Diane Colton's lung cancer journey began in 2011 when she started coughing up blood-filled mucus. She was diagnosed with Stage 1B adenocarcinoma. She underwent surgery to remove the tumor, which she nicknamed "Wally Walnut". The surgery was successful, and no other treatment was required.</p>
              <p>In 2019, she was diagnosed with a brain tumor, which she named "Marshmallow Morgan". As of June 2020, the tumor has continued to shrink with radiation treatments.</p>
              <p>Driven by her personal experience, Diane founded "Unmasking the Reality of Lung Cancer," a non-profit organization dedicated to raising awareness, supporting patients and caregivers, and advocating for better lung cancer research and treatment options.</p>
            </div>
          </div>

          <div className="cta-section">
            <h3>Join Our Mission</h3>
            <p>Help us make a difference in the lives of those affected by lung cancer.</p>
            <div className="cta-buttons">
              <Link to="/advocacy" className="cta-button">Get Involved</Link>
              <Link to="/donate" className="cta-button secondary">Donate</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Founder;
