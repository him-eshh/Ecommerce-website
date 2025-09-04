'use client';
import { GlobalContext } from "@/globalcontext";
import { style } from "@/app/utils";
import { adminNavOption, navOption } from "@/app/utils";
import { Fragment, useContext, useEffect } from "react";
import Modal from "../modal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModels from "../CartModel";

import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

function Item({ isModalView = false, isAdminView, router }) {
    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">
            <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md-border-0 `}>
                {isAdminView
                    ? adminNavOption.map((item) => (
                        <li
                            className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 `}
                            key={item.id}
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </li>
                    ))
                    : navOption.map((item) => (
                        <li
                            className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 `}
                            key={item.id}
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default function Bar() {
    const { showNavModal, setShowNavModal } = useContext(GlobalContext);
    const { user, isAuthUser, setIsAuthUser, setUser, Update, setUpdate } = useContext(GlobalContext);
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (pathName !== '/admin-view/add-product' && Update !== null)
            setUpdate(null);
    }, [pathName]);

    function handleLogout() {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove('token');
        localStorage.clear();
        router.push('/');
    }

    const isAdminView = pathName.includes('admin-view');

    return (
        <>
            <nav className={`bg-gray fixed w-full z-20 top-0 left-0 border-b border-gray-200 ${design.navBar}`}>
                <div className={`max-w-screen-x1 flex flex-wrap items-center justify-between mx-auto p-4 ${design.navContainer}`}>
                    <div onClick={() => router.push('/')} className={`flex items-center cursor-pointer ${design.logo}`}>
                        <span className={`self-center text-2xl font-semibold whitespace-nowrap ${design.logoText}`}>
                            Lihimsu
                        </span>
                    </div>
                    <div className={`flex md:order-2 gap-10 ${design.navButtons}`}>
                        {!isAdminView && isAuthUser ? (
                            <Fragment>
                                <button onClick={() => router.push('/account')} className={buttondesign.buttonprimary}>Account</button>
                                <button onClick={() => router.push('/cart')} className={buttondesign.buttonprimary}>Cart</button>
                            </Fragment>
                        ) : null}
                        {user?.role === 'admin' ? (
                            isAdminView ? (
                                <button
                                    className={`${style.button} ${design.clientViewButton}`}
                                    onClick={() => router.push("/")}
                                >
                                    Client View
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push("/admin-view")}
                                    className={`${style.button} ${design.adminViewButton}`}
                                >
                                    Admin View
                                </button>
                            )
                        ) : null}
                        {isAuthUser ? (
                            <button onClick={handleLogout} className={buttondesign.buttondefault}>Logout</button>
                        ) : (
                            <button onClick={() => router.push('/login')} className={buttondesign.buttondefault}>Login</button>
                        )}
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className={`inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${design.menuButton}`}
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={() => setShowNavModal(true)}
                        >
                            <span className={`${design.menuIcon}`}>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <Item router={router} isAdminView={isAdminView} />
                </div>
            </nav>
            <Modal
                showModalTitle={false}
                mainContent={<Item router={router} isModalView={true} isAdminView={isAdminView} />}
                show={showNavModal}
                setShow={setShowNavModal}
            />
            {CartModels && <CartModels />}
        </>
    );
}
