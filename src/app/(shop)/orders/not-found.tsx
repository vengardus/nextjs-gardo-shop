import { PageNotFound } from "@/components/ui/not-found/PageNotFound";



export default function NotFoundPage() {

  return (
    <PageNotFound 
      message={`Usuario no autorizado.`}
      urlLabel="Inicio"
      urlRedirect="/"
     />
  )
}
