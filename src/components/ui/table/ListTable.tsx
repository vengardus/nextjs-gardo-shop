import React, { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export const ListTable = ({children}:Props) => {
    const [Header, Data, messageDataEmpty, messageError] = React.Children.toArray(children);

    return (
        <>
            <table className="table-list">

                {Header}

                {Data}

                
            </table>

            {messageDataEmpty}

            {messageError}
        </>
    )
}
