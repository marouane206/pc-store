import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CartButton.css';

const CartButton = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const distinctItemsCount = cartItems.length;

  return (
    <div className="cart-button">
      <Link to="/cart">
        <span className="cart-icon">🛒 Panier</span>
        {distinctItemsCount > 0 && (
          <span className="badge">{distinctItemsCount}</span>
        )}
      </Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </Link>
        <h1 className="title">ELEC-PRO</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
      <CartButton />
    </div>
  );
};

export { Navbar, CartButton };
