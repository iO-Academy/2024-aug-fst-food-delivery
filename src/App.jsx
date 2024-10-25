import { useEffect, useState } from "react";
import RestaurantButton from "./Components/RestaurantButton/index.jsx";
import Hero from "./Components/Hero/index.jsx";
import MenuItem from "./Components/MenuItem/index.jsx";
import OrderQuantityButton from "./Components/OrderQuantityButton/index.jsx";

function App() {
  const [restaurantMenuItems, setRestaurantMenuItems] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  let basketDisplay;

  if (!currentId) {
    basketDisplay = "hidden";
  }

  useEffect(() => {
    if (!currentId) {
      fetch("https://food-delivery-api.dev.io-academy.uk/restaurants")
        .then((response) => response.json())
        .then((data) => {
          setRestaurants(data);
        });
    } else {
      fetch(
        `https://food-delivery-api.dev.io-academy.uk/restaurants/${currentId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRestaurantMenuItems(data.foodItems);
          setRestaurantName(data.restaurant);
        });
    }
  }, [currentId]);

  function addToBasket(index, count) {
    let newBasket = basketItems.filter((obj) => obj.index !== index);
    setBasketItems([...newBasket, { index: index, count: count + 1 }]);
  }

  function removeFromBasket(index, count) {
    let newBasket = basketItems.filter((obj) => obj.index !== index);
    let clamped = count <= 0 ? 0 : count - 1;

    count <= 0
      ? setBasketItems([...newBasket])
      : setBasketItems([...newBasket, { index: index, count: clamped }]);
  }

  function renderContent() {
    if (!currentId) {
      return restaurants.map((restaurant) => {
        return (
          <RestaurantButton
            key={restaurant.id}
            restaurantName={restaurant.name}
            setCurrentId={() => {
              setCurrentId(restaurant.id);
            }}
          />
        );
      });
    } else {
      return restaurantMenuItems?.map((foodItem, index) => {
        return (
          <MenuItem
            key={index}
            foodItem={foodItem}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            index={index}
          />
        );
      });
    }
  }

  return (
    <>
      <header className="p-4 text-center shadow-lg md:flex md:justify-between">
        <p>
          <span className="text-cyan-500">Food</span>Delivery
        </p>
        {currentId ? (
          <button
            onClick={() => {
              setCurrentId(0), setRestaurantName("");
            }}
            className="text-blue-500 font-bold"
          >
            &lt;&lt; Change Restaurant{" "}
          </button>
        ) : null}
      </header>
      <Hero text={restaurantName} />
      <div className="xl:flex">
        <section
          className={`mt-4 w-full px-4 grid items-start grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
            currentId && "xl:grid-cols-5"
          } gap-8`}
        >
          {renderContent()}
        </section>
        <section
          className={`${basketDisplay} fixed bottom-0 h-80 w-full bg-slate-200 p-4 xl:sticky xl:top-0 xl:w-1/4 xl:mt-4 xl:h-max`}
        >
          <img className="size-10 inline" src="public/basket-icon.svg"></img>
          <h3 className="inline text-blue-500 font-bold text-xl">Order</h3>
          <div className="mt-4 xl:h-96 h-4/6 overflow-y-scroll">
            {basketItems.map((item) => {
              return (
                <div className="flex justify-between">
                  <p>{item.index}</p>

                  <OrderQuantityButton count={item.count} />
                </div>
              );
            })}
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
