import { toCapitalize } from "@/utils/toCapitalize"
import { Title } from "../../title/Title"
import { IMetaModel } from "@/interfaces/app/metamodel.interface"

interface Props {
    title?: string
    metaModel: IMetaModel
    options?: {
        add?: boolean
    }
}


export const ListHeader = ({ title, metaModel, options }: Props) => {
    return (
        <>
            <div className="flex flex-col justify-between md:flex-row mb-3">
                <Title
                    title={`${title ?? 'Listado de'}  ${toCapitalize(metaModel.verboseNamePlural)}`}
                />

                {/* TODO: botones Add Pdf ... */}

                {
                    options &&
                    <div className="flex justify-end gap-2">
                        {
                            options.add &&
                            <button className="btn-primary">Agregar {toCapitalize(metaModel.verboseName)}</button>
                        }
                    </div>
                }
            </div>
        </>
    )
}
