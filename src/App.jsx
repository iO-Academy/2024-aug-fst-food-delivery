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
      <section
        className={`mt-4 w-full px-4 grid items-start grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
          currentId && "xl:grid-cols-6"
        } gap-8`}
      >
        {renderContent()}
      </section>

      <footer className="p-4 border-t-2 mt-4 mx-4">
        <p>© Copyright iO Academy 2024</p>
      </footer>
    </>
  );
}

export default App;
