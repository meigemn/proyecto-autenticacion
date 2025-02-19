import {auth} from '@/auth'
import { redirect } from 'next/navigation'
async function PaginaDashboard() {
    const session = await auth()
    if(!session) redirect('/')
    return(
        <>
        <h1>Dashboard</h1>
        {JSON.stringify(session)}
        </>
    )
}
export default PaginaDashboard