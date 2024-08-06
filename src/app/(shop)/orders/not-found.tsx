import { PageNotFound } from "@/components";

export default function NotFoundPage() {
  return (
    <PageNotFound 
      message={`Usuario no autorizado.`}
      urlLabel="Inicio"
      urlRedirect="/"
     />
  )
}
