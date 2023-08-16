import React, { useState,useEffect } from 'react'
import Category from './Category';

const ProductsCategory = () => {
  
 const [categories,setCategories] = useState([]);
  
  function getCategories() {
      fetch("https://insta-api-api.0vxq7h.easypanel.host/product-categories")
      .then(response => response.json())
      .then(response => {
          setCategories(response);
      });
  }
  useEffect(() => {
      getCategories();
  }, [])

return (
    <> 
      {categories.map((category) => (
        <Category key={category.id} name={category.name}/>
      ))}
    </>

);
};


export default ProductsCategory;