import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function ProfilePage() {
    const session = await auth()

    console.log(session)

    if ( ! session?.user) redirect('/')

    return (
        <div>
            <h1>ProfilePage</h1>
            <pre>{JSON.stringify(session.user, null, 2)}</pre>

        </div>
    )
}
