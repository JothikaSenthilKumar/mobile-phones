import { Link } from "react-router-dom";
import "./home.css";
import "./cart.css";

function Cart({ cart, onUpdateQuantity }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
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
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart nav-active">
            🛒 <span>Cart ({itemCount})</span>
          </Link>
          <Link to="/login" className="navbar-login">Login</Link>
        </div>
      </header>

      <main className="cart-main">
        <div className="cart-heading">
          <span className="cart-eyebrow">YOUR MOBIZONE BAG</span>
          <h1>Shopping cart</h1>
          <p>{itemCount} {itemCount === 1 ? "item" : "items"} in your cart</p>
        </div>

        {cart.length === 0 ? (
          <section className="cart-empty">
            <span className="cart-empty-icon" aria-hidden="true">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Explore our collection and add a phone to see it here.</p>
            <Link to="/products" className="cart-continue-button">Browse phones</Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Items in your cart">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <span>{item.brand}</span>
                    <h2>{item.name}</h2>
                    <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="cart-item-controls">
                    <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                    <div className="cart-quantity">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <output id={`quantity-${item.id}`}>{item.quantity}</output>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => onUpdateQuantity(item.id, 0)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
              <Link to="/products" className="cart-back-link">← Continue shopping</Link>
            </section>

            <aside className="cart-summary">
              <h2>Order summary</h2>
              <div><span>Subtotal</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div>
              <div><span>Delivery</span><strong>Free</strong></div>
              <div className="cart-total"><span>Total</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div>
              <p>Checkout is not available in this demo.</p>
            </aside>
          </div>
        )}
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

export default Cart;
