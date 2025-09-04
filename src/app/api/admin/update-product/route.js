import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export async function PUT(req) {
    try {
        await connectToDB();


        const user = "admin"
        if (user === "admin") {
            const extractData = await req.json();

            const {
                _id,
                name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop


            } = extractData
            const updatedProduct = await Product.findOneAndUpdate({
                _id: _id,
            },
                {
                    name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop

                }, { new: true });
            if (updatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product updated",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Something went wrong ! Please try again",
                });
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "Not allowed",
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}