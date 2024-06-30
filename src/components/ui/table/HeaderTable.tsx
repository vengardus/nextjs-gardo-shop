import { IDataTableHeader } from "@/interfaces/app/table.interface"
import React, { ReactNode } from "react"

interface Props {
    columnHeader: IDataTableHeader[]
}

export const HeaderTable = ({ columnHeader }: Props) => {

    return (
        <thead className="">
            <tr>
                {
                    columnHeader.map((column, index) => (
                        <th key={index}
                            scope="col"
                            className="">
                            <span className={column.className ?? ''}>{column.value}</span>
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}
