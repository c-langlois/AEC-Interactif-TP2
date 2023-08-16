import React, { useEffect, useState } from 'react';
import Products from "./Products";
import ProductCategories from './ProductCategories';
import ProductColors from './ProductColors';
import './index.css';
import RecentlyViewedList from './RecentlyViewedList';


function ProductList({ updateCartLength }) {
  const [nothingFound, setNothingFound] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [loading, setLoading] = useState(true);

  function getProducts() {
      fetch("https://insta-api-api.0vxq7h.easypanel.host/products")
      .then(response => response.json())
      .then(response => {
          setLoading(false);
          setProducts(response);
          getSuggestions();
      });
  }
  useEffect(() => {
      getProducts();
  }, [])

  function getSuggestions() {
    fetch("https://insta-api-api.0vxq7h.easypanel.host/suggestions/recently-viewed-products")
    .then(response => response.json())
    .then(response => {
        setSuggestions(response);
    });
  }
  useEffect(() => {
      getSuggestions();
  }, [])

  const filteredProducts = products.filter(product => {

    let categoryMatch = product.category?.name === selectedCategory;
    let colorMatch = product.color.name === selectedColor;
    let priceMatch = true;

    if (selectedCategory === 'All') {
      categoryMatch = true;
    }

    if (selectedColor === 'All') {
      colorMatch = true;
    }

    if (selectedPrice === "0-9") {
      priceMatch = product.price >= 0 && product.price <= 999;
    } else if (selectedPrice === "10-99") {
      priceMatch = product.price >= 1000 && product.price <= 9999;
    } else if (selectedPrice === "100+") {
      priceMatch = product.price >= 10000;
    } 

    return categoryMatch && colorMatch && priceMatch;
  });

  const handleSearch = (e) => {
    e.preventDefault();

    const foundProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(foundProducts);

    if (foundProducts.length === 0) {
      setNothingFound('La recherche n\'a rien trouvé.');
    }
  };

  return (
    <div className="product-list">
      <div className="titlePage">
        <h1>Bienvenue à notre boutique</h1>
      </div>
      <div className="search-n-sort">
        <div className="menuSelector">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="inputStyle"
              name="search"
              placeholder="Recherche"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="resetButton" type="submit">Recherche</button>
          </form>
        </div>
        <div className="menuSelector right-side">
          <select className="inputStyle" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">Catégories</option>
            <ProductCategories/>
          </select>

          <select className="inputStyle" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="All">Couleurs</option>
            <ProductColors/>
          </select>

          <select className="inputStyle" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
            <option value="All">Prix</option>
            <option value="0-9">0-9</option>
            <option value="10-99">10-99</option>
            <option value="100+">100 et plus</option>
          </select>

          <button className="resetButton" onClick={() => {
            setSelectedCategory('All');
            setSelectedColor('All');
            setSelectedPrice('All');
          }}>Réinitialisez</button>
        </div>
      </div>
      <div className="search-result-empty">{nothingFound}</div>
      <div id="shopConteneur">
        {loading ? 
          <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div> : null}
          {searchResults.length === 0 ?
            filteredProducts.map((product) => (
              <Products className="productConteneur"
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price/100}
                image={product.image}
                category={product.category?.name}
                color={product.color.name}
                updateCartLength={updateCartLength}
                getSuggestions={getSuggestions} 
              />
            )) : 
            searchResults.map((product) => (
              <Products className="productConteneur"
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price/100}
                image={product.image}
                category={product.category?.name}
                color={product.color.name}
                updateCartLength={updateCartLength}
                getSuggestions={getSuggestions} 
              />
            ))
          }
      </div>
      <div className="items-recently-viewed">{suggestions.length !== 0 ? "Items vus récements" : ""}</div>
      <div className="items-recently-viewed">
        
          <RecentlyViewedList suggestions={suggestions} getSuggestions={getSuggestions} />
  
      </div>
    </div>

  );
};

export default ProductList;

