import React from 'react';
import './index.css';

function Header({onPageChange, currentPage, cartLength }) {
  return (
    <header id="heading">
      <div className="navbar-brand d-flex align-items-center">
        <button className="btn-transparent" onClick={() => onPageChange("products")} disabled={currentPage === "products"}>
          <img className="heading-img" src="/images/logoBoutique.png" alt="Ma Boutique"/>
        </button>
      </div>
      <div id="containMenu">
        <button className={`btnMenu ${currentPage === "products" ? 'active' : ''}`} onClick={() => onPageChange("products")} disabled={currentPage === "products"}>
          Boutique
        </button>
        <button className={`btnMenu ${currentPage === "coffee" ? 'active' : ''}`} onClick={() => onPageChange("coffee")} disabled={currentPage === "coffee"}>
          Cafés
        </button>
        <button className={`btnMenu ${currentPage === "wishlist" ? 'active' : ''}`} onClick={() => onPageChange("wishlist")} disabled={currentPage === "wishlist"}>
          Liste de souhaits
        </button>
        <button className={`btnMenu ${currentPage === "cart" ? 'active' : ''}`} onClick={() => onPageChange("cart")} disabled={currentPage === "cart"}>
          Panier ({cartLength})
        </button>
      </div>
    </header>
  );
}

export default Header;