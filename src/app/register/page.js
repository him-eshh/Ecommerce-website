"use client";

import { registrationFormControl } from "../utils";
import Input from "@/components/elements/inputcomponent";
import { registerUser } from "@/services/register";
import { GlobalContext } from "@/globalcontext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

const initialState = {
    name: "",
    email: "",
    password: "",
    role: "customer"
};

export default function Register() {
    const [data, setdata] = useState(initialState);
    const [isRegister, setIsRegister] = useState(false);
    const { isAuthUser } = useContext(GlobalContext);
    const router = useRouter();

    function FormValidData() {
        return (
            data &&
            data.name &&
            data.name.trim() !== "" &&
            data.email &&
            data.email.trim() !== "" &&
            data.password &&
            data.password.trim() !== ""
        );
    }

    async function handleRegisterOnClick() {
        const response = await registerUser(data);

        if (response.success) {
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsRegister(true);
            setdata(initialState);
        } else {
            toast.error(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setdata(initialState);
        }
    }

    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser]);

    return (
        <div className={`bg-gray relative `}>
            <div className={`flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto max-w-7x1 x1:px-5 lg:flex-row `}>
                <div className={`flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row `}>
                    <div className={`w-full mt-10 mr-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12 `}>
                        <div className={`flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2x1 rounded-x1 relative z-10 `}>
                            <p className={`text-3xl font-semibold text-center text-black `}>
                                {isRegister ? "Registration Successful" : "Register your Account"}
                            </p>
                            {isRegister ? (
                                <button
                                    className={`items-center justify-center bg-white px-4 py-2 text-lg 
                                    text-black transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide ${buttondesign.buttonprimary}`}
                                    onClick={() => router.push('/login')}
                                >
                                    Login
                                </button>
                            ) : (
                                <div className={`w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 text-black `}>
                                    {registrationFormControl.map((controlItem) =>
                                        controlItem.componentType === "input" ? (
                                            <Input
                                                key={controlItem.id}
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                label={controlItem.label}
                                                options={controlItem.options}
                                                onChange={(event) =>
                                                    setdata({
                                                        ...data,
                                                        [controlItem.id]: event.target.value,
                                                    })
                                                }
                                                value={data[controlItem.id]}
                                            />
                                        ) : null
                                    )}
                                    <button
                                        className={`disabled:opacity-70 items-center justify-center bg-black px-4 py-2 text-lg 
                                        text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide ${buttondesign.buttonprimary}`}
                                        disabled={!FormValidData()}
                                        onClick={handleRegisterOnClick}
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
