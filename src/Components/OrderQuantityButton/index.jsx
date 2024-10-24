import React, { useState } from "react";

function OrderQuantityButton() {
  let [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    count > 0 && setCount(count - 1);
  }

  return (
    <div>
      <button
        onClick={handleDecrement}
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
  );
}

export default OrderQuantityButton;
