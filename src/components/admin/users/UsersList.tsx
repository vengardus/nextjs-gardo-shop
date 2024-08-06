import { ListHeader } from "@/components/ui/list-view/list-header/ListHeader"
import { APP_CONST } from "@/config"
import { IUser } from "@/interfaces"
import { ListTableUser } from "./ListTableUser"
import { Pagination } from "@/components/ui/pagination/Pagination"


interface Props {
    data: IUser[]
    pagination: {
        totalPages: number
        currentPageServer: number
    }
}

const model = APP_CONST.metaModel.user

export const UsersList = ({ data, pagination }: Props) => {

    return (
        <>
            <ListHeader
                title='Mantenimiento de'
                metaModel={model}
            />

            <div className="mb-10">
                <ListTableUser
                    data={data}
                    metaModel={model}
                />
            </div>

            {
                (data.length && pagination.totalPages)
                && (
                    <Pagination
                        totalPages={pagination.totalPages}
                        currentPageServer={pagination.currentPageServer}
                    />
                )
            }

        </>
    );
}