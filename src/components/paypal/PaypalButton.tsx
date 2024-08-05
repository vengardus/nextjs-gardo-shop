"use client"

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { confirmedPayment, paypalCheckPayment, setTransactionId } from '@/actions'


interface Props {
    amount: number
    orderId: string
}

export const PaypalButton = ({ amount, orderId }: Props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const roundAmount = Math.round(amount * 100) / 100 

    console.log(roundAmount)

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        // TODO: comentado hasta solucionar la creaccion de mi cuenta paypal
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: `${roundAmount}`,
                        currency_code: 'USD'
                    }
                }
            ]
        })

        console.log(transactionId)
        //return transactionId
        //const transactionId = `PAYPAL-${orderId}`   //TODO: por ahora

        const resp = await setTransactionId(transactionId, orderId)
        if (!resp.success) throw new Error(resp.message)

        return transactionId
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        const details = await actions.order?.capture()
        if (!details || !details.id) return

        const resp = await paypalCheckPayment(details.id)
        console.log({resp})
    }

    if (isPending) {
        return (
            <div className='animate-pulse mb-16'>
                <div className='h-11 bg-gray-300 rounded'></div>
                <div className='h-11 bg-gray-300 rounded mt-2'></div>
            </div>
        )
    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    )
}

