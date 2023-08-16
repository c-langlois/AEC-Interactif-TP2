import React, { useState,useEffect } from 'react'
import Color from './Color';

const ProductColors = () => {
  
 const [colors,setColors] = useState([]);
  
  function getColors() {
      fetch("https://insta-api-api.0vxq7h.easypanel.host/product-colors")
      .then(response => response.json())
      .then(response => {
          setColors(response);
      });
  }
  useEffect(() => {
      getColors();
  }, [])

return (
    <> 
      {colors.map((color) => (
        <Color key={color.id} name={color.name}/>
      ))}
    </>

);
};

export default ProductColors;