// src/components/CartPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decrementQuantity, incrementQuantity, clearCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.price || 0;  // Valeur par défaut si price est undefined
    const quantity = item.quantity || 0;  // Valeur par défaut si quantity est undefined
    return total + price * quantity;
  }, 0);

  const handleRemove = (item) => {
    setItemToRemove(item);
    setIsDialogOpen(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove.id));
    }
    setIsDialogOpen(false);
    setItemToRemove(null);
  };

  const cancelRemove = () => {
    setIsDialogOpen(false);
    setItemToRemove(null);
  };

  return (
    <div>
      <h2>Votre Panier</h2>
      {cartItems.length === 0 ? (
        <div style={emptyCartContainerStyle}>
          <div style={emptyCartMessageStyle}>
            <h3>Votre panier est vide</h3>
            <p style={emptyCartTextStyle}>Il semble que vous n'ayez rien ajouté à votre panier.</p>
            <Link to="/" className="redirect-button">
              Retourner à la boutique
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <ul style={listStyles}>
            {cartItems.map((item) => (
              <li key={item.id} style={itemStyles}>
                <img src={item.images} alt={item.designation} style={imageStyles} />
                <div style={infoStyles}>
                  <h3 style={titleStyles}>{item.designation}</h3>
                  <p>Prix : {item.price.toFixed(2)} DHS</p>
                  <div style={quantityContainerStyles}>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch(decrementQuantity({ id: item.id }));
                        } else {
                          handleRemove(item);
                        }
                      }}
                      style={buttonStyle}
                    >
                      -
                    </button>
                    <span style={quantityStyles}>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity({ id: item.id }))}
                      style={buttonStyle}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => handleRemove(item)} style={removeButtonStyle}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          <h3>Total : {totalAmount.toFixed(2)} DHS</h3>
          <button
            onClick={() => dispatch(clearCart())}
            style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
          >
            Vider le panier
          </button>
        </div>
      )}

      {isDialogOpen && (
        <div style={dialogOverlayStyle}>
          <div style={dialogStyle}>
            <p>
              Êtes-vous sûr de vouloir supprimer {itemToRemove?.designation} ?
            </p>
            <div style={dialogButtonsStyle}>
              <button
                onClick={confirmRemove}
                style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
              >
                Oui
              </button>
              <button onClick={cancelRemove} style={buttonStyle}>
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const listStyles = {
  listStyleType: 'none',
  padding: 0,
};

const itemStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  borderBottom: '1px solid #ddd',
  paddingBottom: '10px',
};

const imageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginRight: '20px',
};

const infoStyles = {
  flex: 1,
};

const titleStyles = {
  fontSize: '18px',
  margin: '0 0 10px',
};

const quantityContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
};

const quantityStyles = {
  margin: '0 10px',
  fontSize: '18px',
  fontWeight: 'bold',
};

const buttonStyle = {
  padding: '5px 10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  cursor: 'pointer',
};

const removeButtonStyle = {
  marginLeft: '20px',
  padding: '5px 10px',
  borderRadius: '5px',
  border: '1px solid #ff0000',
  backgroundColor: '#ffcccc',
  color: '#ff0000',
  cursor: 'pointer',
  fontSize: '14px',
};

const emptyCartContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '10px',
};

const emptyCartMessageStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '100%',
  maxWidth: '500px',
};

const emptyCartTextStyle = {
  fontSize: '16px',
  color: '#555',
  marginBottom: '20px',
};

const dialogOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const dialogStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const dialogButtonsStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-around',
};
export default CartPage;
