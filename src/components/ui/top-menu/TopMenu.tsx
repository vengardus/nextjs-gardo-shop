"use client"

import Link from "next/link"
import { titleFont } from "@/config/fonts"
import {
    IoSearchOutline,
    IoCartOutline
} from "react-icons/io5"
import { useUIStore } from "@/store/ui/ui.store"
import { useCartStore } from "@/store/cart/cart.store"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export const TopMenu = () => {
    const openMenu = useUIStore(state => state.openSideMenu)
    const totalItems = useCartStore(state => state.getTotalItems())
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <>
        <nav className="flex flex-col w-full fixed top-0 left-0 z-50 shadow-md bg-gray-300">
            <div className="flex px-2 sm:px-5 justify-between items-center w-full">
                {/* Logo  */}
                <div>
                    <Link href={'/'} >
                        <span className={`${titleFont.className} antialiased font-bold`}>Gardo</span>
                        <span> | Shop</span>
                    </Link>
                </div>

                {/* Center menu */}
                <div className="hidden sm:block">
                    <GenderMenu />
                </div>

                {/* Search, Cart, Menu */}
                <div className="flex items-center">
                    <Link href={'/search'} className="mx-2">
                        <IoSearchOutline className="w-5 h-5" />
                    </Link>

                    <Link
                        href={(totalItems && loaded) ? '/cart' : '/empty'}
                        className="mx-2">
                        <div className="relative">
                            {
                                (loaded && totalItems > 0) && (
                                    <span className="absolute fade-in text-sm rounded-full px-1 font-bold -top-2 -right-3 bg-blue-700 text-white">
                                        {totalItems}
                                    </span>
                                )
                            }
                            <IoCartOutline className="w-5 h-5" />
                        </div>
                    </Link>

                    <button
                        className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                        onClick={() => openMenu()}
                    >
                        Menu
                    </button>
                </div>
            </div>

            <div className="flex justify-center sm:hidden">
                <GenderMenu />
            </div>
        </nav>
        </>
    )
}

const GenderMenu = () => {
    return (
        <>
            <Link
                href={'/gender/men'}
                className="py-2 px-4 rounded-md transition-all hover:bg-gray-100">
                Hombres
            </Link>
            <Link
                href={'/gender/women'}
                className="py-2 px-4 rounded-md transition-all hover:bg-gray-100">
                Mujeres
            </Link>
            <Link
                href={'/gender/kid'}
                className="py-2 px-4 rounded-md transition-all hover:bg-gray-100">
                Niños
            </Link>
        </>
    )
}