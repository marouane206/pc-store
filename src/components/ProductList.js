import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
import './ProductList.css';

const productsData = [
  { id: 1, designation: "Ordinateur Portable Lenovo IdeaPad 5", price: 8040.55, images: "/images/1.jpg", category: "Ordinateur" },
  { id: 2, designation: "Ordinateur Portable Lenovo ThinkBook 15 Gen 3", price: 6040.55, images: "/images/2.jpg", category: "Ordinateur" },
  { id: 3, designation: "Ordinateur Portable Lenovo ThinkPad E14 Gen 4", price: 11950.55, images: "/images/3.jpg", category: "Ordinateur" },
  { id: 4, designation: "Imprimante A3 Multifonction Jet d'encre HP OfficeJet Pro ", price: 4450.56, images: "/images/4.jpg", category: "Imprimante" },
  { id: 5, designation: "Imprimante Multifonction Laser Monochrome HP LaserJet M141", price: 1970.45, images: "/images/5.jpg", category: "Imprimante" },
  { id: 6, designation: "Epson EcoTank L3250 Imprimante multifonction", price: 1369.78, images: "/images/6.jpg", category: "Imprimante" },
  { id: 7, designation: "Écran 23,8 Full HD Lenovo ThinkVision S24e-20", price: 1456.78, images: "/images/7.jpg", category: "Écran" },
  { id: 8, designation: "Imprimante Multifonction Jet d'encre Canon PIXMA TS3440 ", price: 567.88, images: "/images/8.jpg", category: "Imprimante" },
];

const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [showSortOptions, setShowSortOptions] = useState(false); // Add this line
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = ["Ordinateur", "Imprimante", "Écran", "Souris", "Clavier"];

  const quantities = cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ id: productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ id: productId }));
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setProducts(
      category === "All"
        ? productsData
        : productsData.filter((product) => product.category === category)
    );
  };

  const sortProducts = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "asc") return a.price - b.price;
      if (order === "desc") return b.price - a.price;
      return 0;
    });
    setProducts(sortedProducts);
    setSortOrder(order);
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Menu burger */}
      <div className="burger-menu">
        <button className="burger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        {isMenuOpen && (
          <div className="category-menu">
            <h3>Catégories</h3>
            <div className="category-item">
              <input
                type="radio"
                id="all"
                name="category"
                value="All"
                checked={selectedCategory === "All"}
                onChange={() => filterByCategory("All")}
              />
              <label htmlFor="all">Toutes</label>
            </div>
            {categories.map((category) => (
              <div key={category} className="category-item">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => filterByCategory(category)}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <div className="header">
          <h2>Liste des Produits</h2>
          <div className="filter-container">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)} // Toggle visibility of sort options
              className="filter-button"
            >
              Filtrer par prix <span className="arrow">&#9660;</span>
            </button>
            {showSortOptions && (
              <div className="sort-options">
                <div>
                  <input
                    type="radio"
                    id="none"
                    name="sort"
                    checked={sortOrder === "none"}
                    onChange={() => sortProducts("none")}
                  />
                  <label htmlFor="none">Aucun filtre</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="asc"
                    name="sort"
                    checked={sortOrder === "asc"}
                    onChange={() => sortProducts("asc")}
                  />
                  <label htmlFor="asc">Prix Croissant</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="desc"
                    name="sort"
                    checked={sortOrder === "desc"}
                    onChange={() => sortProducts("desc")}
                  />
                  <label htmlFor="desc">Prix Décroissant</label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.images} alt={product.designation} className="product-image" />
                <h3>{product.designation}</h3>
                <p>{product.price.toFixed(2)} DHS</p>
                {quantities[product.id] ? (
                  <div className="quantity-control">
                    <button onClick={() => handleDecrement(product.id)} className="quantity-button">
                      -
                    </button>
                    <span className="quantity-display">{quantities[product.id]}</span>
                    <button onClick={() => handleIncrement(product.id)} className="quantity-button">
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-button"
                  >
                    Ajouter au panier
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="no-products-message">Ce produit n'est pas disponible pour le moment.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
