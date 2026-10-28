
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Mobile from "./pages/mobile.jsx";
import Contact from "./pages/contact.jsx";
import Brand from "./pages/brand.jsx";
import Cart from "./pages/cart.jsx";
import Chatbot from "./components/Chatbot.jsx";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(phone) {
    setCart((currentCart) => {
      const existingPhone = currentCart.find((item) => item.id === phone.id);
      if (existingPhone) {
        return currentCart.map((item) =>
          item.id === phone.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...phone, quantity: 1 }];
    });
  }

  function updateQuantity(phoneId, quantity) {
    setCart((currentCart) =>
      currentCart
        .map((item) => (item.id === phoneId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Mobile onAddToCart={addToCart} />} />
        <Route path="/brands" element={<Brand />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} onUpdateQuantity={updateQuantity} />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
