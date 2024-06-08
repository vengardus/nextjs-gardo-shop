import type { ICountry } from "@/interfaces/country.interface";
import { AddressTemplate } from "@/components/templates/checkout/address/AddressTemplate";
import { getCountryAll } from "@/actions/country/get-country.action";
import { auth } from "@/auth";
import { getUserAddress } from "@/actions/address/get-user-address.action";
import type { IAddress } from "@/interfaces/address.interface";
import type { UserAddress } from "@prisma/client";


export default async function AddressPage() {
  const resp = await getCountryAll()
  const countries: ICountry[] = resp.success ? resp.data : []
  const session = await auth()

  if (!session?.user.id) {
    return (
      <div className="text-5xl my-5">Usuario no autenticado.</div>
    )
  }

  const respAddress = await getUserAddress(session.user.id)
  const address:UserAddress = respAddress.success? respAddress.data: null
  console.log('Adress:', address)
  const addressForm:IAddress = {
    ...address,
    country: address.country_id,
    address2: address.address2?? ''
  }

  return (
    <AddressTemplate
      data={{
        countries,
        user_id:session?.user.id,
        address:addressForm
      }}
    />
  )
}
