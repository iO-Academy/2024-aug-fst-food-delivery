import ItemInfo from "../ItemInfo";
import React, { useState } from "react";


function MenuItem({ foodItem }) {
  

  let [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    count > 0 && setCount(count - 1);
  }

  
 

  return (
    <div
      id="border"
      className="border border-solid border-black w-full p-5 shadow-xl rounded"
    >
      <h3 id="itemName" className="font-bold text-md">
        {foodItem.foodName}
      </h3>
      <div id="itemInfo" className="flex flex-wrap pt-2 gap-1">
        {foodItem.calories && (
          <ItemInfo itemName="calories" itemValue={foodItem.calories} />
        )}
        {foodItem.foodType && (
          <ItemInfo itemName="foodType" itemValue={foodItem.foodType} />
        )}
        {foodItem.sideItem && (
          <ItemInfo itemName="sideItem" itemValue={foodItem.sideItem} />
        )}
      </div>
      <div
        id="priceInfo"
        className="flex justify-between items-center my-4 xl:my-6"
      >
        <div className="font-bold ">£{foodItem.price}</div>
        <div>
          <button
          
            onClick={ handleDecrement}
            className="bg-blue-500 text-white h-8 w-7 rounded"
          >
            -
          </button>
          <span className="font-extrabold text-xs p-2">{count}</span>
          <button
            
            onClick={handleIncrement}
            className="bg-blue-500 text-white h-8 w-7 rounded"
          >
            +
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default MenuItem;
