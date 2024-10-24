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

  const hasValue = (obj, value) => Object.values(obj).includes(value);

  function addToBasket(index, count) {
    setBasketItems([...basketItems, { index: index, count: count }]);

    console.log(basketItems);
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
      <div className="flex">
        <section
          className={`mt-4 w-full px-4 grid items-start grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
            currentId && "xl:grid-cols-6"
          } gap-8`}
        >
          {renderContent()}
        </section>
        <div className="h-100 bg-slate-500 w-1/3">
          {basketItems.map((item, index) => {
            return (
              <div className="flex justify-between">
                <p>{item.index}</p>
                <OrderQuantityButton count={item.count} />
              </div>
            );
          })}
        </div>
      </div>
      <footer className="p-4 border-t-2 mt-4 mx-4">
        <p>© Copyright iO Academy 2024</p>
      </footer>
    </>
  );
}

export default App;
