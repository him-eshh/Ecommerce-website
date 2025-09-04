"use client";

import { GlobalContext } from "@/globalcontext";
import { fetchAddresses } from "@/services/address";
import { createOrderService } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";
import { toast } from "react-toastify";

export default function Checkout() {
    const {
        cartItems,
        user,
        addresses,
        setAddresses,
        checkoutFormData,
        setCheckoutFormData,
        selectedSizes,
        setSelectedSizes,
    } = useContext(GlobalContext);
    const [selectAddress, setSelectAddress] = useState(null);
    const [orderProcessing, setOrderProcessing] = useState(false);
    const [orderSuccessStatus, setOrderSuccessStatus] = useState(false);

    const router = useRouter();
    const params = useSearchParams();

    const publishableKey =
        "pk_test_51O1T2PSGEz2eTAijHxbADwzXPTBpVph8UtoMqHHWX6cpsfCNofEJLDHvg23SdE2ggbqtbdxy8SoUMrI17YR0UCkS00OesN7S2p";
    const stripePromise = loadStripe(publishableKey);

    useEffect(() => {
        async function getAllAddress() {
            const res = await fetchAddresses(user?._id);

            if (res.success) {
                setAddresses(res.data);
            }
        }

        if (user !== null) getAllAddress();
    }, [user]);

    useEffect(() => {
        async function processOrder() {
            const isStripe = JSON.parse(localStorage.getItem("stripe"));

            if (
                isStripe &&
                params.get("status") === "success" &&
                cartItems &&
                cartItems.length > 0
            ) {
                setOrderProcessing(true);
                const getCheckoutData = JSON.parse(
                    localStorage.getItem("checkoutFormData")
                );

                const createFinalCheckoutData = {
                    user: user?._id,
                    shippingAddress: getCheckoutData.shippingAddress,
                    orderItems: cartItems.map((item) => ({
                        qty: 1,
                        product: item.productID[0]._id, // Fixed the property name
                    })),
                    paymentMethod: "Stripe",
                    totalPrice: cartItems.reduce(
                        (total, item) => item.productID[0].price + total,
                        0
                    ),
                    isPaid: true,
                    isProcessing: true,
                    paidAt: new Date(),
                };

                createOrder(createFinalCheckoutData); // Call the function without "await"
            }
        }

        processOrder();
    }, [params.get("status"), cartItems]);

    async function createOrder(createFinalCheckoutData) {
        const res = await createOrderService(createFinalCheckoutData);

        if (res.success) {
            setOrderProcessing(false);
            setOrderSuccessStatus(true);
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            setOrderProcessing(false);
            setOrderSuccessStatus(false);
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    function handleSelectedAddresses(getAddress) {
        if (getAddress._id === selectAddress) {
            setSelectAddress(null);
            setCheckoutFormData({
                ...checkoutFormData,
                shippingAddress: {},
            });

            return;
        }

        setSelectAddress(getAddress._id);
        setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {
                ...checkoutFormData.shippingAddress,
                fullName: getAddress.fullName,
                city: getAddress.city,
                country: getAddress.country,
                postalCode: getAddress.postalCode,
                address: getAddress.address,
            },
        });
    }

    async function handleCheckoutData() {
        const stripe = await stripePromise;

        const createLineItems = cartItems
            .map((item) => {
                const unit_amount = item.productID[0].price * 100;

                if (isNaN(unit_amount) || !isFinite(unit_amount)) {
                    console.error(
                        `Invalid unit_amount for item ${item.productID[0].name}`
                    );
                    return null;
                }

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            images: [item.productID[0].imageUrl],
                            name: item.productID[0].name,
                        },
                        unit_amount,
                    },
                    quantity: 1,
                };
            })
            .filter(Boolean);

        const res = await callStripeSession(createLineItems);
        setOrderProcessing(true);
        localStorage.setItem("stripe", true);
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

        const { error } = await stripe.redirectToCheckout({
            sessionId: res.id,
        });

        console.log(error);
    }
    useEffect(() => {
        if (orderSuccessStatus) {
            setTimeout(() => {
                setOrderSuccessStatus(false);
                router.push("/orders");
            }, 2000); // Removed unnecessary array around 2000
        }
    }, [orderSuccessStatus]);

    if (orderSuccessStatus) {
        return (
            <section className="h-screen bg-gray-200">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                                <h1 className="font-bold text-lg">
                                    Your payment is successful, and you will be redirected to the
                                    orders page in 2 seconds!
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="font-medium text-xl">Cart Summary</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
                        {cartItems && cartItems.length ? (
                            cartItems.map((item) => (
                                <div
                                    className="flex flex-col rounded-lg bg-black sm:flex-row"
                                    key={item.productID[0]._id}
                                >
                                    <img
                                        src={item && item.productID[0] && item.productID[0].imageUrl}
                                        alt="Cart Item"
                                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                    />
                                    <div className="flex w-full flex-col text-gray px-4 py-4">
                                        <span className="font-bold">
                                            {item && item.productID && item.productID[0].name}
                                        </span>
                                        <span className="font-semibold text-gray">
                                            {item && item.productID && item.productID[0].price}
                                        </span>
                                        <span className="mt-1 text-sm text-black">
                                            <ul>
                                                {selectedSizes.map(([productID, size]) => (
                                                    <li key={productID}>{` Size: ${size}`}</li>
                                                ))}
                                            </ul>
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Your cart is empty</div>
                        )}
                    </div>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Shipping address details</p>
                    <p className="text-gray-400 font-bold">
                        Complete your order by selecting the address below
                    </p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6 text-black">
                        {addresses && addresses.length ? (
                            addresses.map((item) => (
                                <div
                                    onClick={() => handleSelectedAddresses(item)}
                                    key={item._id}
                                    className={`border p-6 ${item._id === selectAddress ? "border-red-900" : ""
                                        }`}
                                >
                                    <p>Name : {item.fullName}</p>
                                    <p>Address : {item.address}</p>
                                    <p>City : {item.city}</p>
                                    <p>Country : {item.country}</p>
                                    <p>PostalCode : {item.postalCode}</p>
                                    <button className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                        {item._id === selectAddress
                                            ? "Selected Address"
                                            : "Select Address"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No addresses added</p>
                        )}
                    </div>
                    <button
                        onClick={() => router.push("/account")}
                        className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    >
                        Add new address
                    </button>
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                            <p className="text-lg font-bold text-gray-900">
                                $
                                {cartItems && cartItems.length
                                    ? cartItems.reduce(
                                        (total, item) => item.productID[0].price + total,
                                        0
                                    )
                                    : "0"}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Shipping</p>
                            <p className="text-lg font-bold text-gray-900">Free</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-lg font-bold text-gray-900">
                                $
                                {cartItems && cartItems.length
                                    ? cartItems.reduce(
                                        (total, item) => item.productID[0].price + total,
                                        0
                                    )
                                    : "0"}
                            </p>
                        </div>
                        <div className="pb-10">
                            <button
                                // disabled={
                                //     (cartItems && cartItems.length === 0) ||
                                //     Object.keys(checkoutFormData.shippingAddress).length === 0
                                // }
                                onClick={handleCheckoutData}
                                className="disabled:opacity-50 mt-5 mr-5 w-full  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
