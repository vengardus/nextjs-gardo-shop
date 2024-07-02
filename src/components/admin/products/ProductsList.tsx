import { Pagination } from '@/components/ui/pagination/Pagination';
import { ListTableProduct } from '@/components/admin/products/ui/ListTableProduct';

import { APP_CONST } from '@/config/configApp';
import type { IProduct } from '@/interfaces/product.interface';
import { ProductListHeader } from './ui/ProductListHeader';

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