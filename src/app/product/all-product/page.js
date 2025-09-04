import List from "@/components/listing";
import { getAlladminProduct } from "@/services/product";

export default async function CustomerAllproducts() {
    const getALLproductsData = await getAlladminProduct();
    return <List data={getALLproductsData && getALLproductsData.data} />
}