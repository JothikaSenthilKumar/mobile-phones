
import { useState } from "react";
import { Link } from "react-router-dom";
import catalogPhones from "../data/phones.js";
import "./home.css";

const phones = catalogPhones.slice(0, 4);

function Home() {
  const [search, setSearch] = useState("");

  const filteredPhones = phones.filter((phone) =>
    `${phone.name} ${phone.brand}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      {/* NAVBAR */}
      <header className="home-navbar">
        <Link to="/home" className="home-logo">
          <span className="logo-icon">📱</span>
          <span>
            Mobi<span className="logo-highlight">Zone</span>
          </span>
        </Link>

        <nav className="home-nav-links">
          <Link to="/home" className="nav-active">
            Home
          </Link>
          <Link to="/products">Mobiles</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-actions">
          <a href="#featured" className="navbar-search" aria-label="Search phones">
            🔍
          </a>

          <Link to="/cart" className="navbar-cart">
            🛒 <span>Cart</span>
          </Link>

          <Link to="/login" className="navbar-login">
            Login
          </Link>
        </div>
      </header>

      {/* HERO BANNER */}
      <main>
        <section className="home-hero">
          <div className="hero-content">
            <span className="hero-label">
              ✨ DISCOVER THE LATEST TECHNOLOGY
            </span>

            <h1>
              Find Your Perfect
              <br />
              <span>Smartphone.</span>
            </h1>

            <p>
              Explore the latest smartphones, discover amazing features,
              and find the right phone for your lifestyle.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="hero-primary-button">
                Explore Phones →
              </Link>

              <a href="#featured" className="hero-secondary-button">
                View Collection
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>50+</strong>
                <span>Phone Models</span>
              </div>
              <div>
                <strong>10+</strong>
                <span>Top Brands</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Support</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow"></div>
            <img
              src={phones[0].image}
              alt={`${phones[0].name} smartphone`}
            />

            <div className="hero-offer">
              <span>SMART CHOICE</span>
              <strong>New arrivals</strong>
              <small>Discover your next phone</small>
            </div>
          </div>
        </section>

        {/* SEARCH BAR */}
        <section className="home-search-section">
          <div>
            <span className="section-label">SEARCH OUR COLLECTION</span>
            <h2>Which phone are you looking for?</h2>
          </div>

          <div className="home-search-box">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Search Apple, Samsung, OnePlus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search smartphones"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </section>

        {/* BRANDS */}
        <section className="brand-section" id="brands">
          <div className="section-heading">
            <div>
              <span className="section-label">SHOP YOUR FAVOURITE</span>
              <h2>Popular Brands</h2>
            </div>
            <Link to="/products" className="view-all-link">
              View all →
            </Link>
          </div>

          <div className="brand-list">
            {["Apple", "Samsung", "OnePlus", "Google", "Xiaomi"].map(
              (brand) => (
                <Link
                  key={brand}
                  to={`/products?brand=${encodeURIComponent(brand)}`}
                  className="brand-chip"
                >
                  <span>{brand}</span>
                  <span>↗</span>
                </Link>
              )
            )}
          </div>
        </section>

        {/* FEATURED PHONES */}
        <section className="featured-section" id="featured">
          <div className="section-heading">
            <div>
              <span className="section-label">HANDPICKED FOR YOU</span>
              <h2>Featured Smartphones</h2>
              <p className="section-description">
                Find your next favourite device.
              </p>
            </div>

            <Link to="/products" className="view-all-link">
              All phones →
            </Link>
          </div>

          <div className="phone-grid">
            {filteredPhones.length > 0 ? (
              filteredPhones.map((phone) => (
                <article className="phone-card" key={phone.id}>
                  <div className="phone-image-box">
                    <span className="phone-badge">{phone.label}</span>
                    <img src={phone.image} alt={phone.name} loading="lazy" />
                  </div>

                  <div className="phone-details">
                    <span className="phone-brand">{phone.brand}</span>
                    <h3>{phone.name}</h3>

                    <div className="phone-rating">
                      <span>★★★★★</span>
                      <small>Featured phone</small>
                    </div>

                    <div className="phone-price">
                      <strong>
                        ₹{phone.price.toLocaleString("en-IN")}
                      </strong>
                      <del>
                        ₹{phone.oldPrice.toLocaleString("en-IN")}
                      </del>
                    </div>

                    <Link to="/products" className="phone-buy-button">
                      Explore Phone <span>→</span>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <p className="no-products">
                No phones found. Try another name or brand.
              </p>
            )}
          </div>
        </section>

        {/* SERVICE FEATURES */}
        <section className="benefits-section">
          <div className="benefit-item">
            <span className="benefit-icon">🚚</span>
            <div>
              <h3>Delivery Options</h3>
              <p>Convenient delivery choices</p>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-icon">🔒</span>
            <div>
              <h3>Secure Shopping</h3>
              <p>Shop with confidence</p>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-icon">💬</span>
            <div>
              <h3>Customer Support</h3>
              <p>We are here to help</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <Link to="/home" className="home-logo footer-logo">
          📱 Mobi<span className="logo-highlight">Zone</span>
        </Link>

        <p>Your next smartphone starts here.</p>

        <div className="footer-links">
          <Link to="/home">Home</Link>
          <Link to="/products">Mobiles</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <small>© 2026 MobiZone. Demo shopping website.</small>
      </footer>
    </div>
  );
}

export default Home;
