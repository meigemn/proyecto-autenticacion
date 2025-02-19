import {auth} from '@/auth'
function Header() {
    const session = auth()
    return (
        <div>
            {
                session
                ?
                <form action={logout}>
                    <button>Login</button>
                </form>
                :
                <form action={login}>
                    <button>SignOut</button>
                </form>
            }
        </div>
    );
}
export default Header;