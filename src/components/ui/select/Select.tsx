
interface Props {
    id: string
    defaultValue? : string
    data : {
        value: string
        label: string
    }[]
    parentId?: string
    onChange?: (value:string, id:string) => void
    register?: ((name:any) => void) | null
}

export const Select = ({id, defaultValue, data, onChange, parentId, register}:Props) => {
    const registerField = register? register(id) : {}

    const handleOnChange = (value:string) => {
        if ( onChange )
            onChange(value, parentId?? '')
    }

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
            defaultValue={defaultValue?? ''}
            onChange={e => handleOnChange(e.target.value)}
            {...registerField}
        >
            <option value="">[Seleccione]</option>
            {
                data.map(item => (
                    <option 
                        key={item.value} 
                        value={item.value}>{item.label}
                    </option>
                ))
            }
        </select>
    )
}
