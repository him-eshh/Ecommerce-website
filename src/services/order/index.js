import Cookies from "js-cookie";

export const createOrderService = async (formData) => {
    try {
        const res = await fetch("/api/order/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const getAllOrderUser = async (id) => {
    try {
        const res = await fetch(`/api/order/get-all-order?id=${id}`, {
            method: "GET",
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

export const getOrderDetail = async (id) => {
    try {
        const res = await fetch(`/api/order/order-details?id=${id}`, {
            method: "GET",
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

export const getAllOrdersAllUsers = async () => {
    try {
        const res = await fetch(`/api/admin/get-all-orders`, {
            method: "GET",
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

export const updateStatusOrder = async (formData) => {
    try {
        const res = await fetch(`/api/admin/update-orders`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};