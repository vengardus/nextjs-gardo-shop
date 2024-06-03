import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ICartProduct } from "@/interfaces/product.interface";

interface State {
    cart: ICartProduct[];
    addProductToCart: (product: ICartProduct) => void;
    getTotalItems: () => number
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            addProductToCart: (product: ICartProduct) => {
                // 1. Si producto con size no existe en carrito : agregarlo
                const { cart } = get();

                const productInCart = cart.some(
                    (item) =>
                        item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. El producto existe: incremetar cantidad
                const newCart = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size)
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity,
                        };
                    return item;
                });

                // 3. Actualiar cart

                set({ cart: newCart });
            },

            getTotalItems: () => {
                const {cart} = get()
                return cart.reduce((accum, current) => accum+current.quantity, 0)
            },
        }),
        {
            name: "shopping-store",
        }
    )
);
