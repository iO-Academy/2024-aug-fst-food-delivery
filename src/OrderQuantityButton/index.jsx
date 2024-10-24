function OrderQuantityButton() {
  return (
    <div className="flex justify-between border border-solid border-black items-center">
    <h3 id="itemName" className="font-bold text-md">Chicken Sandwich</h3>
    <div className="border border-solid border-black">
      <button className=" bg-blue-500 text-white h-8 w-7 rounded">-</button>
      <span className="font-extrabold text-xs p-2">2</span>
      <button className="bg-blue-500 text-white h-8 w-7 rounded">+</button>
      </div>
    </div>
  );
}

export default OrderQuantityButton;
