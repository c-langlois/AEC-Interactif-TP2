import React, {useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import ProductList from './ProductsList';
import Cart from './Cart';
import CoffeePage from './CoffeePage';
import Wishlist from './Wishlist';
import CheckoutForm from './CheckoutForm';
/* 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
); */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

);

function App() {
  const [cartLength, setCartLength] = useState(0); 
  const [currentPage, setCurrentPage] = useState("products"); 
  const [promotions, setPromotions] = useState([]);
  const [productIdsInCart, setProductIdsInCart] = useState([]);
  const [productIdsInWishlist, setProductIdsInWishlist] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateCartLength = (length) => {
    setCartLength(length); 
  };

  const fetchCartLength = () => {
    fetch("https://insta-api-api.0vxq7h.easypanel.host/cart")
      .then(response => response.json())
      .then(response => {
        const total = response.reduce((acc, product) => acc + product.quantity, 0);
        setCartLength(total);
        const ids = response.map(product => product.id);
          setProductIdsInCart(ids);
      })
      .catch(error => console.log('Erreur lors du chargement des données ', error));
  };
  useEffect(() => {
    fetchCartLength();
  }, []);

  const fetchWishlist = () => {
    fetch("https://insta-api-api.0vxq7h.easypanel.host/wishlist", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(response => {
          const ids = response.map(product => product.id);
          setProductIdsInWishlist(ids);
          setWishlistItems(response);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la wishlist:', error);
        });
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  function getPromotions() {
    fetch("https://insta-api-api.0vxq7h.easypanel.host/promotions")
    .then(response => response.json())
    .then(response => {
      setPromotions(response);

    });
  }
  useEffect(() => {
    getPromotions();
  }, [])

  let pageContent;


  if (currentPage === "products") {
    pageContent = <ProductList getWishlist={fetchWishlist} updateCartLength={updateCartLength} promotions={promotions} productIdsInCart={productIdsInCart} productIdsInWishlist={productIdsInWishlist} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems}/>;
  } else if (currentPage === "wishlist") {
    pageContent = <Wishlist getWishlist={fetchWishlist} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />;
  } else if (currentPage === "coffee") {
    pageContent = <CoffeePage />;          
  } else if (currentPage === "cart") {
    pageContent = <Cart onCartLength={updateCartLength} setProductIdsInCart={setProductIdsInCart}/>;
  } else if (currentPage === "checkOut") {
    pageContent = <CheckoutForm cartLength={cartLength}/>;
  }

  return (
    <div>
      <Header onPageChange={handlePageChange} currentPage={currentPage} cartLength={cartLength} />
      {pageContent}
    </div>
  );
}

export default App;