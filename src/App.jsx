import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your page components
import Home from './pages/Home';
import Advocacy from './pages/Advocacy';
import Founder from './pages/Founder';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <nav className="navbar">
            <Link to="/" className="nav-logo">
              <img src="/logo.png" alt="Unmasking Lung Cancer Logo" />
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/patient-hub" className="nav-link">Patient & Caregiver Hub</Link>
              </li>
              <li className="nav-item">
                <Link to="/advocacy" className="nav-link">Advocacy & Policy</Link>
              </li>
              <li className="nav-item">
                <Link to="/founder" className="nav-link">Our Founder</Link>
              </li>
              <li className="nav-item">
                <Link to="/research" className="nav-link">Research</Link>
              </li>
              <li className="nav-item">
                <a href="#community" className="nav-link">Community</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">Contact</a>
              </li>
            </ul>
            <div className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advocacy" element={<Advocacy />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/patient-hub" element={<div>Patient & Caregiver Hub - Coming Soon</div>} />
            <Route path="/research" element={<div>Research - Coming Soon</div>} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
