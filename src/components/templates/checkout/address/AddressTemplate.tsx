import { Title } from '@/components/ui/title/Title';
import { AddressForm } from './ui/AddressForm';
import type { ICountry } from '@/interfaces/country.interface';


interface Props {
  data: {
    countries: ICountry[]
  }
}

export const AddressTemplate = async ({ data }: Props) => {
  const { countries } = data

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AddressForm countries={countries} />

      </div>




    </div>
  );
}