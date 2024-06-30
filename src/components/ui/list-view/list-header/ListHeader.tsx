import { toCapitalize } from "@/utils/toCapitalize"
import { Title } from "../../title/Title"
import { IMetaModel } from "@/interfaces/app/metamodel.interface"

interface Props {
    title?: string
    metaModel: IMetaModel
}


export const ListHeader = ({ title, metaModel }: Props) => {
    return (
        <div>
            <Title
                title={`${title ?? 'Listado de'}  ${toCapitalize(metaModel.verboseNamePlural)}`}
            />

            {/* TODO: botones Add Pdf ... */}
        </div>
    )
}
