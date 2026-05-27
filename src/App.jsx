import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import './App.css';
import VirtualTour from './VirtualTour';
import ProjectDetail from './pages/ProjectDetail';

// Reveal Animation Wrapper Component
const Reveal = ({ children, className = '', delay = 0, animation = 'fade-up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const style = {
    animationDelay: `${delay}s`,
    opacity: 0, // initially hidden
    animationFillMode: 'forwards'
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${isVisible ? `animate-${animation}` : ''}`} 
      style={style}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const Home = () => {
  const [showTour, setShowTour] = useState(false);

  return (
    <main>
      {showTour && <VirtualTour onClose={() => setShowTour(false)} />}
      <Hero onStartTour={() => setShowTour(true)} />
      <About />
      <Projects />
      <OnGoingProjects />
      <Contact />
    </main>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu} style={{textDecoration: 'none'}}>
            <h2>DODKE <span>GROUP</span></h2>
          </Link>
        </div>
        
        {/* Hamburger Icon */}
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><a href="/#about" onClick={closeMenu}>About Us</a></li>
            <li><a href="/#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
          <div className="menu-btn mobile-only">
            <a href="/#contact" className="btn btn-primary" onClick={closeMenu}>Enquire Now</a>
          </div>
        </nav>
        <div className="menu-btn desktop-only">
          <a href="/#contact" className="btn btn-primary">Enquire Now</a>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ onStartTour }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <img src="/hero_building_1779885241624.png" alt="Luxury Skyscraper" className="hero-bg" />
      <div className="hero-content container">
        <Reveal delay={0}>
          <h1>Crafting Timeless Spaces</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p>Premium residential and commercial developments delivering quality and innovation.</p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="hero-actions">
            <button onClick={onStartTour} className="btn btn-primary" style={{ border: '2px solid var(--secondary-color)' }}>Start Virtual Tour</button>
            <a href="/#projects" className="btn btn-outline">Explore Projects</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container about-container">
        <Reveal className="about-image" animation="fade-right">
           <img src="/luxury_interior_1779885259162.png" alt="Luxury Interior" />
        </Reveal>
        <div className="about-text">
          <Reveal delay={0.1}>
            <h2 className="section-title left-align">About Us</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>We are dedicated to building not just homes, but legacies. With a commitment to architectural excellence and uncompromised quality, we create spaces that inspire.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>Our properties are designed for the modern lifestyle, integrating aesthetic beauty with functional design and state-of-the-art amenities.</p>
          </Reveal>
          <Reveal delay={0.4}>
            <a href="/#contact" className="btn btn-outline">Read Our Story</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section projects bg-light">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Featured Projects</h2>
        </Reveal>
        <div className="projects-grid">
          <Reveal animation="fade-up" delay={0.1}>
            <div className="project-card">
              <div className="project-image">
                <img src="/project_exterior_1779885276452.png" alt="Oakwood Apartments" />
              </div>
              <div className="project-info">
                <h3>Oakwood Residences</h3>
                <p>Premium 3 & 4 BHK Apartments</p>
                <Link to="/project/oakwood" className="read-more">View Details &rarr;</Link>
              </div>
            </div>
          </Reveal>
          <Reveal animation="fade-up" delay={0.3}>
            <div className="project-card">
              <div className="project-image">
                <img src="/hero_building_1779885241624.png" alt="The Pinnacle" />
              </div>
              <div className="project-info">
                <h3>The Pinnacle</h3>
                <p>Luxury Commercial Spaces</p>
                <Link to="/project/pinnacle" className="read-more">View Details &rarr;</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const OnGoingProjects = () => {
  return (
    <section id="ongoing" className="section projects">
      <div className="container">
        <Reveal>
          <h2 className="section-title left-align">On-Going Projects</h2>
        </Reveal>
        <div className="projects-grid">
          <Reveal animation="fade-up" delay={0.1}>
            <div className="project-card">
              <div className="project-image">
                <img src="/dodke_skyline.png" alt="Dodke Skyline" />
                <div className="status-badge" style={{position: 'absolute', top: '15px', right: '15px', background: 'var(--secondary-color)', color: 'white', padding: '5px 15px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold'}}>ONGOING</div>
              </div>
              <div className="project-info">
                <h3>Dodke Skyline</h3>
                <p>Ultra-Luxury High-Rise Residences</p>
                <Link to="/project/dodke-skyline" className="read-more">View Details &rarr;</Link>
              </div>
            </div>
          </Reveal>
          <Reveal animation="fade-up" delay={0.3}>
            <div className="project-card">
              <div className="project-image">
                <img src="/dodke_meadows.png" alt="Dodke Aurora" />
                <div className="status-badge" style={{position: 'absolute', top: '15px', right: '15px', background: 'var(--secondary-color)', color: 'white', padding: '5px 15px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold'}}>ONGOING</div>
              </div>
              <div className="project-info">
                <h3>Dodke Aurora</h3>
                <p>Premium Villa Community</p>
                <Link to="/project/dodke-aurora" className="read-more">View Details &rarr;</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-container">
        <Reveal className="contact-info" animation="fade-right">
          <h2 className="section-title left-align">Enquire Now</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>Ready to find your dream home or have a project in mind? Fill out the form and our luxury advisors will contact you.</p>
          <div className="info-list">
            <div style={{ marginBottom: '1rem' }}>
              <strong>Address:</strong><br/>
              123 Luxury Avenue, Pune, Maharashtra
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Phone:</strong><br/>
              +91 98765 43210
            </div>
            <div>
              <strong>Email:</strong><br/>
              sales@dodkegroup.com
            </div>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrapper" animation="fade-left" delay={0.2}>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Enquiry Sent Successfully!'); e.target.reset(); }}>
            <div className="form-group">
              <input type="text" placeholder="Full Name" required className="form-control" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" required className="form-control" />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Phone Number" required className="form-control" />
            </div>
            <div className="form-group">
              <select required className="form-control">
                <option value="">Select Property</option>
                <option value="oakwood">Oakwood Residences</option>
                <option value="pinnacle">The Pinnacle</option>
                <option value="dodke-skyline">Dodke Skyline</option>
                <option value="dodke-aurora">Dodke Aurora</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
            <div className="form-group">
              <select required className="form-control">
                <option value="">Interested Configuration</option>
                <option value="2bhk">2 BHK Apartment</option>
                <option value="3bhk">3 BHK Apartment</option>
                <option value="4bhk">4 BHK Premium</option>
                <option value="4.5bhk">4.5 BHK Luxury</option>
                <option value="commercial">Commercial Space</option>
              </select>
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="4" required className="form-control"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>DODKE <span>GROUP</span></h2>
          <p>Building Trust, Delivering Excellence.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#projects">Projects</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: info@dodkegroup.com</p>
          <p>Phone: +91 123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Dodke Group. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default App;
