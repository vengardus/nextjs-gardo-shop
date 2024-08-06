import { getValidNumber } from "@/utils"
import type { IUser } from "@/interfaces"
import { getAllUsers } from "@/actions"
import { PageNotFound, UsersList } from "@/components"


interface Props {
    searchParams: {
        page?: string
    }
}

export default async function UsersPage({ searchParams }: Props) {
    const page = getValidNumber(searchParams.page)
    const resp = await getAllUsers({ page })

    if (!resp.success) 
        return <PageNotFound message={resp.message} />

    const data: IUser[] = resp.data
    const { currentPage, totalPages } = resp.pagination

    return (
        <UsersList
            data={data}
            pagination={{
                totalPages: totalPages,
                currentPageServer: currentPage
            }}
        />
    )
}
