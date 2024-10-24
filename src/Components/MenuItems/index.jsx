import ItemInfo from "../ItemInfo";

function MenuItems({ foodName, foodType, calories, price, side }) {
 
  return (
    <div
      id="border"
      className="border border-solid border-black w-full p-5 shadow-xl rounded"
    >
      <h3 id="itemName" className="font-bold text-md">
        {foodName}
      </h3>
      <div id="itemInfo" className="flex flex-wrap pt-2 gap-1">
        {calories && <ItemInfo itemName="calories" itemValue={calories} />}
        {foodType && <ItemInfo itemName="foodType" itemValue={foodType} />}
        {side && <ItemInfo itemName="sideItem" itemValue={side} />}
      </div>
      <div id="priceInfo" className="flex justify-between items-center my-4 xl:my-6">
        <div className="font-bold ">£{price}</div>
        <div className="">
          <button className="bg-blue-500 text-white h-8 w-7 rounded">-</button>
          <span className="font-extrabold text-xs p-2">2</span>
          <button className="bg-blue-500 text-white h-8 w-7 rounded">+</button>
        </div>
      </div>
    </div>
  );
}

export default MenuItems;
