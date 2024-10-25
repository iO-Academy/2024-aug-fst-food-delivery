import { createContext, useState, useContext } from 'react';

const BasketContext = createContext();

// {
//   restaurantId1: {
//     foodItemName1: 1,
//     foodItemName2: 2,
//   },
//   restaurantId2: {
//      foodItemName1: 5
//   },

//   4: {
//      "Six inch Black Forest Ham": 1,
//      "something else": 2,
//   }
// }

const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState({});
    console.log(basket);
    

    function addMenuItem(updatingRestaurantId, updatingMenuItemName) {
        setBasket((prevBasket) => {
            // Copy the previous state
            const newBasket = { ...prevBasket };
    

            if (!newBasket[updatingRestaurantId]) {
                newBasket[updatingRestaurantId] = {};
            }
    

            if (!newBasket[updatingRestaurantId][updatingMenuItemName]) {
                newBasket[updatingRestaurantId][updatingMenuItemName] = 0;
            }
    

            newBasket[updatingRestaurantId][updatingMenuItemName] += 1;
    
            return newBasket;
        });
    }

    // function decreaseMenuItem(restaurantIndex, menuItemIndex) {
    //     // setBasket({...})
    // }

    return (
        <BasketContext.Provider value={{ basket, addMenuItem }}>
            {children}
        </BasketContext.Provider>
    );
};



function useBasket () {
    return useContext(BasketContext);
}

export { BasketContext, BasketProvider, useBasket };




