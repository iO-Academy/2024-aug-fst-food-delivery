import ItemInfo from "../ItemInfo";
import OrderQuantityButton from "../OrderQuantityButton";

function MenuItem({ foodItem }) {
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
        <OrderQuantityButton />
      </div>
    </div>
  );
}

export default MenuItem;
