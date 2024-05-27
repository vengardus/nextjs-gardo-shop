"use client"

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
    const [count, setCount] = useState(quantity)

    const onClick_count = (value: number): void => {
        if (count + value > 0) setCount(count + value)
    }

    return (
        <div className="flex gap-5 items-center px-2">
            <button onClick={() => onClick_count(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>

            <span className="w-20 rounded text-center bg-gray-200 p-2">
                {count}
            </span>

            <button onClick={() => onClick_count(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
