import { Title } from "@/components/ui/title/Title"
import { initialData, type ISeedProduct } from "@/seed/seed"
import { CheckOutItems } from "../../checkout/CheckOutItems"
import { CheckOutResumen } from "../../checkout/CheckOutResumen"


const products: ISeedProduct[] = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export const CheckOutTemplate = () => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] bg-red-3001">

        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Items en el carrito */}
          <CheckOutItems productsInCart={products} />

          {/* Checkout - resumen de compra*/}
          <CheckOutResumen />

        </div>

      </div>
    </div>
  )
}
