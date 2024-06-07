import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
    };
}

export const useAddress = create<State>()(
    persist(
        (get, set) => ({
            address: {
                firstName: "",
                lastName: "",
                address: "",
                address2: "",
                postalCode: "",
                city: "",
                country: "",
                phone: "",
            },
        }),
        {
            name: "address-storage",
        }
    )
);
