import { Product } from "../products/types"
export interface Order{
    id : string,
    storeId : string,
    status : string,
    total : string,
    orderItems : orderItem[]
}
interface orderItem{
    id : string,
    orderId : string,
    productId : string,
    quantity : number,
    price : string,
    product : Product
}