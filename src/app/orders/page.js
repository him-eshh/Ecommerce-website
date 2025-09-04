"use client";

import { GlobalContext } from "@/globalcontext";
import { getAllOrderUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";
import { toast } from "react-toastify";

export default function Orders() {
    const {
        user,
        allOrdersForUser,
        setAllOrdersForUser,
    } = useContext(GlobalContext);

    const router = useRouter();

    async function extractAllOrder() {
        const res = await getAllOrderUser(user?._id);

        if (res && res.success) {
            setAllOrdersForUser(res.data);
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.error(res && res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    useEffect(() => {
        if (user !== null) extractAllOrder();
    }, [user]);

    return (
        <section className={`mx-auto px-4 sm:px-6 lg:px-8 ${admindesign.productcardadmin}`}>
            <div className={`mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8`}>
                <div>
                    <div className={`px-4 py-6 sm:px-8 sm:py-10 ${admindesign.adminorderinfo}`}>
                        <div className={`flow-root `}>
                            {allOrdersForUser && allOrdersForUser.length ? (
                                <ul className={`flex flex-col gap-4 `}>
                                    {allOrdersForUser.map((item) => (
                                        <li
                                            key={item._id}
                                            className={`bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left `}
                                        >
                                            <div className={`flex `}>
                                                <h1 className={` text-lg mb-3 flex-1 text-black`}>
                                                    #order: {item._id}
                                                </h1>
                                                <div className={`flex items-center `}>
                                                    <p className={`mr-3 text-sm font-medium text-gray-900 `}>
                                                        Total paid amount
                                                    </p>
                                                    <p className={`mr-3 text-2xl font-semibold text-gray-900 `}>
                                                        ${item.totalPrice}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`flex gap-2 `}>
                                                {item.orderItems.map((orderItem, index) => (
                                                    <div key={index} className={`shrink-0 `}>
                                                        <img
                                                            alt="Order Item"
                                                            className={`h-24 w-24 max-w-full rounded-lg object-cover `}
                                                            src={
                                                                orderItem &&
                                                                orderItem.product &&
                                                                orderItem.product.imageUrl
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={`flex gap-5 ${admindesign.orderstatus}`}>
                                                <button className={`disabled:opacity-50 mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide ${admindesign.completedstatus}`}>
                                                    {item.isProcessing
                                                        ? "Order is Processing"
                                                        : "Order is delivered"}
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/orders/${item._id}`)}
                                                    className={`mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide ${buttondesign.buttonsuccess}`}
                                                >
                                                    View Order Details
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
