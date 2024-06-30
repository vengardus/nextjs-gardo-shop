import { ReactNode } from "react"

export interface IDataTableColumn<T> {
    value: (item: T) => ReactNode
    className?: string
}

export interface IDataTableHeader {
    value: string
    className?: string
}
