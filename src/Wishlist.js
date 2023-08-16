import React, { useState, useEffect } from 'react';
import './wishlist.css';
import { deleteProduct } from './wishlistDelete';
import Category from './Category';

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        fetch("https://insta-api-api.0vxq7h.easypanel.host/wishlist", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(wishlistData => {
            //console.log("Éléments de la wishlist :", wishlistData);
            setWishlistItems(wishlistData);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la wishlist:', error);
        });
    }, []);

    function formatPrice(price) {
        const formattedPrice = (price / 100).toLocaleString("en-CA", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return formattedPrice;
    }

    function deleteAll() {
      fetch("https://insta-api-api.0vxq7h.easypanel.host/wishlist/clear", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
      })
      .then(response => response.json())
      .then(() => {
          // Mettre à jour la liste de souhaits pour qu'elle soit vide
          setWishlistItems([]);
      })
      .catch(error => {
          console.error('Erreur lors de la suppression de tous les produits:', error);
      });
  }

    return (
        <div id="mainConteneur">
            <div className="titlePage">
                <h1>Ma belle liste de souhaits</h1>
            </div>
            {wishlistItems.length === 0 ? 
            <div className='sousTitle'>
                La liste de souhait est vide.    
            </div>
            :
            <div className='sousTitle'>
                <button id="suppAllBt" onClick={deleteAll}>Supprimer toute ma liste</button>
            </div>
            }
           
            <div id="wishConteneur">
                {wishlistItems.map(item => (
                    <div id="productConteneur" key={item.id}>
                        <img className="imageWishlist" src={item.image} alt={item.name} />
                        <h3 className="productName">{item.name}</h3>
                        <div className="productSousDescr">
                            <span className="productPrice">Prix: {formatPrice(item.price)}$</span>
                            <span className="productPrice">{Category(item.category)}</span>
                        </div>    
                        
                        <button  className="suppBt" onClick={() => deleteProduct(item.id, wishlistItems, setWishlistItems)}>
                            Retirer ce produit de ma liste
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
