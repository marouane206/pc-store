import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import cartReducer from './redux/slices/cartSlice';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import { Navbar } from './components/CartButton';
import Contact from './components/Contact';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />  {/* Include Navbar here */}

        <main style={mainStyles}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
          </Routes>
        </main>
      </Router>
    </Provider>
  );
};

const mainStyles = {
  padding: '20px',
};

export default App;
