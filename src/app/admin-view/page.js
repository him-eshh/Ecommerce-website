"use client";

import { GlobalContext } from "@/globalcontext";
import { getAllOrdersAllUsers, updateStatusOrder } from "@/services/order";
import { useContext, useEffect } from "react";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";
export default function AdminView() {
    const {
        allOrdersForAllUsers,
        setAllOrdersForAllUsers,
        user,

    } = useContext(GlobalContext);

    async function extractAllOrdersForAllUser() {
        const res = await getAllOrdersAllUsers();

        console.log(res);

        if (res && res.success) {
            setAllOrdersForAllUsers(
                res.data && res.data.length
                    ? res.data.filter((item) => item.user._id !== user._id)
                    : []
            );
        }
    }

    useEffect(() => {
        if (user !== null) extractAllOrdersForAllUser();
    }, [user]);

    console.log(allOrdersForAllUsers);

    async function handleUpdateOrdersStatus(getItem) {
        const res = await updateStatusOrder({
            ...getItem,
            isProcessing: false,
        });

        if (res.success) {
            extractAllOrdersForAllUser();
        } else {
            setComponentLevelLoader({ loading: true, id: "" });
        }
    }

    return (
        <section>
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${admindesign.adminorderinfo}`}>
                <div>
                    <div className={`px-4 py-6 sm:px-8 sm:py-10 ${admindesign.orderstatus}`}>
                        <div className={`flow-root ${admindesign.orderstatus}`}>
                            {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                                <ul className="flex flex-col gap-4">
                                    {allOrdersForAllUsers.map((item) => (
                                        <li
                                            key={item._id}
                                            className={`${admindesign.adminorderinfoh2} bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left`}
                                        >
                                            <div className="flex">
                                                <h1 className="font-bold text-lg mb-3 flex-1 text-black">
                                                    #order: {item._id}
                                                </h1>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-black">
                                                            User Name :
                                                        </p>
                                                        <p className="text-sm font-semibold text-black">
                                                            {item?.user?.name}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-black">
                                                            User Email :
                                                        </p>
                                                        <p className="text-sm font-semibold text-black">
                                                            {item?.user?.email}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-black">
                                                            User Address :
                                                        </p>
                                                        <div className="text-sm font-semibold text-black">
                                                            {/* Check if shippingAddress exists before trying to access its properties */}
                                                            {item?.shippingAddress && (
                                                                <>
                                                                    <p>{item.shippingAddress.fullName}</p>
                                                                    <p>{item.shippingAddress.address}</p>
                                                                    <p>{item.shippingAddress.city}</p>
                                                                    <p>{item.shippingAddress.country}</p>
                                                                    <p>{item.shippingAddress.postalCode}</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-gray-900">
                                                            Total Paid Amount :
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            ${item?.totalPrice}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {item.orderItems.map((orderItem, index) => (
                                                    <div key={index} className="shrink-0">
                                                        <img
                                                            alt="Order Item"
                                                            className={` h-24 w-24 max-w-full rounded-lg object-cover`}
                                                            src={
                                                                orderItem &&
                                                                orderItem.product &&
                                                                orderItem.product.imageUrl
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-5">
                                                <button className={`mt-5 mr-5 ${admindesign.completedstatus}`}>
                                                    {item.isProcessing
                                                        ? "Order is On The Way"
                                                        : "Order is delivered"}
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateOrdersStatus(item)}
                                                    disabled={!item.isProcessing}
                                                    className={`mt-5 mr-5 ${admindesign.updatestatusbtn}`}
                                                >
                                                    Update Order Status
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
