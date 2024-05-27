import { CartTemplate } from '@/components/templates/cart/CartTemplate'
import { redirect } from 'next/navigation'


export default function CartPage() {
  // Todo: validar si carrito está vacío
  //redirect('/empty')

  return (
    <CartTemplate />
  )
}
