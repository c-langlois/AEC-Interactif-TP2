import React from 'react';

function CartProductQuantity(props) {
    const { productId, quantity } = props;
  
    const updateQuantity = (increment) => {
      const newQuantity = increment ? quantity + 1 : quantity - 1;
  
      const productData = {
        quantity: newQuantity
      };

      fetch(`https://insta-api-api.0vxq7h.easypanel.host/cart/modify-product-quantity/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
      })
        
        .then(response => {
          props.onQuantityUpdate();
        })
        .catch(error => {
        console.error("Erreur lors de la modification de quantité:", error);
        });
    };

    return (
        <div className="quantity-selector d-flex">
          <button className="btnIncrement" onClick={() => updateQuantity(false)}><img className="img-button-plus-minus" src="/images/minus-solid.svg" alt="minus"/></button>
          <p className="quantity-text quantity-width text-center">{quantity}</p>
          <button className="btnIncrement" onClick={() => updateQuantity(true)}><img className="img-button-plus-minus" src="/images/plus-solid.svg" alt="minus"/></button>
        </div>



    );
}

export default CartProductQuantity;