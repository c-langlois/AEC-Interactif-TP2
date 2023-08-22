import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CartAdd from './CartAdd';
import './index.css';

function Products(props) {
  const {id, name, price, image, category, updateCartLength, getSuggestions, promotions, productIdsInCart, productIdsInWishlist} = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const currentProductPromotion = promotions.find(promotion => promotion.productId === id);

  const discountedPrice = currentProductPromotion
    ? price - price * currentProductPromotion.discountPercent
    : price;

    function isInCart() {
      return productIdsInCart.includes(id);
    }

   

  return (
    <div className="productConteneur">
      <img src={image} alt={name} className="cartImage"/>
      <div className="infoFiche">
        <h3 className="card-title">
          {name}
          {isInCart() && <span className="in-cart"> (Dans le panier)</span>}
        </h3>
        <div className="sousInfoFiche">
          {currentProductPromotion ? (
              <div className="price-container">
                <p className="old-price">{price.toFixed(2)}$</p>
                <p className="new-price">{discountedPrice.toFixed(2)}$</p>
              </div>
            ) : (
              <p className="card-text">{price.toFixed(2)}$</p>
            )}
        </div>
        <div className="d-flex justify-content-between align-items-end">
        <CartAdd productId={id} updateCartLength={updateCartLength} />
          
          <div>
            <div>
              <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body><ProductDetail id={id} getSuggestions={getSuggestions} productIdsInWishlist={productIdsInWishlist}/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Fermer
                </Button>
              </Modal.Footer>
              </Modal>
              <Button className="boutonVariable" variant="primary" onClick={handleShow} style={{ backgroundColor: 'chocolate', border: '0px', color: 'white', padding: '10px', borderRadius: '10px' }}>
                Détails
              </Button>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;