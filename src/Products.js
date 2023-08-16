import React, { useState } from 'react';
import ProductDetail from './ProductDetail';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CartAdd from './CartAdd';
import './index.css';

function Product(props) {
  const {id, name, price, image, category, updateCartLength, getSuggestions } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  
  return (
    <div className="productConteneur">
      <img src={image} alt={name} className="cartImage"/>
      <div className="infoFiche">
        <h3 className="card-title">{name}</h3>
        <div className="sousInfoFiche">
            <p className="card-text">{price.toFixed(2)}$</p>
        </div>
        <div className="d-flex justify-content-between align-items-end">
        <CartAdd productId={id} updateCartLength={updateCartLength}/>
          
          <div>
            <div>
              <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body><ProductDetail id={id} getSuggestions={getSuggestions}/></Modal.Body>
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

export default Product;