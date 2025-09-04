"use client";

import { GlobalContext } from "@/globalcontext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { addToCartItem } from "@/services/cart";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

export default function Details(props) {
    const { item } = props;

    console.log(item, "item");
    const {
        selectedSizes,
        setSelectedSizes,
        user,
        setcartModel,
    } = useContext(GlobalContext);

    async function handleAddToCart(getItem) {
        const res = await addToCartItem({
            productID: getItem && getItem._id,
            userID: user && user._id,
            size: selectedSizes.find((entry) => entry[0] === getItem._id)?.[1], // Get selected size
        });

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

            setcartModel(true);
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

            setcartModel(true);
        }
    }

    const handleSizeSelection = (size) => {
        setSelectedSizes((prevSelectedSizes) => {
            // Find if the product ID already exists in the selectedSizes array
            const productIndex = prevSelectedSizes.findIndex((entry) => entry[0] === item._id);

            if (productIndex !== -1) {
                // If the product ID exists, update the size for that product
                prevSelectedSizes[productIndex][1] = size;
                return [...prevSelectedSizes];
            } else {
                // If the product ID doesn't exist, add a new entry with the product ID and size
                return [...prevSelectedSizes, [item._id, size]];
            }
        });
    };

    console.log(selectedSizes);

    return (
        <section className={`mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 `}>
            <div className={`container mx-auto px-4 `}>
                <div className={`lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16 ${design.detailsGrid}`}>
                    <div className={`lg:col-span-3 lg:row-end-1 `}>
                        <div>
                            {item && item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    className={`${design.detailsImage}`}
                                    alt="Product Details"
                                />
                            )}
                        </div>
                    </div>
                    <div className={`lg:col-span-2 lg:row-span-2 lg:row-end-2 `}>
                        <h1 className={`text-2xl font-bold `}>
                            {item && item.name}
                        </h1>
                        <div className={`mt-10 flex flex-col items-center justify-between `}>
                            <div className={`flex items-end `}>
                                ${item && item.price}
                            </div>

                            <div className={`flex flex-row items-start lg:flex-col `}>
                                <button
                                    type="button"
                                    onClick={() => handleSizeSelection('S')}
                                    className={`flex-0 aspect-square mb-3 ${buttondesign.buttondefault} `}
                                >
                                    S
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSizeSelection('M')}
                                    className={`flex-0 aspect-square mb-3 ${buttondesign.buttondefault} `}
                                >
                                    M
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSizeSelection('L')}
                                    className={`flex-0 aspect-square mb-3 ${buttondesign.buttondefault} `}
                                >
                                    L
                                </button>

                            </div>
                            <button
                                type="button"
                                onClick={() => handleAddToCart(item)}
                                className={`mt-1.5 inline-block ${buttondesign.buttonsuccess} `}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <ul className={`mt-8 space-y-2 `}>
                            <li className={`flex items-center text-left text-sm font-medium text-gray-600 ${design.detailsInfoItem}`}>
                                {item && item.deliveryInfo}
                            </li>
                            <li className={`flex items-center text-left text-sm font-medium text-gray-600 ${design.detailsInfoItem}`}>
                                Cancel anytime
                            </li>
                        </ul>
                        <div className={`lg:col-span-3 `}>
                            <div className={`border-b border-gray-400 `}>
                                <nav className={`flex gap-4 `}>
                                    <a
                                        href="#"
                                        className={`border-b-2 border-gray-900 py-4 text-sm font-medium `}
                                    >
                                        Description
                                    </a>
                                </nav>
                            </div>
                            <div className={`mt-8 flow-root sm:mt-12 bg-black text-white `}>
                                {item && item.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
