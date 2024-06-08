import type { ICountry } from "@/interfaces/country.interface";
import { AddressTemplate } from "@/components/templates/checkout/address/AddressTemplate";
import { getCountryAll } from "@/actions/country/get-country.action";
import { auth } from "@/auth";


export default async function AddressPage() {
  const resp = await getCountryAll()
  const countries: ICountry[] = resp.success ? resp.data : []
  const session = await auth()

  return (
    <AddressTemplate
      data={{ countries }}
      user_id={session?.user.id ?? null}
    />
  )
}
