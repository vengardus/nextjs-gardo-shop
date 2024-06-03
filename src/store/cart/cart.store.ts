import { ICartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";

interface State {
    cart: ICartProduct[];
    addProductToCart: (product: ICartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
    cart: [],

    addProductToCart: (product: ICartProduct) => {
        // 1. Si producto con size no existe en carrito : agregarlo
        const { cart } = get();
        console.log(cart)
        const productInCart = cart.some(
            (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
            set({ cart: [...cart, product] });
            return;
        }

        // 2. El producto existe: incremetar cantidad
        const newCart = cart.map((item) => {
            if (item.id === product.id && item.size === product.size)
                return { ...item, quantity: item.quantity + product.quantity };
            return item;
        });

        // 3. Actualiar cart

        set({ cart: newCart });
    },
}));
