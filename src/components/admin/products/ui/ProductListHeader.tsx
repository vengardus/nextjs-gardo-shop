"use client"

import { ListHeader } from "@/components/ui/list-view/list-header/ListHeader"
import { IMetaModel } from "@/interfaces/app/metamodel.interface"
import { useRouter } from "next/navigation"

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
