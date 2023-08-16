import React, {useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import ProductList from './ProductsList';
import Cart from './Cart';
import CoffeePage from './CoffeePage';
import Wishlist from './Wishlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

function App() {
  const [cartLength, setCartLength] = useState(0); 
  const [currentPage, setCurrentPage] = useState("products");  // "products", "coffee", or "cart"

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
      })
      .catch(error => console.log('Erreur lors du chargement des données ', error));
  };
  useEffect(() => {
    fetchCartLength();
  }, []);

  let pageContent;

  if (currentPage === "products") {
    pageContent = <ProductList updateCartLength={updateCartLength} />;

  } else if (currentPage === "wishlist") {
    pageContent = <Wishlist />;

        } else if (currentPage === "coffee") {
          pageContent = <CoffeePage />;          
  } else if (currentPage === "cart") {
    pageContent = <Cart onCartLength={updateCartLength} />;
  }

  return (
    <div>
      <Header onPageChange={handlePageChange} currentPage={currentPage} cartLength={cartLength}/>
      {pageContent}
    </div>
  );
}

export default App;