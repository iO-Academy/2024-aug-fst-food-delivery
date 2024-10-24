import { useEffect, useState } from "react";
import RestaurantButton from "./Components/RestaurantButton/index.jsx";
import Hero from "./Components/Hero/index.jsx";
import MenuItems from "./Components/MenuItems/index.jsx";

function App() {
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [currentName, setCurrentName] = useState("");
  
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
      return restaurantInfo.map((restaurant) => {
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
      return restaurantInfo.map((foodItem, index) => {
        return (
          <MenuItems
            key={index}
            foodName={foodItem.foodName}
            foodType={foodItem.foodType}
            calories={foodItem.calories}
            side={foodItem.sideItem}
            price={Number(foodItem.price).toFixed(2)}
          />
        );
      });
    }
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
        {currentId ? (<button onClick={() => setCurrentId(0)} className="text-blue-500 font-bold">{" "} &lt;&lt; Change Restaurant </button>) : (null)}
      </header>
      {renderRestaurantName()}
      <section className={`mt-4 w-full px-4 grid items-start grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${currentId && 'xl:grid-cols-6'} gap-8`}>
        {renderContent()}
      </section>
      <footer className="p-4 border-t-2 mt-4 mx-4">
        <p>© Copyright iO Academy 2024</p>
      </footer>
    </>
  );
}

export default App;
