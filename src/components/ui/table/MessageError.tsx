interface Props {
    message: string
}

export const MessageError = ({message}:Props) => {
    return (
        <span className="flex justify-end mt-7 mr-3 text-red-600 font-medium">
            {`Ocurrió un error: ${message}`}
        </span>
    )
}
