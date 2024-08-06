"use client"

import { useRouter } from "next/navigation"
import type { IMetaModel } from "@/interfaces"
import { ListHeader } from "@/components/ui/list-view/list-header/ListHeader"

interface Props {
    model: IMetaModel
}


export const ProductListHeader = ({model}:Props) => {
    const router = useRouter() 

    const handleOnClick = (slug:string) => {
        router.push(`/admin/products/${slug}`)
    }

    return (
        <ListHeader
            title='Mantenimiento de'
            metaModel={model}
            options={{
                add: true,
                addOnClick: (slug) => handleOnClick(slug)
            }}
        />
    )
}
