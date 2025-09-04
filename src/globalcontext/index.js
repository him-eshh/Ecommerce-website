'use client';


import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";



export const GlobalContext = createContext(null);




export default function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false)
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [Update, setUpdate] = useState(null);
    const [cartModel, setCartModel] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [checkoutFormData, setCheckoutFormData] = useState([])
    const [addresses, setAddresses] = useState([]);
    const [addressFormData, setAddressFormData] = useState({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
    });



    const [allOrdersForUser, setAllOrdersForUser] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState([]);


    useEffect(() => {
        console.log(Cookies.get('token'))
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData)
        } else {
            setIsAuthUser(false)
        }
    }, [Cookies])



    return (
        <GlobalContext.Provider value={{
            showNavModal, setShowNavModal, isAuthUser, setIsAuthUser, user, setUser, Update, setUpdate,
            cartModel, setcartModel: setCartModel, cartItems, setCartItems, addresses,
            setAddresses,
            addressFormData,
            setAddressFormData,

            allOrdersForUser,
            setAllOrdersForUser,
            orderDetails,
            setOrderDetails,
            allOrdersForAllUsers,
            setAllOrdersForAllUsers,
            checkoutFormData,
            setCheckoutFormData,
            selectedSizes, setSelectedSizes, selectedQuantity, setSelectedQuantity,

        }}>{children}</GlobalContext.Provider>
    )
}