"use client"

import { useState } from "react"
import Link from "next/link"

import { currencyFormat, setColumnHeader } from "@/utils"
import type { IDataTableColumn, IMetaModel, IProduct } from "@/interfaces"
import { HeaderTable } from "@/components/ui/table/HeaderTable"
import { DataTable } from "@/components/ui/table/DataTable"
import { ListTable } from "@/components/ui/table/ListTable"
import { MessageDatEmpty } from "@/components/ui/table/MessageDatEmpty"
import { MessageError } from "@/components/ui/table/MessageError"
import { ProductImage } from "@/components/product/product-image/ProductImage"


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
                    <ProductImage
                        src={item.images[0]}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-auto h-auto sm:w-[67%] md:w-[67%] lg:w-[23.33%] object-cover rounded"
                        //style={{width:'100%', height:'auto'}}
                    />
                </Link>
            )
        },
        {
            value: (item) => (
                <Link href={`/admin/products/${item.slug}`} >
                    <span className="underline hover:text-blue-700">{item.title}</span>
                </Link>
            )
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
