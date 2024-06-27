// https://tailwindcomponents.com/component/hoverable-table
import { Title } from '@/components/ui/title/Title';
import type { IUser } from '@/interfaces/user.interface';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { UserGrid } from '@/components/admin/user/UserGrid';

interface Props {
    users: IUser[]
    totalPages: number
    currentPageServer: number
}

export const UsersTemplate = ({ users, totalPages, currentPageServer }: Props) => {

    return (
        <>
            <Title title="Mantenimiento de Usuarios" />

            <div className="mb-10">
                <UserGrid users={users} />
            </div>

            {
                !users.length
                && (
                    <div className='w-full flex justify-center mt-3'>No se encontraron usuarios.</div>
                )
            }

            {
                (users.length && totalPages)
                && (
                    <Pagination
                        totalPages={totalPages}
                        currentPageServer={currentPageServer}
                    />
                )
            }

        </>
    );
}