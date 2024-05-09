import React from 'react';

function Button({ name, action }) {

  const execute = () => {
    action();
  };

  return (
    <button onClick={execute}>{name}</button>
  )
}

export default Button