import React from 'react'
import { CheckOutItems, CheckOutResumen, Title } from '@/components'


export default function CheckOutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] bg-red-3001">

        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Items en el carrito */}
          <CheckOutItems />

          {/* Checkout - resumen de compra*/}
          <CheckOutResumen />

        </div>

      </div>
    </div>
  )
}
