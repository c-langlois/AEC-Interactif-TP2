import React, { useState, useEffect } from 'react';
import WishlistAdd from './WishlistAdd';
import './index.css';
//import RecentlyViewedAdd from './RecentlyViewedAdd';

function ProductDetail(props){
  const { id, getSuggestions } = props;
  const [product, setProduct] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);

  const handleAddToWishlist = () => {
    addWishList(product.id, setWishlistItems);
  };

  function getProduct() {
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/products/${id}`)
    .then(response => response.json())
      .then(response => {
        setProduct(response); // Mettez à jour l'état du produit avec les données reçues de l'API
        getSuggestions();
      })
      .catch((error) => console.log('Erreur lors du chargement des données: ', error));
  }
  useEffect(() => {
    getProduct();
  }, [])

  return (
    <div className="conteneurProductDetails">
      <h2 className="titleProductFiche">{product.name}</h2>
      <p className="textDescription" >{product.description}</p>
      <div className="product-image">
        <img className="coffee-img-mini" src={product.image} alt={product.name} />
      </div>
      <div className="sectionSousInfo">
        <p>Type: {product.category?.name}</p>
        <p>Couleur: {product.color?.name}</p>
        <p>Prix: {(product.price / 100).toFixed(2)}$</p>
      </div>
      <button onClick={handleAddToWishlist} id="btnListWish">
        Ajouter à la liste de souhait
      </button>

    </div>
  );
};

export default ProductDetail;

export function addWishList(productId, setWishlistItems) {
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
}