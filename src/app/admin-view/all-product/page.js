
import List from "@/components/listing"
import { getAlladminProduct } from "@/services/product"
export default async function AdminViewallproduct() {
    const AlladminProduct = await getAlladminProduct()
    return <List data={AlladminProduct && AlladminProduct.data} />
}