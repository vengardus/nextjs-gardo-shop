"use client"

import { useState } from "react"
import Link from "next/link"
import clsx from "clsx"

import { HeaderTable } from "@/components/ui/table/HeaderTable"
import { DataTable } from "@/components/ui/table/DataTable"
import { ListTable } from "@/components/ui/table/ListTable"
import { MessageDatEmpty } from "@/components/ui/table/MessageDatEmpty"
import { MessageError } from "@/components/ui/table/MessageError"

import { setColumnHeader } from "@/utils/setColumnHeader"
import { currencyFormat } from "@/utils/currencyFormat"
import type { IOrder } from "@/interfaces/order.interface"
import type { IDataTableColumn } from "@/interfaces/app/table.interface"
import type { IMetaModel } from "@/interfaces/app/metamodel.interface"
import { IoCardOutline } from "react-icons/io5"


interface Props {
    data: IOrder[]
    metaModel: IMetaModel
}

// Set Column Header
const columnHeader = setColumnHeader(['#ID', 'Nombre completo', 'Total', 'Estado', 'Opciones'])
// Set Column Header adcionales (className, ...)
// Ejm: columnHeader[0].className = 'font-bold text-left bg-yellow-500'

export const ListTableOrder = ({ data, metaModel }: Props) => {

    const [messageError, setMessageError] = useState<string | null>(null)

    // Set columns (contenido a mostrar)
    const columns: IDataTableColumn<IOrder>[] = [
        {
            value: (item) => (
                <span>{item.id.split('-').at(-1)}</span>

            )
        },
        {
            value: (item) => <span>{`${item.OrderAddress?.firstName} ${item.OrderAddress?.lastName}`}</span>
        },
        {
            value: (item) => <span className="font-bold">{currencyFormat(item.total)}</span>
        },
        {
            value: (item) => (
                <div className="flex">
                    <IoCardOutline className={clsx('mx-2', {
                        'text-green-700 font-bold': item.isPaid,
                        'text-red-700 font-bold': !item.isPaid
                    })} />
                    <span className={clsx('mx-2', {
                        'text-green-700 font-bold': item.isPaid,
                        'text-red-700 font-bold': !item.isPaid
                    })}>
                        {item.isPaid ? 'Pagada' : 'Pendiente'}
                    </span>
                </div>
            )
        },
        {
            value: (item) => (
                <Link href={`/orders/${item.id}`} className="hover:underline">
                    Ver orden
                </Link>
            )
        },
        {
            value: (item) => <span></span>
        },

    ]

    return (
        <>
            <ListTable >
                <HeaderTable columnHeader={columnHeader} />

                <DataTable
                    data={data}
                    columns={columns}
                />

                {
                    !data.length && <MessageDatEmpty modelLabel={metaModel.verboseNamePlural} />
                }

                {
                    messageError && <MessageError message={messageError} />
                }
            </ListTable>

        </>
    )
}
