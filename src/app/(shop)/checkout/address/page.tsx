import type { ICountry } from "@/interfaces/country.interface";
import { AddressTemplate } from "@/components/templates/checkout/address/AddressTemplate";
import { getCountryAll } from "@/actions/country/get-country.action";


export default async function AddressPage() {
  const resp = await getCountryAll()
  const countries:ICountry[] = resp.success? resp.data : []

  return (
    <AddressTemplate data={{countries}}/>
  )
}
