import React from 'react';

const Color = (props) => {
  return (
      <option value={props.name}>{props.name}</option>
  );
};

export default Color;
