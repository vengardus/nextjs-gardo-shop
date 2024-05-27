import OrderTemplate from '@/components/templates/order/OrderTemplate'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}
export default function OrderPage({ params }: Props) {
  const { id } = params

  // Todo: validar id
  // redirect(' ')

  return (
    <OrderTemplate id={id} />
  )
}
