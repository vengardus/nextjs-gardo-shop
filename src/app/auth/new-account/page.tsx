import { titleFont } from "@/config";
import { RegisterForm } from "@/components";


export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center sm:h-svh ">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>
      <RegisterForm />
    </div>
  )
}
