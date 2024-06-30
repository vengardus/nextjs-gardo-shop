interface Props {
    modelLabel: string
}

export const MessageDatEmpty = ({modelLabel}:Props) => {
    return (
        <span className='w-full flex justify-center mt-3'>
            {`No se encontraron ${modelLabel}`}.
        </span>
    )
}
