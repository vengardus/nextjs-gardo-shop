import { APP_CONST } from '@/config';
import type { IProduct } from '@/interfaces';
import { ProductListHeader } from './ui/ProductListHeader';
import { ListTableProduct } from './ui/ListTableProduct';
import { Pagination } from '@/components/ui/pagination/Pagination';


interface Props {
    data: IProduct[]
    pagination: {
        totalPages: number
        currentPageServer: number
    }
}

const model = APP_CONST.metaModel.product

export const ProductsList = ({ data, pagination }: Props) => {

    return (
        <>

            <ProductListHeader model={model}/>

            <div className="mb-10">
                <ListTableProduct
                    data={data}
                    metaModel={model}
                />
            </div>

            {
                (data.length && pagination.totalPages)
                && (
                    <Pagination
                        totalPages={pagination.totalPages}
                        currentPageServer={pagination.currentPageServer}
                    />
                )
            }

        </>
    );
}