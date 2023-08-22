import React from 'react';

function WishlistAdd({ productId, setWishlistItems }) {
    console.log(productId);
    console.log(setWishlistItems);
    fetch("https://insta-api-api.0vxq7h.easypanel.host/wishlist/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: productId
      })
    })
        .then(response => response.json())
        .then(() => {
            fetch("https://insta-api-api.0vxq7h.easypanel.host/wishlist", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => response.json())
            .then(wishlistData => {
                setWishlistItems(wishlistData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de la wishlist:', error);
            }); 
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout au Wishlist:', error);
        });

    return (
        <>
            Allo
        </>
        )
}

export default WishlistAdd;