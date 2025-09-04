"use client";

import Input from "@/components/elements/inputcomponent";
import { loginFormControl } from "../utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react';
import { Login } from "@/services/login";
import { GlobalContext } from "@/globalcontext";
import Cookies from "js-cookie";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

const initialData = {
    email: "",
    password: ""
}

export default function LoginPage() {
    const [data, setData] = useState(initialData);
    const { isAuthUser, setIsAuthUser, user, setUser } = useContext(GlobalContext);
    const router = useRouter();
    console.log(data);

    function isValidFormData() {
        return data && data.email && data.email.trim() !== ''
            && data.password && data.password.trim() !== '';
    }

    async function handleLogin1() {
        const response = await Login(data);

        console.log(response);
        if (response.success) {
            setIsAuthUser(true);
            setUser(response?.finalData?.user);
            setData(initialData);
            Cookies.set("token", response?.finalData?.token);
            localStorage.setItem("user", JSON.stringify(response?.finalData?.user));
        } else {
            setIsAuthUser(false);
        }
    }

    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser]);

    return (
        <div className={`bg-gray relative `}>
            <div className={`flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto max-w-7x1 x1:px-5 lg:flex-row ${design.loginContainer}`}>
                <div className={`flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row `}>
                    <div className={`w-full mt-10 mr-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12 `}>
                        <div className={`flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2x1 rounded-x1 relative z-10 ${design.loginCard}`}>
                            <p className={`text-3xl font-semibold text-center text-black `}>
                                login
                            </p>
                            <div className={`w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 text-black `}>
                                {loginFormControl.map((controlItem) =>
                                    controlItem.componentType === "input" ? (
                                        <Input
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            options={controlItem.options}
                                            value={data[controlItem.id]}
                                            onChange={(event) =>
                                                setData({
                                                    ...data,
                                                    [controlItem.id]: event.target.value
                                                })}
                                        />
                                    ) : null
                                )}
                                <button
                                    className={`disabled:opacity-70 items-center justify-center bg-black px-4 py-2 text-lg 
                                        text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide ${buttondesign.buttonprimary}`}
                                    disabled={!isValidFormData()}
                                    onClick={handleLogin1}
                                >
                                    login
                                </button>
                                <div className={`flex flex-col gap-2 text-black`}>
                                    <p>New to Website?</p>
                                    <button
                                        className={`items-center justify-center bg-black px-4 py-2 text-lg 
                                        text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide ${buttondesign.buttondefault}`}
                                        onClick={() => router.push("/register")}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
