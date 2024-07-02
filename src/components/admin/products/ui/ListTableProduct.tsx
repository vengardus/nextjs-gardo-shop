"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { HeaderTable } from "@/components/ui/table/HeaderTable"
import { DataTable } from "@/components/ui/table/DataTable"
import { ListTable } from "@/components/ui/table/ListTable"
import { MessageDatEmpty } from "@/components/ui/table/MessageDatEmpty"
import { MessageError } from "@/components/ui/table/MessageError"

import { setColumnHeader } from "@/utils/setColumnHeader"
import { currencyFormat } from "@/utils/currencyFormat"
import type { IProduct } from "@/interfaces/product.interface"
import type { IDataTableColumn } from "@/interfaces/app/table.interface"
import type { IMetaModel } from "@/interfaces/app/metamodel.interface"


interface Props {
    data: IProduct[]
    metaModel: IMetaModel
}

// Set Column Header
const columnHeader = setColumnHeader(['Imagen', 'Título', 'Precio', 'Género', 'Inventario', 'Tallas'])
// Set Column Header adcionales (className, ...)
// Ejm: columnHeader[0].className = 'font-bold text-left bg-yellow-500'

export const ListTableProduct = ({ data, metaModel }: Props) => {

    const [messageError, setMessageError] = useState<string | null>(null)

    // Set columns (contenido a mostrar)
    const columns: IDataTableColumn<IProduct>[] = [
        {
            value: (item) => (
                <Link href={`/product/${item.slug}`} >
                    <Image
                        src={`/products/${item.images[0]}`}
                        alt={item.title}
                        width={100}
                        height={100}
                    />
                </Link>
            )
        },
        {
            value: (item) => <span>{item.title}</span>
        },
        {
            value: (item) => <span className="font-bold">{currencyFormat(item.price)}</span>
        },
        {
            value: (item) => <span>{item.gender}</span>
        },
        {
            value: (item) => <span className="font-bold">{item.inStock}</span>
        },
        {
            value: (item) => <span className="font-bold">{item.sizes.join(', ')}</span>
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
