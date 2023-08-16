import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import CartDeleteProduct from './CartDeleteProduct.js';
import CartDeleteAll from './CartDeleteAll.js';
import CartProductQuantity from './CartProductQuantity.js';
import './index.css';

function Cart({ onCartLength}) {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    
    const totalPrice = cart.reduce((total, product) => {
      return total + (product.price / 100) * product.quantity;
    }, 0);

    function getCart() {
        fetch("https://insta-api-api.0vxq7h.easypanel.host/cart")
        .then(response => response.json())
        .then(response => {
            setLoading(false);
            setCart(response);
            const total = response.reduce((acc, product) => acc + product.quantity, 0);
            onCartLength(total);
        })
        .catch((error) => console.log('Erreur lors du chargement des données: ', error));
    }
    useEffect(() => {
        getCart();
    }, [])

    const handleQuantityUpdate = () => {
      getCart(); 
    };
    

  return (

    
    <div className="panier">
        <>
          {loading ? (
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <>
            <div className="titlePage">
              <h1>Mon Panier{' '}</h1>
            </div>
              <div className="affPanier">
                {cart.map(product => (
                  <Col productId={product.id} md={4}>
                    <div className="productConteneurCart">
                      <img src={product.image} alt={product.name} className="imageShowCart"/>
                      <div className="card-body">
                      <div className="ficheShowCart">
                      </div>
                        <h4 className="titleProductShow">{product.name} </h4>
                          <p className="card-text">{(product.price / 100).toFixed(2)}$</p>
                      </div>
                        <CartProductQuantity productId={product.id} quantity={product.quantity} onQuantityUpdate={handleQuantityUpdate}/> 
                        <CartDeleteProduct id={product.id} onQuantityUpdate={handleQuantityUpdate}/>
                    </div>
                  </Col>
                ))}
              </div>
              {cart.length === 0 ? 
              <div className='sousTitle'>Le panier est vide.</div>
              :
              <div className="totalCart">
                <h2 style={{ marginRight: '20px' }} >Total: {totalPrice.toFixed(2)}$</h2>
                <CartDeleteAll onQuantityUpdate={handleQuantityUpdate}/>
              </div>
              }
            </>
        
           )}
        </>
    </div>
  );
}

export default Cart;