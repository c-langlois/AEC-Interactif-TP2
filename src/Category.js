import React from 'react';

const Category = (props) => {
  return (
      <option value={props.name}>{props.name}</option>
  );
};

export default Category;