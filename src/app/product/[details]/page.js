import Details from "@/components/details";
import { ProductById } from "@/services/product";

export default async function ProductDetail({ params }) {
    console.log("params", params);
    const productDetailData = await ProductById(params.details);

    console.log(productDetailData, "image");

    return <Details item={productDetailData.data} />;
}