import type { Size } from "@/seed/seed"
import clsx from "clsx"

interface Props {
    selectedSize: Size,
    availableSizes: Size[]
}

export const SizeSelector = ({
    selectedSize,
    availableSizes
}: Props) => {
    return (
        <div className="my-3">
            <h3 className="font-bold text-lg mb-3">Tallas disponibles</h3>
            <div className="flex gap-5">
                {
                    availableSizes.map(size => (
                        <button
                            key={size}
                            className={
                                clsx("w-[3rem] p-2 hover:underline hover:underline-offset-4 text-lg",
                                    {
                                        'underline': selectedSize === size,
                                        'underline-offset-4': selectedSize === size
                                    }
                                )
                            }
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>

    )
}
