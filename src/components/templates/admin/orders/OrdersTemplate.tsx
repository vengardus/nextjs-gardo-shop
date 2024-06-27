// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';
import type { IOrder } from '@/interfaces/order.interface';
import { currencyFormat } from '@/utils/currencyFormat';
import { Title } from '@/components/ui/title/Title';

interface Props {
    orders: IOrder[]
}

export const OrdersTemplate = ({ orders }: Props) => {



    return (
        <>
            <Title title="Todas las Ordenes" />

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre completo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Total
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map(order => (

                                <tr key={order.id}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id.split('-').at(-1)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {`${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(order.total)}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                        <IoCardOutline className={clsx('mx-2', {
                                            'text-green-700 font-bold': order.isPaid,
                                            'text-red-700 font-bold': !order.isPaid
                                        })} />
                                        <span className={clsx('mx-2', {
                                            'text-green-700 font-bold': order.isPaid,
                                            'text-red-700 font-bold': !order.isPaid
                                        })}>
                                            {order.isPaid ? 'Pagada' : 'Pendiente'}
                                        </span>

                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/orders/${order.id}`} className="hover:underline">
                                            Ver orden
                                        </Link>
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                {!orders.length &&
                    <div className='w-full flex justify-center mt-3'>No hay ordenes de compra.</div>
                }


            </div>
        </>
    );
}