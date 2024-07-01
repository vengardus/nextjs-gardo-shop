import { Pagination } from '@/components/ui/pagination/Pagination';
import { ListTableProduct } from '@/components/admin/products/ListTableProduct';
import { ListHeader } from '@/components/ui/list-view/list-header/ListHeader';

import { APP_CONST } from '@/config/configApp';
import type { IProduct } from '@/interfaces/product.interface';

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
            <ListHeader
                title='Mantenimiento de'
                metaModel={model}
                options={{
                    add: true
                }}
            />

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