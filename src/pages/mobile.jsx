import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import phones from "../data/phones.js";
import "./home.css";
import "./mobile.css";

const brands = [...new Set(phones.map((phone) => phone.brand))];

function Mobile({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(searchParams.get("brand") ?? "All brands");

  const filteredPhones = phones.filter((phone) => {
    const matchesSearch = `${phone.name} ${phone.brand}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesBrand = brand === "All brands" || phone.brand === brand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="mobile-page">
      <header className="home-navbar">
        <Link to="/home" className="home-logo">
          <span className="logo-icon">📱</span>
          <span>
            Mobi<span className="logo-highlight">Zone</span>
          </span>
        </Link>

        <nav className="home-nav-links" aria-label="Main navigation">
          <Link to="/home">Home</Link>
          <Link to="/products" className="nav-active">Mobiles</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">
            🛒 <span>Cart</span>
          </Link>
          <Link to="/login" className="navbar-login">Login</Link>
        </div>
      </header>

      <main>
        <section className="mobile-hero">
          <span className="mobile-eyebrow">THE MOBIZONE COLLECTION</span>
          <h1>Find your next phone.</h1>
          <p>Compare the latest smartphones from the brands you love.</p>
        </section>

        <section className="mobile-catalog" aria-labelledby="catalog-title">
          <div className="mobile-catalog-heading">
            <div>
              <span className="mobile-eyebrow">CURATED FOR YOU</span>
              <h2 id="catalog-title">All smartphones</h2>
              <p>{filteredPhones.length} phones to explore</p>
            </div>
            <div className="mobile-filters">
              <label className="mobile-search">
                <span aria-hidden="true">🔍</span>
                <input
                  type="search"
                  placeholder="Search phones or brands"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search phones or brands"
                />
              </label>
              <label className="mobile-brand-filter">
                <span className="mobile-visually-hidden">Filter by brand</span>
                <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                  <option>All brands</option>
                  {brands.map((brandName) => (
                    <option key={brandName}>{brandName}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mobile-product-grid">
            {filteredPhones.length ? (
              filteredPhones.map((phone) => (
                <article className="mobile-product-card" key={phone.id}>
                  <div className="mobile-product-image">
                    <span className="mobile-product-badge">{phone.label}</span>
                    <img src={phone.image} alt={phone.name} loading="lazy" />
                  </div>
                  <div className="mobile-product-details">
                    <span className="mobile-product-brand">{phone.brand}</span>
                    <h3>{phone.name}</h3>
                    <div className="mobile-product-rating" aria-label="Rated 5 out of 5">
                      <span aria-hidden="true">★★★★★</span>
                      <small>Top rated</small>
                    </div>
                    <div className="mobile-product-price">
                      <strong>₹{phone.price.toLocaleString("en-IN")}</strong>
                      <del>₹{phone.oldPrice.toLocaleString("en-IN")}</del>
                    </div>
                    <button
                      type="button"
                      className="mobile-product-button"
                      onClick={() => {
                        onAddToCart(phone);
                        navigate("/cart");
                      }}
                    >
                      Add to cart <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="mobile-empty-state">
                No phones match your search. Try another name or brand.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <Link to="/home" className="home-logo footer-logo">
          📱 Mobi<span className="logo-highlight">Zone</span>
        </Link>
        <p>Your next smartphone starts here.</p>
        <small>© 2026 MobiZone. Demo shopping website.</small>
      </footer>
    </div>
  );
}

export default Mobile;