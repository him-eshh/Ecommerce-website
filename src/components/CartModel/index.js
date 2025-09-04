"use client";

import { Fragment, useContext, useEffect } from "react";
import Modal from "../modal";
import { GlobalContext } from "@/globalcontext";
import { deleteItemFromCart, getAllCartItem } from "@/services/cart";
import { toast } from "react-toastify";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";
import { useRouter } from "next/navigation";

export default function CartModels() {
    const {
        cartModel,
        setcartModel,
        cartItems,
        setCartItems,
        user,
        selectedSizes,
        setSelectedSizes,
    } = useContext(GlobalContext);

    const router = useRouter();

    async function extractAllCartItems() {
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
        if (user !== null) extractAllCartItems();
    }, [user]);

    async function handleDeleteCartItem(getCartItemID) {
        const res = await deleteItemFromCart(getCartItemID);

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

            extractAllCartItems();
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    console.log(selectedSizes);
    return (
        <Modal
            showButtons={true}
            show={cartModel}
            setShow={setcartModel}
            mainContent={
                cartItems && cartItems.length ? (
                    <ul role="list" className={`-my-6 divide-y divide-gray-300 ${cartdesign.cartitem}`}>
                        {cartItems.map((cartItem) => (
                            <li key={cartItem.id} className={`flex py-6 }`}>
                                <div className={`h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 `}>
                                    <img
                                        src={cartItem.productID ? cartItem.productID[0].imageUrl : ''}
                                        alt="Cart Item"
                                        className={`h-full w-full object-cover object-center `}
                                    />
                                </div>
                                <div className={`ml-4 flex flex-1 flex-col `}>
                                    <div>
                                        <p className={`mt-1 text-sm text-black `}>
                                            ${cartItem.productID ? cartItem.productID[0].price : ''}
                                        </p>

                                        <div className={`mt-1 text-sm text-black `}>
                                            <h2></h2>
                                            <ul>
                                                {selectedSizes.map(([productID, size]) => (
                                                    <li key={productID}>{` Size: ${size}`}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={`ml-4 flex flex-1 flex-col`}>
                                        <div>
                                            <p className={`mt-1 text-sm text-black `}>
                                                {cartItem.productID ? cartItem.productID[0].name : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`flex flex-1 items-end justify-between text-sm`}>
                                        <button
                                            type="button"
                                            className={`font-medium  text-black sm:order-2 ${buttondesign.buttondanger}`}
                                            onClick={() => handleDeleteCartItem(cartItem._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : null
            }
            buttonComponent={
                <Fragment>
                    <button
                        type="button"
                        onClick={() => {
                            router.push("/cart");
                            setcartModel(false);
                        }}
                        className={`mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide ${buttondesign.cartGoToCartButton}`}
                    >
                        Go To Cart
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            router.push("/checkout");
                            setcartModel(false);
                        }}
                        className={`mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide ${buttondesign.cartCheckoutButton}`}
                    >
                        Checkout
                    </button>
                    <div className={`mt-6 flex justify-center text-center text-sm text-gray-600 ${buttondesign.continueShopping}`}>
                        <button type="button" className={`font-medium text-grey ${buttondesign.continueShoppingButton}`}>
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </div>
                </Fragment>
            }
        />
    );
}
