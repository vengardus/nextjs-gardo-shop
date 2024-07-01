import { Pagination } from '@/components/ui/pagination/Pagination';
import { ListHeader } from '@/components/ui/list-view/list-header/ListHeader';

import { APP_CONST } from '@/config/configApp';
import type { IOrder } from '@/interfaces/order.interface';
import { ListTableOrder } from './ListTableOrder';

interface Props {
    data: IOrder[]
    pagination: {
        totalPages: number
        currentPageServer: number
    }
}

const model = APP_CONST.metaModel.order

export const OrdersList = ({ data, pagination }: Props) => {

    return (
        <>
            <ListHeader
                metaModel={model}
            />

            <div className="mb-10">
                <ListTableOrder
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