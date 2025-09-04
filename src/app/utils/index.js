export const navOption = [
    {
        id: 'home',
        label: 'Home',
        path: "/",
    },
    {
        id: "listingKurta",
        label: "Kurtas",
        path: "/product/all-product",
    },
];

export const adminNavOption = [
    {
        id: 'adminListing',
        label: 'Manage All Products',
        path: "/admin-view/all-product",
    },
    {
        id: 'adminNewProduct',
        label: 'Add New Product',
        path: "/admin-view/new-product",
    },
];

export const style = {
    button: 'mt-1.5 incline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white',
};

export const registrationFormControl = [
    {
        id: "name",
        type: "text",
        placeholder: "Enter your name",
        label: "Name",
        componentType: "input",
        options: []

    },
    {
        id: "email",
        type: "email",
        placeholder: "Enter your email",
        label: "Email",
        componentType: "input",
        options: []
    },
    {
        id: "password",
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
        options: []
    },
    {
        id: "role",
        type: "",
        placeholder: "Admin or Customer",
        label: "Role",
        componentType: "input",
        options: [
            {
                id: "admin",
                label: "Admin",
            },
            {
                id: "customer",
                label: "customer",
            },
        ],
    },
]


export const loginFormControl = [
    {
        id: "email",
        type: "email",
        placeholder: "Enter your email",
        label: "Email",
        componentType: "input",
        options: []
    },
    {
        id: "password",
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
        options: []
    }
]

export const adminAddProductformControl = [
    {
        id: "name",
        type: "text",
        placeholder: "Enter name",
        label: "Name",
        componentType: "input",
    },
    {
        id: "price",
        type: "number",
        placeholder: "Enter price",
        label: "Price",
        componentType: "input",
    },
    {
        id: "description",
        type: "text",
        placeholder: "Enter description",
        label: "Description",
        componentType: "input",
    },
    {
        id: "category",
        type: "",
        placeholder: "",
        label: "Category",
        componentType: "input",
    },
    {
        id: "deliveryInfo",
        type: "text",
        placeholder: "Enter deliveryInfo",
        label: "Delivery Info",
        componentType: "input",
    },
    {
        id: "onSale",
        type: "",
        placeholder: "",
        label: "On Sale",
        componentType: "input",

    },
    {
        id: "priceDrop",
        type: "number",
        placeholder: "Enter Price Drop",
        label: "Price Drop",
        componentType: "input",
    },
];

export const AvailableSize = [
    {
        id: "s",
        label: "S",
    },
    {
        id: "m",
        label: "M",
    },
    {
        id: "l",
        label: "L",
    },
];

export const firebaseConfig = {
    apiKey: "AIzaSyCvHKiaDrDfYXluqc1iVdorC31lTxL57AY",
    authDomain: "ecommerce-4e8d3.firebaseapp.com",
    projectId: "ecommerce-4e8d3",
    storageBucket: "ecommerce-4e8d3.appspot.com",
    messagingSenderId: "18677586058",
    appId: "1:18677586058:web:7743cf85a8e280714db573",
    measurementId: "G-GJMJNXH85M"
};

export const firebaseStroage = 'gs://ecommerce-4e8d3.appspot.com';

export const addNewAddressFormControl = [
    {
        id: "fullName",
        type: "input",
        placeholder: "Enter your full name",
        label: "Full Name",
        componentType: "input",
    },
    {
        id: "address",
        type: "input",
        placeholder: "Enter your full address",
        label: "Address",
        componentType: "input",
    },
    {
        id: "city",
        type: "input",
        placeholder: "Enter your city",
        label: "City",
        componentType: "input",
    },
    {
        id: "country",
        type: "input",
        placeholder: "Enter your country",
        label: "Country",
        componentType: "input",
    },
    {
        id: "postalCode",
        type: "input",
        placeholder: "Enter your postal code",
        label: "Postal Code",
        componentType: "input",
    },
];