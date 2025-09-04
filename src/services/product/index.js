// add new product

import Cookies from "js-cookie";

export const addProduct = async (formData) => {
    try {
        const response = await fetch('/api/admin/new-product', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getAlladminProduct = async () => {
    console.log("kkk")
    try {
        const response = await fetch("http://localhost:3000/api/admin/all-product", {
            method: "GET",
            cache: "no-store",

        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = async (formData) => {
    try {
        const response = await fetch("/api/admin/update-product", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            cache: "no-store",
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await fetch(`/api/admin/delete-product?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const ProductById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/product-by-id?id=${id}`, {
            method: "GET",
            cache: "no-store"
        });

        return response.json();



    } catch (e) {
        console.log(e);
    }
}