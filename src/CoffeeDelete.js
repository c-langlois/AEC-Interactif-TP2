import React from 'react';

function CoffeeDelete(props) {
    console.log(props);
    const deleteCoffeeHandler = () => {

        fetch(`https://insta-api-api.0vxq7h.easypanel.host/coffees/${props.coffee.id}`, {
        method: "DELETE"
        })
        .then(response => {
        if (response.ok) {
            props.handleClose();
            props.getCoffee();
        }
        })
        .catch(error => {
        console.error("Erreur lors de la suppression du café:", error);
        });
    };

    return (
        <div className="d-flex align-items-center flex-column gap-3">
            <span className="title-coffee-modal">Effacer un café</span>
            Voulez-vous vraiment effacer le café suivant?
            <img className="coffee-img-mini" src={props.coffee.pictureUrl} alt="Coffee" />
            <div className="coffee-delete-description">
                <div>
                    <span>Nom du café: {props.coffee.name}</span><br/>
                    <span>Description: {props.coffee.description}</span>
                </div>
            </div>
            <div className="coffee-delete-buttons">
                <button id="btnListWish" onClick={deleteCoffeeHandler}>Oui</button>
                <button id="btnListWishDimmed" onClick={props.handleClose}>Non</button>
            </div>
        </div>
    );
}

export default CoffeeDelete;