import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ICartProduct, Size } from "@/interfaces/product.interface";

interface State {
    cart: ICartProduct[];
    addProductToCart: (product: ICartProduct) => void;
    getTotalItems: () => number;
    updateProductQuantity: (product: ICartProduct, quantity: number) => void;
    removeProduct: (id: string, size: Size) => void;
    getSumaryCart: () => {
        subTotal: number;
        tax: number;
        total: number;
        totalItems: number;
    };
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
                const { cart } = get();
                return cart.reduce(
                    (accum, current) => accum + current.quantity,
                    0
                );
            },

            updateProductQuantity: (product, quantity) => {
                const { cart } = get();
                const updateCart = cart.map((item) => {
                    if (
                        item.slug === product.slug &&
                        item.size === product.size
                    )
                        return { ...item, quantity: quantity };
                    return item;
                });
                set({ cart: updateCart });
            },

            removeProduct: (id, size) => {
                const { cart } = get();
                const updateCart = cart.filter(
                    (item) => !(item.id === id && item.size === size)
                );
                set({ cart: updateCart });
            },

            getSumaryCart: () => {
                const { cart, getTotalItems } = get();
                const subTotal = cart.reduce(
                    (accum, current) =>
                        accum + current.price * current.quantity,
                    0
                );
                const tax = subTotal * 0.18;
                const total = subTotal + tax;
                const totalItems = getTotalItems()

                return {
                    subTotal,
                    tax,
                    total,
                    totalItems
                }
            },
        }),
        {
            name: "shopping-store",
        }
    )
);
