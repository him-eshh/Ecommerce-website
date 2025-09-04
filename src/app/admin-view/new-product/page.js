"use client";
import React, { useEffect, useState, useContext } from "react";
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from "next/navigation";
import Input from "@/components/elements/inputcomponent";
import Tile from "@/components/elements/tilecomponent";
import { GlobalContext } from "@/globalcontext";
import { addProduct, updateProduct } from "@/services/product";
import { AvailableSize, adminAddProductformControl, firebaseConfig, firebaseStroage } from "@/app/utils";
import design from "@/design/home.module.css";
import accountdesign from "@/design/accountdesign/account.module.css";
import admindesign from "@/design/admindesign/admin.module.css";
import buttondesign from "@/design/buttondesign/button.module.css";
import cartdesign from "@/design/cartdesign/cart.module.css";
import productdesign from "@/design/productdesign/product.module.css";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroage);

const createFilename = (getFile) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 12);

    return `${getFile.name}-${timestamp}-${random}`;
};

async function imageToFirebase(file) {
    const getName = createFilename(file);
    const storageRef = ref(storage, `ecommerce/${getName}`);
    const upload = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        upload.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
                reject(error);
            },
            () => {
                getDownloadURL(upload.snapshot.ref)
                    .then((downloadUrl) => resolve(downloadUrl))
                    .catch((error) => reject(error));
            }
        );
    });
}

const initialState = {
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
    sizes: [],
    deliveryInfo: "",
    onSale: "",
    priceDrop: 0,
};

export default function AdminViewAddNewProduct() {
    const [formDatas, setFormDatas] = useState(initialState);
    const { Update, setUpdate } = useContext(GlobalContext);
    console.log(Update);
    const router = useRouter();

    useEffect(() => {
        if (Update !== null) {
            setFormDatas(Update);
        }
    }, [Update]);

    async function handleImages(event) {
        console.log(event.target.files);
        const extractImageURL = await imageToFirebase(event.target.files[0]);
        console.log(extractImageURL);

        if (extractImageURL !== "") {
            setFormDatas({
                ...formDatas,
                imageUrl: extractImageURL,
            });
        }
        console.log(formDatas);
    }

    function handleTileClicks(getCurrentItem) {
        console.log(getCurrentItem);

        let cpySizes = [...formDatas.sizes];
        const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);
        if (index === -1) {
            cpySizes.push(getCurrentItem);
        } else {
            cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
        }
        setFormDatas({
            ...formDatas,
            sizes: cpySizes,
        });
    }

    async function handleAddProducts() {
        const res =
            Update !== null ? await updateProduct(formDatas) : await addProduct(formDatas);
        console.log(res);

        if (res.success) {
            setFormDatas(initialState);
            setUpdate(null);
            setTimeout(() => {
                router.push("/admin-view/all-product");
            }, 1000);
        } else {
            setFormDatas(initialState);
        }
    }

    console.log(formDatas);

    return (
        <div className={`w-full mt-5 mr-0 mb-0 ml-0 relative ${admindesign.statuslabel}`}>
            <div className={`flex flex-col items-start justify-start p-10 bg-black shadow-2x1 rounded-x1 relative ${admindesign.productcard}`}>
                <div className={`w-full mt-6 mr-0 mb-0 ml-0 space-y-8 text-white`}>
                    <input
                        accept="image/"
                        max="100000000"
                        type="file"
                        onChange={handleImages}
                    />
                    <div className={`flex gap-2 flex-col bg-black ${admindesign.statuslabel}`}>
                        <label>Available sizes</label>
                        <Tile selected={formDatas.sizes} onClick={handleTileClicks} data={AvailableSize} />
                    </div>
                    <div className={`w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 text-black`}>
                        {adminAddProductformControl.map((controlItem) =>
                            controlItem.componentType === "input" ? (
                                <Input
                                    key={controlItem.id}
                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    value={formDatas[controlItem.id]}
                                    onChange={(event) =>
                                        setFormDatas({
                                            ...formDatas,
                                            [controlItem.id]: event.target.value,
                                        })
                                    }
                                />
                            ) : null
                        )}
                    </div>
                    <button
                        onClick={handleAddProducts}
                        className={`inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracki ${buttondesign.buttonsuccess}`}
                    >
                        {Update !== null ? "Update product" : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}
