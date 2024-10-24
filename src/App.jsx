import { useEffect, useState } from "react";
import RestaurantButton from "./Components/RestaurantButton/index.jsx";
import Hero from "./Components/Hero/index.jsx";
import MenuItems from "./Components/MenuItems/index.jsx";
import ReturnButton from "./Components/ReturnButton/index.jsx";
import OrderQuantityButton from "./OrderQuantityButton/index.jsx";

function App() {
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [currentName, setCurrentName] = useState("");

  let xlMediaColumn;
  let basketDisplay;

  if (!currentId) {
    basketDisplay = "hidden";
  }

  if (currentId) {
    xlMediaColumn = "xl:grid-cols-6";
  }

  useEffect(() => {
    if (!currentId) {
      fetch("https://food-delivery-api.dev.io-academy.uk/restaurants")
        .then((response) => response.json())
        .then((data) => {
          setRestaurantInfo(data);
        });
    } else {
      fetch(
        `https://food-delivery-api.dev.io-academy.uk/restaurants/${currentId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRestaurantInfo(data.foodItems);
          setCurrentName(data.restaurant);
        });
    }
  }, [currentId]);

  function renderContent() {
    if (!currentId) {
      return restaurantInfo.map((restaurant) => (
        <RestaurantButton
          key={restaurant.id}
          restaurantName={restaurant.name}
          id={restaurant.id}
          clickHandler={setCurrentId}
        />
      ));
    } else {
      return restaurantInfo.map((foodItem, index) => (
        <MenuItems
          key={index}
          foodName={foodItem.foodName}
          foodType={foodItem.foodType}
          calories={foodItem.calories}
          side={foodItem.sideItem}
          price={Number(foodItem.price).toFixed(2)}
        />
      ));
    }
  }

  function renderReturnButton() {
    return currentId ? (
      <ReturnButton returnClickHandler={setCurrentId} />
    ) : null;
  }

  function renderRestaurantName() {
    if (!currentId) {
      return <Hero currentId={currentId} heroText={"Food. Delivered."} />;
    } else {
      return <Hero currentId={currentId} heroText={currentName} />;
    }
  }

  return (
    <>
      <header className="p-4 text-center shadow-lg md:flex md:justify-between">
        <p>
          <span className="text-cyan-500">Food</span>Delivery
        </p>
        {renderReturnButton()}
      </header>
      {renderRestaurantName()}
      <div className="xl:flex">
        <section
          className={`mt-4 w-full px-4 grid items-start grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${xlMediaColumn} gap-8 border border-red-500`}
        >
          {renderContent()}
        </section>
        <section
          className={`${basketDisplay} fixed bottom-0 h-80 w-full bg-slate-200 p-4 border border-black xl:sticky xl:top-0 xl:w-1/4 xl:mt-4 xl:h-max`}
        >
          <img className="size-10 inline" src="public/basket-icon.svg"></img>
          <h3 className="inline text-blue-500 font-bold text-xl">Order</h3>
          <div className="mt-4 xl:h-96 h-4/6 overflow-y-scroll">
            <OrderQuantityButton />
            <br />
            <OrderQuantityButton />
            <br />
            <OrderQuantityButton />
            <br />
            <OrderQuantityButton />
            <br />
            <OrderQuantityButton />
            <br />
            <OrderQuantityButton />
            <br />
            <OrderQuantityButton />
            <br />
            <OrderQuantityButton />
            <br />
          </div>
        </section>
      </div>
      <footer className="p-4 border-t-2 mt-4 mx-4">
        <p>© Copyright iO Academy 2024</p>
      </footer>
    </>
  );
}

export default App;
