import React from 'react';

function CartDeleteProduct(props) {
    const { id } = props;

    const deleteProductHandler = () => {

        fetch(`https://insta-api-api.0vxq7h.easypanel.host/cart/remove-product/${id}`, {
        method: "DELETE"
        })
        .then(response => {
          props.onQuantityUpdate();
        })
        .catch(error => {
        console.error("Erreur lors de la suppression du produit:", error);
        });
    };

    return (
      <button className="btnDeleteSimple" onClick={deleteProductHandler}>
        <img src="/icons/trash-can-solid.svg" className="coffee-icon" alt="Trash can" />
      </button>
    );
}

export default CartDeleteProduct;