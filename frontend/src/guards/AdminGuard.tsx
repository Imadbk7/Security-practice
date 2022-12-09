import LoginComponent from "../components/loginComponent";

const AdminGuard = ({role, isLoggedIn, children}: {role: string, isLoggedIn: boolean, children: any}) => {

    if (role === 'admin' && isLoggedIn){
        return children;
    }
    else return <LoginComponent/>
}

export default AdminGuard;
