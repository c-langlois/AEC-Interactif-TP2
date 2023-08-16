import React, { useState } from 'react';
import './index.css';

function CartAdd({ productId, updateCartLength }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        const productData = {
            productId: productId,
            quantity: quantity
        };
        fetch("https://insta-api-api.0vxq7h.easypanel.host/cart/add-product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(() => {
        
          updateCartLength((length) => length + quantity);
        })
        .catch((error) => console.log('Erreur lors de la création des données: ', error));
    }
    return (
        <div>
        <div className="quantityStteing">
          <button className="btnIncrement" onClick={handleDecrement}><img className="img-button-plus-minus" src="/images/minus-solid.svg" alt="minus"/></button>
              <p className="conteneurQte">{quantity}</p>
          <button className="btnIncrement" onClick={handleIncrement}><img className="img-button-plus-minus" src="/images/plus-solid.svg" alt="minus"/></button>
        </div>
        <button className="bntIndex" onClick={handleSubmit}>Ajouter au panier</button>
      </div>
    )
}

export default CartAdd;