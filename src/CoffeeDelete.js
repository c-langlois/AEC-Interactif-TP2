import React, { useState } from 'react';

function CoffeeDelete({ getCoffee, handleClose, coffee }) {
  const [commentAdded, setCommentAdded] = useState(false);

  const deleteCoffeeHandler = () => {
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/coffees/${coffee.id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        setCommentAdded(true); 
        setTimeout(() => {
            getCoffee();
        }, 1000)
      }
    })
    .catch(error => {
      console.error("Erreur lors de la suppression du produit:", error);
    });
  };

  return (
    <div className="d-flex align-items-center flex-column gap-3">
      <span className="title-coffee-modal">Effacer un café</span>
      Voulez-vous vraiment effacer le café suivant?
      <img className="coffee-img-mini" src={coffee.pictureUrl} alt="Coffee" />
      <div className="coffee-delete-description">
        <div>
          <span>Nom du café: {coffee.name}</span><br />
          <span>Description: {coffee.description}</span>
        </div>
      </div>
      <div className="coffee-delete-buttons">
        <button id="btnListWish" onClick={deleteCoffeeHandler}>Oui</button>
        <button id="btnListWishDimmed" onClick={handleClose}>Non</button>
      </div>
      <div>{commentAdded && <p>Café supprimé</p>}</div>
    </div>
  );
}

export default CoffeeDelete;