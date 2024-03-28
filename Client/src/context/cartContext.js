import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cartContent, setCartContent] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [proceed, setProceed] = useState(false);

    const addToCart = (item) => {
        setCartContent(prevCartContent => {
            const newItem = {
                id: item._id,
                name: item.name,
                image: item.image.url,
                unitPrice: item.price,
                numberOfItems: 1,
                grandPrice: item.price, 
            };
            return { ...prevCartContent, [item._id]: newItem };
        });
    }

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    }

    const removeFromCart = (itemId) => {
        setCartContent(prevCartContent => {
            const updatedCartContent = { ...prevCartContent };
            delete updatedCartContent[itemId];
            return updatedCartContent;
        });
    }

    const decrement = (itemId, number) => {
        if(number > 1){
            const updatedItem = { ...cartContent[itemId], numberOfItems: cartContent[itemId].numberOfItems - 1, grandPrice: cartContent[itemId].unitPrice * number };
            const updatedContent = { ...updatedItem, grandPrice: updatedItem.unitPrice * updatedItem.numberOfItems };
                setCartContent({...cartContent, [itemId]: updatedContent})
            } else {
                removeFromCart(itemId); 
            }
};


    const increment = (itemId) => {
        const updatedItem = { ...cartContent[itemId], numberOfItems: cartContent[itemId].numberOfItems + 1};
        const updatedContent = { ...updatedItem, grandPrice: updatedItem.unitPrice * updatedItem.numberOfItems };
            setCartContent({...cartContent, [itemId]: updatedContent})
    }

    const handleOrderSubmit = (user, deliveryAddress) => {
        const orderItems = Object.values(cartContent).map(item => ({
        product: item.name, 
        quantity: item.numberOfItems,
        price: item.grandPrice
    }));
        axios.post("http://localhost:8000/placeOrder", {
        userID: user._id,
        orderItems,
        totalPrice: calculateTot(cartContent),
        deliveryAddress,
        }).then(response => {
            console.log("Order placed successfully:", response.data);
        }).catch(error => {
            console.error("Error placing order:", error);
        });
    }
    const calculateTot = (cartContent) => {
    let total = 0;
    Object.values(cartContent).forEach(item => {
      total += item.grandPrice;
    });
        
    setCartContent({});
    setProceed(false)
    return total;
  };

    return (
        <CartContext.Provider value={{
            cartContent,
            addToCart,
            removeFromCart,
            handleCartClick,
            isCartOpen,
            decrement,
            increment,
            handleOrderSubmit,
            proceed,
            setProceed
        }}>
            {children}
        </CartContext.Provider>
    ); 
}
