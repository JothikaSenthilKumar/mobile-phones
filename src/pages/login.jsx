
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill in all the fields!");
      return;
    }

    alert(isLogin ? "Login successful!" : "Registration successful!");
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <div className="brand">
            <span className="brand-icon">📱</span>
            <h1>MobiZone</h1>
          </div>

          <div className="welcome-content">
            <p className="welcome-tag">YOUR WORLD. YOUR PHONE.</p>
            <h2>
              Find Your
              <br />
              Perfect <span>Phone.</span>
            </h2>
            <p className="welcome-description">
              Discover the latest smartphones, amazing features
              and deals made just for you.
            </p>
          </div>

          <div className="phone-illustration">
            <div className="phone phone-one">
              <div className="camera"></div>
              <div className="phone-screen screen-one"></div>
            </div>
            <div className="phone phone-two">
              <div className="camera"></div>
              <div className="phone-screen screen-two"></div>
            </div>
          </div>

          <p className="left-footer">
            Smart choices start here. ✨
          </p>
        </div>

        <div className="login-right">
          <div className="form-header">
            <p className="small-heading">WELCOME TO MOBIZONE</p>
            <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
            <p>
              {isLogin
                ? "Login to explore the latest smartphones."
                : "Join us and find your next favourite phone."}
            </p>
          </div>

          <div className="form-tabs">
            <button
              type="button"
              className={isLogin ? "tab active" : "tab"}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              type="button"
              className={!isLogin ? "tab active" : "tab"}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="remember-label">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span className="forgot-text">Secure Login</span>
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? "Login to MobiZone →" : "Create Account →"}
            </button>
          </form>

          <div className="form-divider">
            <span>SMARTPHONES MADE SIMPLE</span>
          </div>

          <p className="switch-text">
            {isLogin ? "New to MobiZone?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register now" : "Login here"}
            </button>
          </p>

          <p className="terms">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
