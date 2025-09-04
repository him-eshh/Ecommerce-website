import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        debugger
        const isAuthUser = await AuthUser(req);
        console.log(isAuthUser, "isAuthUser")
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");

            console.log("reached here", id);

            if (!id)
                return NextResponse.json({
                    success: false,
                    message: "Please login in",
                });
            let extractAllCartItems;
            try {
                extractAllCartItems = await Cart.aggregate([
                    {
                        $match: {
                            userID: new mongoose.Types.ObjectId(id),
                        }
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "productID",
                            foreignField: "_id",
                            as: "productID",
                        },
                    }
                ]);
                console.log(extractAllCartItems);
            } catch (error) {
                console.error('Error extracting cart items:', error);
            }
            // .populate(
            //     "productID"
            // );

            // console.log("extractAllCartItems", extractAllCartItems);


            if (extractAllCartItems) {
                return NextResponse.json({ success: true, data: extractAllCartItems });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "No Cart item found ",
                    status: 204,
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not allowed",
            });
        }
    } catch (e) {
        console.error(e, "err")
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}