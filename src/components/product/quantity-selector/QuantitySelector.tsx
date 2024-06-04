"use client"

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number
    onQuantityChanged: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
    
    const onClick_count = (value: number): void => {
        if (quantity + value > 0) onQuantityChanged(quantity + value)
    }

    return (
        <div className="flex gap-5 items-center px-2">
            <button onClick={() => onClick_count(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>

            <span className="w-20 rounded text-center bg-gray-200 p-2">
                {quantity}
            </span>

            <button onClick={() => onClick_count(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
