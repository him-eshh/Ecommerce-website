"use client";

import Input from "@/components/elements/inputcomponent";
import { GlobalContext } from "@/globalcontext";
import {
    addAddress,
    deleteAddress,
    fetchAddresses,
    updateAddress,
} from "@/services/address";
import { addNewAddressFormControl } from "../utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

export default function Account() {
    const {
        user,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
    } = useContext(GlobalContext);

    const [showAddress, setShowAddress] = useState(false);
    const [editedAddressId, setEditedAddressId] = useState(null);
    const router = useRouter();

    async function extractAllAddress() {
        const res = await fetchAddresses(user?._id);

        if (res.success) {
            setAddresses(res.data);
        }
    }

    async function handleAddUpdateAddress() {
        const res =
            editedAddressId !== null
                ? await updateAddress({
                    ...addressFormData,
                    _id: editedAddressId,
                })
                : await addAddress({ ...addressFormData, userID: user?._id });

        console.log(res);

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: "",
                city: "",
                country: "",
                postalCode: "",
                address: "",
            });
            extractAllAddress();
            setEditedAddressId(null);
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: "",
                city: "",
                country: "",
                postalCode: "",
                address: "",
            });
        }
    }

    function handleUpdateAddresses(getCurrentAddress) {
        setShowAddress(true);
        setAddressFormData({
            fullName: getCurrentAddress.fullName,
            city: getCurrentAddress.city,
            country: getCurrentAddress.country,
            postalCode: getCurrentAddress.postalCode,
            address: getCurrentAddress.address,
        });
        setEditedAddressId(getCurrentAddress._id);
    }

    async function handleDelete(getCurrentAddressID) {
        const res = await deleteAddress(getCurrentAddressID);

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            extractAllAddress();
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    useEffect(() => {
        if (user !== null) extractAllAddress();
    }, [user]);

    return (
        <section className={`container`}>
            <div className={`mx-auto `}>
                <div className={`shadow ${accountdesign.accountinfo}`}>
                    <div className={`p-6 sm:p-12`}>
                        <div className={`flex flex-col flex-1`}>
                            <h4 className={`text-lg font-semibold text-center md:text-left`}>
                                {user?.name}
                            </h4>
                            <p className={`text-white`}>{user?.email}</p>
                            <p className={`text-white`}>{user?.role}</p>
                        </div>
                        <button
                            onClick={() => router.push("/orders")}
                            className={`mt-5 ${buttondesign.buttonprimary}`}
                        >
                            View Your Orders
                        </button>
                        <div className={`mt-6`}>
                            <h1 className={`font-bold text-white text-lg`}>
                                Your Addresses :
                            </h1>

                            <div className={`mt-4 flex flex-col gap-4`}>
                                {addresses && addresses.length ? (
                                    addresses.map((item) => (
                                        <div
                                            className={`border p-6 text-white ${accountdesign.accountinfo}`}
                                            key={item._id}
                                        >
                                            <p className={`text-white`}>Name : {item.fullName}</p>
                                            <p className={`text-white`}>
                                                Address : {item.address}
                                            </p>
                                            <p className={`text-white `}>City : {item.city}</p>
                                            <p className={`text-white `}>Country : {item.country}</p>
                                            <p className={`text-white `}>
                                                PostalCode : {item.postalCode}
                                            </p>
                                            <button
                                                onClick={() => handleUpdateAddresses(item)}
                                                className={`mt-5 mr-5 ${buttondesign.buttonprimary}`}
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className={`mt-5 ${buttondesign.buttondanger}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className={`text-white`}>
                                        No address found! Please add a new address below
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={`mt-4`}>
                            <button
                                onClick={() => setShowAddress(!showAddress)}
                                className={`mt-5 ${buttondesign.buttonprimary}`}
                            >
                                {showAddress ? "Hide Address Form" : "Add New Address"}
                            </button>
                        </div>
                        {showAddress ? (
                            <div
                                className={`flex flex-col text-black mt-5 justify-center pt-4 items-center ${accountdesign.addressForm}`}
                            >
                                <div className={`w-full mt-6 mr-0 mb-0 ml-0 space-y-8`}>
                                    {addNewAddressFormControl.map((controlItem) => (
                                        <Input
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            value={addressFormData[controlItem.id]}
                                            onChange={(event) =>
                                                setAddressFormData({
                                                    ...addressFormData,
                                                    [controlItem.id]: event.target.value,
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddUpdateAddress}
                                    className={`mt-5 ${buttondesign.buttonprimary}`}
                                >
                                    Save
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
