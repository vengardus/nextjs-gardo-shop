import { IAddress } from "@/interfaces/address.interface";
import type { IOrderItem } from "@/interfaces/order.interface";
import type { ICartProduct } from "@/interfaces/product.interface";

export class OrderMapper {
    static CartProductFromOrderItem(orderItem: IOrderItem[]): ICartProduct[] {
        const products: ICartProduct[] = orderItem.map((item) => {
            return {
                id: item.product_id,
                price: item.price,
                quantity: item.quantity,
                image: item.product.images[0],
                slug: item.product.slug,
                title: item.product.title,
                size: item.size,
            } as ICartProduct;
        });
        return products;
    }

    static OrderAddress(orderAddress: IAddress | undefined): IAddress {
        let address:IAddress

        if (!orderAddress) {
            address = {
                address: "",
                address2: "",
                firstName: "",
                lastName: "",
                phone: "",
                city: "",
                country: "",
                postalCode: "",
            };
        }
        else {
            const {address2, ...rest} = orderAddress
            address = {
                ...rest,
                address2: address2?? ''
            }
            
        }

        return address
    }
}
