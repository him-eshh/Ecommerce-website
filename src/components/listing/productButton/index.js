"use client";

import { GlobalContext } from "@/globalcontext"
import { addToCartItem } from "@/services/cart"
import { deleteProduct } from "@/services/product"
import { usePathname, useRouter } from "next/navigation"
import "./temp.css"
import { useContext } from "react"
import { toast } from "react-toastify"

import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

export default function Button({ item, id }) {
    const pathName = usePathname()
    const { setUpdate, user, setcartModel } = useContext(GlobalContext)
    const router = useRouter()

    const isAdminView = pathName.includes('admin-view')

    async function handleAddToCart(getItem) {
        const res = await addToCartItem({ productID: getItem._id, userID: user._id })
        if (res.success) {
            setcartModel(true)
        } else {
            setcartModel(true)
        }
        console.log(res)
    }

    return isAdminView ? (
        <>
            <button
                onClick={() => {
                    setUpdate(item);
                    router.push("/admin-view/new-product");
                }}
                className={`mt-1.5 flex w-full justify-center ${buttondesign.buttonprimary} `}
            >
                Update
            </button>
        </>
    ) : (
        <>
            <button
                onClick={() => handleAddToCart(item)}
                className={`mt-1.5 flex w-full justify-center ${buttondesign.buttonsuccess} `}
            >
                Add To Cart
            </button>
        </>
    );
}
