"use client";

import { GlobalContext } from "@/globalcontext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

export default function Carts({
    cartItems = [],
    handleDeleteCartItem,
}) {
    const { selectedSizes, setSelectedSizes } = useContext(GlobalContext);
    const router = useRouter();

    return (
        <section className={`h-screen `}>
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 `}>
                <div className={`mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 `}>
                    <div className={`shadow`}>
                        <div className={`px-4 py-6 sm:px-8 sm:py-10 `}>
                            <div className={`flow-root `}>
                                {cartItems && cartItems.length ? (
                                    <ul className={`-my-8 ${cartdesign.cartitem}`}>
                                        {cartItems.map((cartItem) => (
                                            <li
                                                className={`flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 `}
                                                key={cartItem._id}
                                            >
                                                <div className={`shrink-0 `}>
                                                    <img
                                                        src={cartItem.productID ? cartItem.productID[0].imageUrl : ''}
                                                        alt="Product image"
                                                        className={`h-24 w-25 max-w-full rounded-lg object-cover ${cartdesign.cartImage}`}
                                                    />
                                                </div>
                                                <div className={`flex flex-1 flex-col justify-between `}>
                                                    <div className={`sm:col-gap-5 sm:grid sm:grid-cols-2 `}>
                                                        <div className={`pr-8 sm:pr-4 `}>
                                                            <p className={`text-base font-semibold `}>
                                                                {cartItem.productID ? cartItem.productID[0].name : ''}
                                                            </p>
                                                        </div>
                                                        <div className={`mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end `}>
                                                            <p className={`shrink-0 w-20 text-base font-semibold text-black sm:order-1 sm:ml-8 sm:text-right `}>
                                                                ${cartItem.productID ? cartItem.productID[0].price : ''}
                                                            </p>
                                                            <div className={`mt-1 text-sm text-black `}>

                                                                <ul>
                                                                    {selectedSizes.map(([productID, size]) => (
                                                                        <li key={productID}>{` Size: ${size}`}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className={`font-medium text-yellow-700 sm:order-2 ${buttondesign.buttondanger}`}
                                                                onClick={() =>
                                                                    handleDeleteCartItem(cartItem._id)
                                                                }
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <h1 className={`font-bold text-lg ${cartdesign.cartEmptyMessage}`}>
                                        Your cart is Empty!
                                    </h1>
                                )}
                            </div>
                            <div className={`mt-6 border-t border-b py-2 ${cartdesign.cartTotalSection}`}>
                                <div className={`flex items-center justify-between ${cartdesign.cartTotalItem}`}>
                                    <p className={`text-sm text-gray-400 ${cartdesign.cartTotalLabel}`}>Subtotal</p>
                                    <p className={`text-lg text-grey font-semibold ${cartdesign.cartTotalAmount}`}>
                                        ${cartItems && cartItems.length
                                            ? cartItems.reduce(
                                                (total, item) => item.productID[0].price + total,
                                                0
                                            )
                                            : 0}
                                    </p>
                                </div>
                                <div className={`flex items-center justify-between ${cartdesign.cartTotalItem}`}>
                                    <p className={`text-sm text-gray-400 ${cartdesign.cartTotalLabel}`}>Shipping</p>
                                    <p className={`text-lg text-grey font-semibold ${cartdesign.cartTotalAmount}`}>$0</p>
                                </div>
                                <div className={`flex items-center justify-between ${cartdesign.cartTotalItem}`}>
                                    <p className={`text-sm text-gray-400 ${cartdesign.cartTotalLabel}`}>Total</p>
                                    <p className={`text-lg text-grey font-semibold ${cartdesign.cartTotalAmount}`}>
                                        ${cartItems && cartItems.length
                                            ? cartItems.reduce(
                                                (total, item) => item.productID[0].price + total,
                                                0
                                            )
                                            : 0}
                                    </p>
                                </div>
                                <div className={`mt-5 text-center ${cartdesign.cartCheckoutButton}`}>
                                    <button
                                        onClick={() => router.push('/checkout')}
                                        className={`group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide ${buttondesign.cartCheckoutButton}`}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
