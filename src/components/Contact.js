import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-info-container">
        <h2>Contactez-nous</h2>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>✉️ Notre Email:</h3>
            <p><a href="mailto:fellahimarouane0@gmail.com">fellahimarouane0@gmail.com</a></p>
          </div>

          <div className="contact-item">
            <h3>📞 Notre Téléphone:</h3>
            <p><a href="tel:+212703692986">+212703692986</a></p>
          </div>

          <div className="social-links">
            <h3>Suivez-nous</h3>
            <div className="social-icons">
              <a href="https://www.instagram.com/elecpro" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram social-icon instagram-icon"></i>
              </a>
              <a href="https://www.facebook.com/elecpro" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook social-icon facebook-icon"></i>
              </a>
              <a href="https://wa.me/212123456789" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp social-icon whatsapp-icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
