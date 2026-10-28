import { Link } from "react-router-dom";
import "./home.css";
import "./brand.css";

const brands = [
  {
    name: "Apple",
    mark: "A",
    className: "apple",
    description: "Explore iPhone models, from everyday favorites to Pro devices.",
  },
  {
    name: "Samsung",
    mark: "S",
    className: "samsung",
    description: "Discover Galaxy phones for work, creativity, and everyday use.",
  },
  {
    name: "OnePlus",
    mark: "1+",
    className: "oneplus",
    description: "Find fast, feature-packed OnePlus smartphones.",
  },
  {
    name: "Google",
    mark: "G",
    className: "google",
    description: "See Pixel phones with Google's smart features built in.",
  },
  {
    name: "Xiaomi",
    mark: "X",
    className: "xiaomi",
    description: "Browse Xiaomi smartphones and discover your next upgrade.",
  },
];

function Brand() {
  return (
    <div className="brand-page">
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
          <Link to="/brands" className="nav-active">Brands</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">🛒 <span>Cart</span></Link>
          <Link to="/login" className="navbar-login">Login</Link>
        </div>
      </header>

      <main>
        <section className="brand-hero">
          <span className="brand-eyebrow">BRANDS YOU LOVE</span>
          <h1>Choose your next favorite.</h1>
          <p>Explore smartphone collections from leading technology brands.</p>
        </section>

        <section className="brand-directory" aria-labelledby="brand-title">
          <div className="brand-directory-heading">
            <div>
              <span className="brand-eyebrow">FIND YOUR BRAND</span>
              <h2 id="brand-title">Shop by brand</h2>
            </div>
            <p>Pick a brand to see its phones in our collection.</p>
          </div>
          <div className="brand-directory-grid">
            {brands.map((brand) => (
              <article className="brand-directory-card" key={brand.name}>
                <div className={`brand-mark brand-mark-${brand.className}`} aria-hidden="true">
                  {brand.mark}
                </div>
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
                <Link
                  to={`/products?brand=${encodeURIComponent(brand.name)}`}
                  className="brand-shop-link"
                >
                  Browse {brand.name} phones <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
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

export default Brand;