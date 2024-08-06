"use client"

import { useState } from "react"
import { dataApp } from "@/config"
import { setColumnHeader } from "@/utils"
import { updateUserRole } from "@/actions"
import type { IDataTableColumn, IMetaModel, IUser, UserRole } from "@/interfaces"
import { Select } from "@/components/ui/select/Select"
import { DataTable } from "@/components/ui/table/DataTable"
import { HeaderTable } from "@/components/ui/table/HeaderTable"
import { ListTable } from "@/components/ui/table/ListTable"
import { MessageDatEmpty } from "@/components/ui/table/MessageDatEmpty"
import { MessageError } from "@/components/ui/table/MessageError"

interface Props {
    data: IUser[]
    metaModel: IMetaModel
}

// Set Column Header
const columnHeader = setColumnHeader(['Email', 'Nombre completo', 'Rol'])
// Set Column Header adcionales (className, ...)
// Ejm: columnHeader[0].className = 'font-bold text-left bg-yellow-500'

export const ListTableUser = ({ data, metaModel }: Props) => {

    const [messageError, setMessageError] = useState<string | null>(null)

    // Set columns (contenido a mostrar)
    const columns: IDataTableColumn<IUser>[] = [
        {
            value: (item) => <span className="">{item.email}</span>
        },
        {
            value: (item) => <span>{item.name}</span>
        },
        {
            value: (item) => (
                <Select
                    id="roles"
                    defaultValue={item.role}
                    data={dataApp.roles}
                    parentId = {item.id}
                    onChange={(role, userId) => onChangeRole(role, userId)}
                />
            )
        }
    ]

    const onChangeRole = async (role: string, userId: string) => {
        if ( !role ) return 
        setMessageError(null)
        const resp = await updateUserRole(userId, role as UserRole)
        if (!resp.success) setMessageError(resp.message ?? '')
    }

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
