"use client"

import { updateUserRole } from "@/actions/user/update-user-role.action"
import { APP_CONST } from "@/config/configApp"
import type { IUser, UserRole } from "@/interfaces/user.interface"
import { useState } from "react"


interface Props {
    users: IUser[]
}

export const UserGrid = ({ users }: Props) => {
    const [messageError, setMessageError] = useState<string|null>(null)

    const onChangeRole = async (role: string, userId: string) => {
        setMessageError(null)
        const resp = await updateUserRole(userId, role as UserRole)
        if ( !resp.success ) setMessageError(resp.message?? '')
    }

    return (
        <>
            <table className="min-w-full">
                <thead className="bg-gray-200 buser-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Email
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Nombre completo
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map(user => (

                            <tr key={user.id}
                                className="bg-white buser-b transition duration-300 ease-in-out hover:bg-gray-100">

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.email}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {`${user.name}`}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <select
                                        id="roles"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                              dark:bg-gray-700
                                               dark:border-gray-100
                                                dark:placeholder-gray-400
                                                 dark:text-white
                                                  dark:focus:ring-blue-500
                                                   dark:focus:border-blue-500"
                                        value={user.role}
                                        onChange={e => onChangeRole(e.target.value, user.id)}
                                    >
                                        <option value={`${APP_CONST.userRole.admin}`}>Administrador</option>
                                        <option value={`${APP_CONST.userRole.user}`}>Usuario</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            {
                messageError 
                && (
                    <div className="flex justify-end mt-7 mr-3 text-red-600 font-medium">{`Ocurrió un error: ${messageError}`} </div>
                )
            }

        </>
    )
}
