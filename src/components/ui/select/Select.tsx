
interface Props {
    id: string
    current : {
        value: string
        id: string
    }
    data : {
        value: string
        label: string
    }[]
    onChange: (value:string, id:string) => void
}

export const Select = ({id, current, data, onChange}:Props) => {

    return (
        <select
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                                  dark:bg-gray-700
                                                   dark:border-gray-100
                                                    dark:placeholder-gray-400
                                                     dark:text-white
                                                      dark:focus:ring-blue-500
                                                       dark:focus:border-blue-500"
            value={current.value}
            onChange={e => onChange(e.target.value, current.id)}
        >
            {
                data.map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))
            }
        </select>
    )
}
