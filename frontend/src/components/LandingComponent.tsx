import '../Styling/landingComponentStyle.css';
import {useEffect, useState} from "react";
import {getUser} from "../services/LandingService";

export type User = {
    idusers: number,
    name: string,
    email: string,
    role: string,
    loginAttempts: number
}

const LandingComponent = () => {
    const defaultUser: User = {idusers: 0, name: 'null', email: 'null', role: 'null', loginAttempts: 0};
    const [user, setUser] = useState<User>(defaultUser);

    useEffect(() => {
        getUser().then(data => {
            if (data.data === 'token expired') {
                localStorage.removeItem('jwt');
                window.location.reload();
            } else {
                const user: User = {
                    idusers: data.data.idusers,
                    name: data.data.name,
                    email: data.data.email,
                    role: data.data.role,
                        loginAttempts: data.data.loginAttempts
                }
                setUser(user)
            }
        });
    }, [])

    return <>
        <h1>Personal informations</h1>
        <br/><br/>
        <div className="vh-100">
            <div className="container bootstrap snippets bootdey">
                <div className="panel-body inf-content">
                    <div className="row">
                        <div className="col-md-4">
                            <img alt="" style={{width: '600px'}} title="" className="img-circle img-thumbnail isTooltip"
                                 src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                 data-original-title="Usuario"/>
                        </div>
                        <div className="col-md-6">
                            <strong>Information</strong><br/>
                            <div className="table-responsive">
                                <table className="table table-user-information">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-asterisk text-primary"/>
                                                Identificacion
                                            </strong>
                                        </td>
                                        <td className="text-primary">
                                            {user!.idusers}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-user  text-primary"/>
                                                Full Name
                                            </strong>
                                        </td>
                                        <td className="text-primary">
                                            {user!.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-eye-open text-primary"/>
                                                Role
                                            </strong>
                                        </td>
                                        <td className="text-primary">
                                            {user!.role}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-envelope text-primary"/>
                                                Email
                                            </strong>
                                        </td>
                                        <td className="text-primary">
                                            {user!.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-calendar text-primary"/>
                                                created
                                            </strong>
                                        </td>
                                        <td className="text-primary">
                                            20 jul 20014
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span className="glyphicon glyphicon-calendar text-primary"/>
                                                Modified
                                            </strong>
                                        </td>
                                        <td className="text-primary">
                                            20 jul 20014 20:00:00
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default LandingComponent;
