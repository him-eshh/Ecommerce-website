"use client";

import Tile from "./productTile";
import Button from "./productButton";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function List({ data }) {
    const router = useRouter();
    const pathName = usePathname();
    const isAdminView = pathName.includes("admin-view");

    return (
        <section className={`bg-black py-12 sm:py-16 ${design.listSection}`}>
            <div className={`mx-auto max-w-screen-x1 px-4 sm:px-6 lg:px-8 ${design.listContainer}`}>
                <div className={`mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16 ${design.listGrid}`}>
                    {data && data.length
                        ? data.map((item) => (
                            <article
                                className={`relative flex flex-col overflow-hidden border cursor-pointer bg-gray ${design.listArticle}`}
                                key={item._id}
                                onClick={() => (isAdminView ? "" : router.push(`/product/${item._id}`))}
                            >
                                <Tile item={item} />
                                <Button item={item} />
                            </article>
                        ))
                        : null}
                </div>
            </div>
        </section>
    );
}
