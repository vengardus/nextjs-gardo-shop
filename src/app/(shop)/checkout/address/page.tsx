import { auth } from "@/auth";

import type { UserAddress } from "@prisma/client";
import type { IAddress, ICountry } from "@/interfaces";
import { getCountryAll, getUserAddress } from "@/actions";
import { AddressForm, Title } from "@/components";


export default async function AddressPage() {
  const resp = await getCountryAll()
  const countries: ICountry[] = resp.success ? resp.data : []
  const session = await auth()
  const user_id = session?.user.id

  if (!user_id) {
    return (
      <div className="text-5xl my-5">Usuario no autenticado.</div>
    )
  }

  const respAddress = await getUserAddress(session.user.id)
  const address: UserAddress = respAddress.success ? respAddress.data : null
  console.log('Adress:', address)
  const addressForm: IAddress | undefined = address ? {
    ...address,
    country: address.country_id,
    address2: address.address2 ?? ''
  }
    : undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AddressForm
          data={{
            countries: countries,
            user_id: user_id,
            address: addressForm
          }}

        />

      </div>




    </div>
  );
}
