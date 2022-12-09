const ReverseGuard = ({children}: {children: any}) => {
    if (localStorage.getItem('jwt') === null){
        return children;
    }

    else window.location.replace('http://localhost:3000/');

}

export default ReverseGuard;

