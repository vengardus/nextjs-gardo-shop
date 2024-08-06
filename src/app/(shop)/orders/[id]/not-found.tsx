import { PageNotFound } from "@/components";

export default function NotFoundPage() {
  return (
    <PageNotFound 
      message={`Orden no encontrada.`}
      urlLabel="a la lista de ordenes."
      urlRedirect="/orders"
     />
  )
}
