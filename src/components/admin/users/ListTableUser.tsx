"use client"

import { useState } from "react"

import { HeaderTable } from "@/components/ui/table/HeaderTable"
import { DataTable } from "@/components/ui/table/DataTable"
import { ListTable } from "@/components/ui/table/ListTable"
import { Select } from "@/components/ui/select/Select"
import { MessageDatEmpty } from "@/components/ui/table/MessageDatEmpty"
import { MessageError } from "@/components/ui/table/MessageError"

import { updateUserRole } from "@/actions/user/update-user-role.action"

import { dataApp } from "@/config/configApp"
import { setColumnHeader } from "@/utils/setColumnHeader"
import type { IUser, UserRole } from "@/interfaces/user.interface"
import type { IDataTableColumn } from "@/interfaces/app/table.interface"
import type { IMetaModel } from "@/interfaces/app/metamodel.interface"


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
