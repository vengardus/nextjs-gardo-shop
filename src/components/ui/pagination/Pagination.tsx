"use client"

import { generatePaginationNumbers } from "@/utils/generatePaginationNumber"
import { getValidNumber } from "@/utils/getValidNumber"
import clsx from "clsx"
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"


interface Props {
    totalPages: number
    currentPageServer?:number
}

export const Pagination = ({ totalPages, currentPageServer }: Props) => {

    const pathName = usePathname()
    const searchParams = useSearchParams()
    const currentPage = getValidNumber(searchParams.get('page')) 
    const allPages = generatePaginationNumbers(currentPage, totalPages)

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)

        if (pageNumber === '...') return `${pathName}?${params.toString()}`
        if (+pageNumber <= 0) return `${pathName}`
        if (+pageNumber > totalPages) return `${pathName}?${params.toString()}`

        params.set('page', pageNumber.toString())

        return `${pathName}?${params.toString()}`
    }

    console.log('currect', currentPage, currentPageServer)
    if ( currentPageServer &&  currentPage != currentPageServer) {
        // sucede cuando por ejm estamos en la página 2, salimos a otra opción y volvemos, la currentPage esta en 1 
        // pero el servidor se quedo con el currentPage en 2 y con ella la data.
        redirect(createPageUrl(currentPage))
    }

    return (
        <div className="flex justify-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item ">
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)} >
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (
                            <li key={index} className="page-item">
                                <a
                                    className={
                                        clsx(
                                            "page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {
                                                'bg-blue-600 text-white hover:bg-blue-600 hover:text-white': page == currentPage
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}>
                                    {page}
                                </a>
                            </li>
                        ))
                    }


                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)} >
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
