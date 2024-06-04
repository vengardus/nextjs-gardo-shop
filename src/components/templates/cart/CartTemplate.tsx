import Link from "next/link"
import { Title } from "@/components/ui/title/Title"
import { CartCheckout } from "../../cart/CartCheckout"
import { ItemsInCart } from "@/components/cart/ui/ItemsInCart"


export const CartTemplate = () => {
  const glosaTitle = 'Agregar mas items'
  const glosaLinkBack = 'Continuar comprando'
  const linkBack = '/'

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] bg-red-3001">

        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          <div className="flex flex-col" >
            <span className="text-xl">
              {glosaTitle}
            </span>
            <Link href={linkBack} className="hover:underline mb-5">
              {glosaLinkBack}
            </Link>

            {/* Items en el carrito */}
            <ItemsInCart />

          </div >

          {/* Checkout - resumen de compra*/}
          <CartCheckout />

        </div>

      </div>
    </div>
  )
}
