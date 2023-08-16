import React from 'react';

function CartDeleteAll(props) {

    const deleteHandler = () => {

        fetch(`https://insta-api-api.0vxq7h.easypanel.host/cart/clear`, {
        method: "DELETE"
        })
        .then(response => {
        if (response.ok) {
          props.onQuantityUpdate();
        }
        })
        .catch(error => {
        console.error("Erreur lors de la suppression du produit:", error);
        });
    };

    return (
      <button className="btn-transparent" onClick={deleteHandler}>
        <img src="/icons/trash-can-solid.svg" className="coffee-icon" alt="Trash can" />
      </button>
    );
}

export default CartDeleteAll;