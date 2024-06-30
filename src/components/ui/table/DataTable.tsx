import { IDataTableColumn } from "@/interfaces/app/table.interface"

interface IBaseItem {
    id: string
}

interface Props<T extends IBaseItem> {
    data : T[]
    columns: IDataTableColumn<T>[]
}

export const DataTable = <T extends IBaseItem>({data, columns}:Props<T>) => {
    return (
        <tbody>

            {
                data.map((item) => (

                    <tr key={item.id}
                        className=""
                    >
                        {
                            columns.map((column, index) => {
                                return (
                                    <td
                                        key={index}
                                        className="table-tbody-td"
                                    >
                                        {column.value(item)}
                                    </td>
                                )
                            }
                            )
                        }
                    </tr>
                ))
            }

        </tbody>
    )
}
