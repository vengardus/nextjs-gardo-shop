import { PageNotFound } from "@/components/ui/not-found/PageNotFound";



export default function NotFoundPage() {

  return (
    <PageNotFound 
      message={`Orden no encontrada.`}
      urlLabel="a la lista de ordenes."
      urlRedirect="/orders"
     />
  )
}
