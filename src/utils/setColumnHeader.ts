import { IDataTableHeader } from "@/interfaces/app/table.interface"

export const setColumnHeader = (values: string[]): IDataTableHeader[] => {
    return values.map(value => ({
        value: value
    }))
}