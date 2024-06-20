import type { IAddress } from "./address.interface";
import type { ICartProduct, IProduct, Size } from "./product.interface";
import { IUser } from "./user.interface";


export interface IOrder {
    id: string;
    subTotal: number;
    tax: number;
    total: number;
    itemsInOrder: number;
    isPaid: boolean;

    // Relations
    OrderItem: IOrderItem[];
    OrderAddress?: IAddress;
    user: IUser
}

export interface IOrderItem {
    id: string;
    quantity: number;
    price: number;
    size: Size;

    // Relaciones
    order_id: string;
    product: IProduct;
    product_id: string;
}
