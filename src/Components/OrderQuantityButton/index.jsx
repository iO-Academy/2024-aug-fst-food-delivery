import React, { useState } from "react";

function OrderQuantityButton( { basket, setBasket, foodItem } ) {

  function handleIncrement() {
    const found = basket.filter((item) => item.name !== foodItem.foodName)
    if(found) {
      let match = basket.filter((item) => item.name == foodItem.foodName)
      let updatedItem = match.length > 0 && match[0]
      if(match.length > 0 ) {
      updatedItem.count += 1
        setBasket([...found, updatedItem])
      } else {
        setBasket([...basket, {name: foodItem.foodName, count: 1}])
      }
    }
  }

  function handleDecrement() {
    const found = basket.filter((item) => item.name !== foodItem.foodName)
    if(found) {
      let match = basket.filter((item) => item.name == foodItem.foodName)
      let updatedItem = match.length > 0 && match[0]
      if(match.length > 0 ) {
        if(updatedItem.count === 1) {
          setBasket([...found])
        } else {
          updatedItem.count -= 1
          setBasket([...found, updatedItem])
        }
      } else {
        setBasket([...basket, {name: foodItem.foodName, count: 1}])
      }
    }
  }
  

  return (
    <div>
      <button
      onClick={handleDecrement}
        className="bg-blue-500 text-white h-8 w-7 rounded"
      >
        -
      </button>
      <span className="font-extrabold text-xs p-2"></span>
      <button
        onClick={handleIncrement}
        className="bg-blue-500 text-white h-8 w-7 rounded"
      >
        +
      </button>
    </div>
  );
}

export default OrderQuantityButton;
