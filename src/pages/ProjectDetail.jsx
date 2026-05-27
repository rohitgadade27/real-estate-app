import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, [id]);

  if (!project) {
    return (
      <div className="project-not-found" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Project Not Found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Detail Hero */}
      <section className="detail-hero" style={{ backgroundImage: `url(${project.heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <Link to="/" className="back-link">&larr; Back to Home</Link>
          <h1 className="animate-fade-up">{project.title}</h1>
          <p className="animate-fade-up" style={{ animationDelay: '0.2s' }}>{project.subtitle}</p>
        </div>
      </section>

      <div className="container detail-content-wrapper">
        <div className="detail-main">
          {/* Overview */}
          <section className="detail-section animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="section-title left-align">Project Overview</h2>
            <p className="detail-description">{project.description}</p>
            <div className="quick-facts">
              <div className="fact">
                <strong>Location:</strong> <span>{project.location}</span>
              </div>
              <div className="fact">
                <strong>Status:</strong> <span>{project.status}</span>
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section className="detail-section animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="section-title left-align">Premium Amenities</h2>
            <ul className="amenities-list">
              {project.amenities.map((amenity, index) => (
                <li key={index}><span className="check-icon">✓</span> {amenity}</li>
              ))}
            </ul>
          </section>

          {/* Gallery */}
          <section className="detail-section animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="section-title left-align">Gallery</h2>
            <div className="detail-gallery">
              {project.gallery.map((img, index) => (
                <img key={index} src={img} alt={`${project.title} gallery ${index + 1}`} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar / Sticky Contact */}
        <aside className="detail-sidebar animate-fade-left" style={{ animationDelay: '0.7s' }}>
          <div className="sticky-enquiry">
            <h3>Interested in {project.title}?</h3>
            <p>Get in touch with our sales team for floor plans, pricing, and availability.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Enquiry Sent!'); e.target.reset(); }}>
              <input type="text" className="form-control" placeholder="Your Name" required />
              <input type="email" className="form-control" placeholder="Email Address" required />
              <input type="tel" className="form-control" placeholder="Phone Number" required />
              
              <select required className="form-control" defaultValue={project.id}>
                <option value="">Select Property</option>
                <option value="oakwood">Oakwood Residences</option>
                <option value="pinnacle">The Pinnacle</option>
                <option value="dodke-skyline">Dodke Skyline</option>
                <option value="dodke-aurora">Dodke Aurora</option>
                <option value="general">General Inquiry</option>
              </select>

              <select required className="form-control">
                <option value="">Interested Configuration</option>
                <option value="2bhk">2 BHK Apartment</option>
                <option value="3bhk">3 BHK Apartment</option>
                <option value="4bhk">4 BHK Premium</option>
                <option value="4.5bhk">4.5 BHK Luxury</option>
                <option value="commercial">Commercial Space</option>
              </select>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Enquire Now</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetail;
