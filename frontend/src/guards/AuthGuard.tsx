// @ts-ignore
const   AuthGuard = ({children}) => {

    if (localStorage.getItem('jwt')) {
        return children;
    } else {
        window.location.replace('http://localhost:3000/login')
    }
}

export default AuthGuard;

