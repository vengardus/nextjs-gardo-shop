"use client"

import Link from "next/link"
import clsx from "clsx"
import {
    IoCloseOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoShirtOutline,
    IoTicketOutline,
    IoPeopleOutline
    
} from "react-icons/io5"
import { useUIStore } from "@/store/ui/ui.store"

export const Sidebar = () => {
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu)

    return (
        <div>
            {/* nackground black */}
            {
                isSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
                )
            }

            {/* blur */}
            {
                isSideMenuOpen && (
                    <div 
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                        onClick={closeMenu}
                    />
                )
            }


            {/* sidemenu */}

            <nav
                // Pendiente: efecto del slide 
                className={
                    clsx(
                        "fixed p-5 right-0 top-0 w-[30em] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 dark:text-black",
                        {
                            "translate-x-full": !isSideMenuOpen,
                        }
                    )
                }
            >
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer text-black"
                    onClick={() => closeMenu()}
                />

                {/* input  */}
                <div className="relative mt-14">
                    <IoSearchOutline
                        size={20}
                        className="absolute top-2 left-2"
                    />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* menú */}
                <Link
                    href={'/'}
                    className="flex items-center mt-7 px-2 gap-3 hover:bg-gray-100 rounded transition-all"
                >
                    <IoPersonOutline size={33} />
                    <span className="text-xl">Perfil</span>
                </Link>

                <Link
                    href={'/'}
                    className="flex items-center mt-7 px-2 gap-3 hover:bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline size={33} />
                    <span className="text-xl">Ordenes</span>
                </Link>

                <Link
                    href={'/auth/login'}
                    className="flex items-center mt-7 px-2 gap-3 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogInOutline size={33} />
                    <span className="text-xl">Ingresar</span>
                </Link>

                <Link
                    href={'/'}
                    className="flex items-center mt-7 px-2 gap-3 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogOutOutline size={33} />
                    <span className="text-xl">Salir</span>
                </Link>

                {/* line separator */}
                <div className="w-full h-px bg-gray-400 my-10"></div>

                <Link
                    href={'/'}
                    className="flex items-center mt-7 px-2 gap-3 hover:bg-gray-100 rounded transition-all"
                >
                    <IoShirtOutline size={33} />
                    <span className="text-xl">Productos</span>
                </Link>

                <Link
                    href={'/'}
                    className="flex items-center mt-7 px-2 gap-3 hover:bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline size={33} />
                    <span className="text-xl">Ordenes</span>
                </Link>

                <Link
                    href={'/'}
                    className="flex items-center mt-7 px-2 gap-3 hover:bg-gray-100 rounded transition-all"
                >
                    <IoPeopleOutline size={33} />
                    <span className="text-xl">Usuarios</span>
                </Link>

            </nav>


        </div>
    )
}
