import clsx from "clsx"
import { Size } from "@/interfaces"

interface Props {
  selectedSize?: Size,
  availableSizes: Size[]
  onSizeChanged: (size: Size) => void
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged
}: Props) => {
  return (
    <div className="mt-3 mb-2">
      <h3 className="font-bold text-lg mb-2">Tallas disponibles</h3>
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
              onClick={() => onSizeChanged(size)}
            >
              {size}
            </button>
          ))
        }
      </div>
    </div>

  )
}
