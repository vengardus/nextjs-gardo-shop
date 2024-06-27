import { getAllUsers } from "@/actions/user/get-all-users.action";
import { UsersTemplate } from "@/components/templates/admin/users/UsersTemplate";
import { PageNotFound } from "@/components/ui/not-found/PageNotFound";
import { APP_CONST } from "@/config/configApp";
import { getValidNumber } from "@/utils/getValidNumber";

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function UsersPage({ searchParams }: Props) {
    console.log('searchParams', searchParams)
    const page = getValidNumber(searchParams.page)
    const resp = await getAllUsers({ page })

    if (!resp.success && resp.errorCode === APP_CONST.errorCode.unAuthorized) {
        return (
            <PageNotFound
                message={resp.message}
            />
        )
    }
    
    const users = resp.data
    const { currentPage, totalPages } = resp.pagination!

    return (
        <UsersTemplate
            users={users}
            totalPages={totalPages}
            currentPageServer={currentPage}
        />
    )
}
