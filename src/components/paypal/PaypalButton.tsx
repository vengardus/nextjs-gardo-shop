"use client"

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { setTransactionId } from '@/actions/payment/set-transaction-id.action'
import { paypalCheckPayment } from '@/actions/payment/paypal-check-payment.action'
import { confirmedPayment } from '@/actions/payment/confirmed-payment.action'


interface Props {
    amount: number
    orderId: string
}

export const PaypalButton = ({ amount, orderId }: Props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const roundAmount = Math.round(amount * 100) / 100

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        /*TODO: comentado hasta solucionar la creaccion de mi cuenta paypal
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
        */
        const transactionId = `PAYPAL-${orderId}`   //TODO: por ahora

        const resp = await setTransactionId(transactionId, orderId)
        if (!resp.success) throw new Error(resp.message)


        // TODO: esto debe de ir en el server action paypalCheckPayment, elcual es llamado desde un evento de 
        // transaccion aprovada de Paypal (onApprove)

        const confirmedPaid = await confirmedPayment(orderId)
        if (!confirmedPaid.success) throw new Error(resp.message)

        


        
        return transactionId
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        const details = await actions.order?.capture()
        if (!details || !details.id) return

        await paypalCheckPayment(details.id)
    }


    return (
        !isPending
            ?
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
            :
            <div className='animate-pulse mb-16'>
                <div className='h-11 bg-gray-300 rounded'></div>
                <div className='h-11 bg-gray-300 rounded mt-2'></div>
            </div>
    )
}

