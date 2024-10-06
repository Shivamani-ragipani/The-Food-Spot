import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );

            const updatedItems = [...state.items];

            if (existingCartItemIndex > -1) {
                // Update existing item quantity
                const existingItem = state.items[existingCartItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                // Add new item to cart
                updatedItems.push({ ...action.item, quantity: 1 });
            }

            return { ...state, items: updatedItems };
        }

        case 'REMOVE_ITEM': {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            const existingCartItem = state.items[existingCartItemIndex];

            const updatedItems = [...state.items];

            if (existingCartItem.quantity === 1) {
                // Remove item from cart if quantity is 1
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                // Decrease item quantity
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return { ...state, items: updatedItems };
        }

        case 'CLEAR_CART': {
            const clearct = {...state, items: []};
            return clearct;
        }


        default:
            return state;
    }
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'});
    }

    const cartContext = {
        items: cart.items, 
        addItem,
        removeItem,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children} 
        </CartContext.Provider>
    );
}

export default CartContext;
