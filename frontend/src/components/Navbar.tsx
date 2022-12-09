const Navbar = ({isAuthenticated, role}: { isAuthenticated: boolean, role: string }) => {

    const logOut = () => {
        localStorage.removeItem('jwt');
        window.location.reload();
    }

    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="http://localhost:3000/">Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {isAuthenticated && role === 'admin' &&
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/personalData">Personal Data<span
                                className="sr-only">(current)</span></a>
                        </li>
                    }

                    {role === 'admin' &&
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/adminPanel">admin panel<span
                                className="sr-only">(current)</span></a>
                        </li>
                    }

                    {isAuthenticated ?
                        <li className="nav-item active">
                            <button className="nav-link" onClick={logOut}>Log out<span
                                className="sr-only">(current)</span></button>
                        </li>
                        :
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/login">Login<span
                                className="sr-only">(current)</span></a>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    </>
}


export default Navbar;
