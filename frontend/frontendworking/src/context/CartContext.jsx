import { createContext, useState } from "react";
import {
    addOrUpdateProduct,
    updateProductQuantity,
    calculateTotal,
    removeProduct,
} from "../components/Tools/cartTools";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => addOrUpdateProduct(prevCart, product));
    };

    const updateQuantity = (productId, amount) => {
        setCart((prevCart) => updateProductQuantity(prevCart, productId, amount));
    };

    const clearCart = () => {
        setCart([]); 
    };

    const total = calculateTotal(cart);

    const removeFromCart = (productId) => {
        setCart((prevCart) => removeProduct(prevCart, productId));
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateQuantity, clearCart, total, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
