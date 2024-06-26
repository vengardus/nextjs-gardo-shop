import { PageNotFound } from "@/components/ui/not-found/PageNotFound";
import { UsersList } from "@/components/admin/users/UsersList";

import { getAllUsers } from "@/actions/user/get-all-users.action";

import { getValidNumber } from "@/utils/getValidNumber";
import type { IUser } from "@/interfaces/user.interface";

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
