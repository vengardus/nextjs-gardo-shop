import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

interface Props {
    isPaid: boolean
}

export const OrderPaidMessage = ({ isPaid }: Props) => {
    return (
        <>
            <div className={
                clsx(
                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 w-full",
                    {
                        'bg-red-700': !isPaid,
                        'bg-green-800': isPaid,
                    }
                )
            }>
                <IoCardOutline size={30} />
                <span className="mx-2">{!isPaid ? 'Pendiente de pago' : 'Pagada'} </span>
            </div>
        </>
    )
}
