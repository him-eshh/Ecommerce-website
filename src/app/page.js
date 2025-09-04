'use client';
import { GlobalContext } from "@/globalcontext";
import { getAlladminProduct } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

export default function HomePage() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAlladminProduct();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${design.homePagecontainer}`}>
      <section className="">
        <div className={`grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ${design.homePagesection}`}>
          <div className={`mr-auto place-self-center lg:col-span-7`}>
            <h1 className={`max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl`}>
              Best Kurta Collection
            </h1>
            <p className={`max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl `}>
              Most Authentic and Exquisite, only here
            </p>

            <button
              type="button"
              onClick={() => router.push("/product/all-product")}
              className={`mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white ${buttondesign.buttondefault}`}
            >
              Explore Shop Collection
            </button>
          </div>
          <div className={`hidden lg:mt-0 lg:col-span-5 lg:flex ${admindesign.productcardadmin}`}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFXenJSCe2WKnuWDbxnc0_YkQ9lLI6-6gRQ&usqp=CAU"
              alt="Explore Shop Collection"
            />
          </div>
        </div>
        <div className={`max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 `}>

          <ul className={`grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3 `}>

            <li>
              <div className={`relative block group `}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwzIDqHPronNXEMu2IJYnegilPOBWtZRYEg&usqp=CAU"
                  className={`object-cover w-full aspect-square ${admindesign.productcardadmin}`}
                />
                <div className={`absolute inset-0 flex flex-col items-start justify-end p-6 `}>
                  <h3 className={`text-xxl font-large text-white `}>KURTAS</h3>
                  <button
                    onClick={() => router.push("/product/all-product")}
                    className={`mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white ${buttondesign.buttondefault}`}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </section>
    </main>
  );
}
