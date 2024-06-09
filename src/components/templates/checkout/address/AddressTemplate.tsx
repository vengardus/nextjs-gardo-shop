import { Title } from '@/components/ui/title/Title';
import type { ICountry } from '@/interfaces/country.interface';
import type { IAddress } from '@/interfaces/address.interface';
import { AddressForm } from '@/components/checkout/address/ui/AddressForm';


interface Props {
  data: {
    countries: ICountry[]
    user_id: string
    address?: IAddress
  }
}

export const AddressTemplate = async ({ data }: Props) => {
  const { countries, user_id, address } = data

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AddressForm
          data={{
            countries: countries,
            user_id: user_id,
            address
          }}

        />

      </div>




    </div>
  );
}