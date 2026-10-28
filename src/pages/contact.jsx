import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "./contact.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      <header className="home-navbar">
        <Link to="/home" className="home-logo">
          <span className="logo-icon">📱</span>
          <span>
            Mobi<span className="logo-highlight">Zone</span>
          </span>
        </Link>
        <nav className="home-nav-links" aria-label="Main navigation">
          <Link to="/home">Home</Link>
          <Link to="/products">Mobiles</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/contact" className="nav-active">Contact</Link>
        </nav>
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">🛒 <span>Cart</span></Link>
          <Link to="/login" className="navbar-login">Login</Link>
        </div>
      </header>

      <main>
        <section className="contact-hero">
          <span className="contact-eyebrow">WE’RE HERE TO HELP</span>
          <h1>Let’s talk phones.</h1>
          <p>Have a question about a device or need a hand choosing? Send us a message.</p>
        </section>

        <section className="contact-content" aria-label="Contact MobiZone">
          <div className="contact-info">
            <span className="contact-eyebrow">GET IN TOUCH</span>
            <h2>How can we help?</h2>
            <p className="contact-intro">
              Tell us what you’re looking for and our demo support team will be happy to help.
            </p>
            <div className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">💬</span>
              <div>
                <h3>Product questions</h3>
                <p>Ask us about features, brands, or finding the right phone.</p>
              </div>
            </div>
            <div className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">🕘</span>
              <div>
                <h3>Support hours</h3>
                <p>Monday–Saturday, 9:00 AM–6:00 PM.</p>
              </div>
            </div>
            <div className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">📍</span>
              <div>
                <h3>Online store</h3>
                <p>Browse our smartphone collection from anywhere.</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a message</h2>
            <p>Fill in the details below and we’ll be in touch.</p>

            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" placeholder="Enter your name" required />

            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />

            <label htmlFor="contact-topic">What can we help with?</label>
            <select id="contact-topic" name="topic" defaultValue="" required>
              <option value="" disabled>Select a topic</option>
              <option value="product">Product information</option>
              <option value="order">Order question</option>
              <option value="other">Something else</option>
            </select>

            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="5" placeholder="Write your message..." required />

            <button type="submit" className="contact-submit">Send message <span aria-hidden="true">→</span></button>
            {submitted && (
              <p className="contact-demo-notice" role="status">
                This demo form is not connected to a support service, so your message has not been sent.
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="home-footer">
        <Link to="/home" className="home-logo footer-logo">
          📱 Mobi<span className="logo-highlight">Zone</span>
        </Link>
        <p>Your next smartphone starts here.</p>
        <div className="footer-links">
          <Link to="/home">Home</Link>
          <Link to="/products">Mobiles</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <small>© 2026 MobiZone. Demo shopping website.</small>
      </footer>
    </div>
  );
}

export default Contact;