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
    const [basket, setBasket] = useState('basket value');
    

    function addMenuItem(updatingRestaurantId, updatingMenuItemName) {
        // const newBasket = {
        //     ...basket, // All the previous restaurant details
        //     [restaurantId]: {
        //         ...basket[restaurantId],
        //         [menuItemName]: basket[restaurantId][menuItemName] + 1
        //     }
        // };

        const newBasket = {};
        for (const restaurantId in basket) {
            newBasket[restaurantId] = basket[restaurantId];

            if (restaurantId === updatingRestaurantId) {
                const oldMenuItems = basket[restaurantId];
                for (const menuItemName in oldMenuItems) {
                    newBasket[restaurantId][menuItemName] = basket[restaurantId][menuItemName];

                    if (menuItemName === updatingMenuItemName) {
                        newBasket[restaurantId][menuItemName] =
                            basket[restaurantId][menuItemName] + 1;
                    }
                }
            }
        }

        setBasket(newBasket);
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




