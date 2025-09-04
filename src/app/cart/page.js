"use client";

import Carts from "@/components/Cart";
import { GlobalContext } from "@/globalcontext";
import { deleteItemFromCart, getAllCartItem } from "@/services/cart";
import { useContext, useEffect } from "react";

import { toast } from "react-toastify";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

export default function Cart() {
    const { user, setCartItems, cartItems } = useContext(GlobalContext);

    async function extractAllCartItem() {
        const res = await getAllCartItem(user?._id);

        if (res.success) {
            const updatedData =
                res.data && res.data.length
                    ? res.data.map((item) => ({
                        ...item,
                        productID: {
                            ...item.productID,
                            price:
                                item.productID.onSale === "yes"
                                    ? parseInt(
                                        (
                                            item.productID.price -
                                            item.productID.price * (item.productID.priceDrop / 100)
                                        ).toFixed(2)
                                    )
                                    : item.productID.price,
                        },
                    }))
                    : [];
            setCartItems(updatedData);

            localStorage.setItem("cartItems", JSON.stringify(updatedData));
        }

        console.log(res);
    }

    useEffect(() => {
        if (user !== null) extractAllCartItem();
    }, [user]);

    async function handleDeleteCartItems(getCartItemID) {
        const res = await deleteItemFromCart(getCartItemID);

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

            extractAllCartItem();
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return (
        <Carts
            handleDeleteCartItem={handleDeleteCartItems}
            cartItems={cartItems}
        />
    );
}
