import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation
import ShoppingCartAPI from "../API/ShoppingCartAPI";

const CartContext = createContext();

const listPathName =["/login", "/register", "/forgot-password", "/verifyOTP-forgot-password", "/reset-password"];
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [shoppingCartQuantity, setShoppingCartQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const location = useLocation();  // Get the current route location
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchShoppingCartQuantity = async () => {
        try {
            setLoading(true);
            const response = await ShoppingCartAPI.GetShoppingCart();
            if (response.data.success) {
                const totalQuantity = response.data.shoppingcart.products.reduce((acc, item) => acc + item.quantity, 0);
                setShoppingCartQuantity(totalQuantity);
            } else {
                console.error('No products returned or incorrect data structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching shopping cart:', error);
        } finally {
            setLoading(false);
        }
    };


    // Only fetch shopping cart quantity if not on login or register pages
    useEffect(() => {
        if (user && !loading && !listPathName.includes(location.pathname)) {
            fetchShoppingCartQuantity();
        }
    }, [user, location, loading]);

    return (
        <CartContext.Provider value={{ shoppingCartQuantity, fetchShoppingCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
