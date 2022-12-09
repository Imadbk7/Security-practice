import LoginComponent from "./components/loginComponent";
import Navbar from "./components/Navbar";
// require('dotenv').config();
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Register from "./components/Register";
import LandingComponent from "./components/LandingComponent";
import AuthGuard from "./guards/AuthGuard";
import HomeComponent from "./components/HomeComponent";
import AdminPanel from "./components/AdminPanel";
import AdminGuard from "./guards/AdminGuard";
import {useEffect, useState} from "react";
import {parseJwt} from "./Helpers/ReadToken";
import ReverseGuard from "./guards/ReverseGuard";

function App() {
    const isAuth = localStorage.getItem('jwt') !== null;

    const [role, setRole] = useState('');

    useEffect(() => {
        if (localStorage.getItem('jwt') !== null) {
            setRole(parseJwt(localStorage.getItem('jwt')!).role);
        }


    }, [])

    return (
        <div className="App" style={{backgroundColor: '#EEEEEE'}}>
            <Navbar isAuthenticated={isAuth} role={role}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/personalData" element={<AuthGuard><LandingComponent/></AuthGuard>}/>
                    <Route path="/" element={<AuthGuard><HomeComponent/></AuthGuard>}/>
                    <Route path="/adminPanel"
                           element={<AdminGuard isLoggedIn={isAuth} role={role}><AdminPanel/></AdminGuard>}/>
                    <Route path="/login" element={<ReverseGuard><LoginComponent/></ReverseGuard>}/>
                    <Route path="/register" element={<ReverseGuard><Register/></ReverseGuard>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
