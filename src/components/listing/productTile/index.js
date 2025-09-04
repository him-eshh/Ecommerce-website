"use client";

import { useRouter } from "next/navigation"
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

export default function Tile({ item }) {
    const router = useRouter()

    return (

        <div onClick={() => router.push(`/product/${item._id}`)}>
            <div className={`${productdesign.productcontainer}`}>
                <div className={`${admindesign.productcardadmin}`}>
                    <div className={`${productdesign.productcard}`}>
                        <div className={`overflow-hidden aspect-w-1 aspect-h-1 h-52 `}>
                            <img
                                src={item.imageUrl}
                                alt="Product Image"
                                className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-125`}
                            />
                        </div>
                        {item.onSale === "yes" && (
                            <div className={`absolute top-0 m-2 rounded-full `}>
                                <p className={`rounded-full p-1 text-[8px] font-bold uppercase tracking-wide `}>
                                    Sale
                                </p>
                            </div>
                        )}
                        <div className={`my-4 mx-auto flex w-10/12 flex-col items-start justify-between `}>
                            <div className={`mb-2 flex `}>
                                <p className={`mr-3 text-sm text-white font-semibold ${item.onSale === 'yes' ? 'line-through' : ''}`}>
                                    {`$ ${item.price}`}
                                </p>
                                {item.onSale === 'yes' && (
                                    <>
                                        <p className={`mr-3 text-sm font-semibold text-red-900 `}>
                                            {`$ ${(item.price - item.price * (item.priceDrop / 100)).toFixed(2)}`}
                                        </p>
                                        <p className={`mr-3 text-sm font-semibold`}>
                                            {`-(${item.priceDrop}) off`}
                                        </p>
                                    </>
                                )}
                            </div>
                            <h3 className={`md-2 text-gray-400 text-sm `}>
                                {item.name}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
