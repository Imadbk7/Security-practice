import "../Styling/AdminPanel.css";
import {useEffect, useState} from "react";
import {deleteUserServ, getUsers, unBLockUser} from "../services/AdminPanelService";
import {User} from "./LandingComponent";

const AdminPanel = () => {
    const [userArray, setUserArray] = useState<User[]>([]);

    useEffect(() => {
        getUsers(setUserArray);
    }, []);

    const deleteUser = async (id: number) => {
        const data = await deleteUserServ(id);
        if (data.data === 'you cannot delete yourself'){
            alert(data.data);
            return;
        }
        window.location.reload();
    }

    const unBlockUser = async (id: number) => {
       if (await unBLockUser(id)){
           window.location.reload();
       }
       else alert('something went wrong')
    }

    return <>
        <div className={"vh-100"}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">
                            <div className="table-responsive">
                                <table className="table user-list">
                                    <thead>
                                    <tr>
                                        <th><span>User</span></th>
                                        <th><span>Created</span></th>
                                        <th className="text-center"><span>Status</span></th>
                                        <th><span>Email</span></th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        userArray.map(data =>
                                                <tr key={data.name}>
                                                    <td>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                             alt=""/>
                                                        <a href="#" className="user-link">{data.name}</a>
                                                        <span className="user-subhead">{data.role}</span>
                                                    </td>
                                                    <td>
                                                        2013/12/31
                                                    </td>
                                                    { data.loginAttempts >= 5 ?
                                                        <td className="text-center">
                                                            <span className="label label-success">blocked</span>
                                                        </td> :
                                                        <td className="text-center">
                                                            <span className="label label-success">active</span>
                                                        </td>
                                                    }
                                                    <td>
                                                        <a href="#">{data.email}</a>
                                                    </td>
                                                    <td style={{width: "20%"}}><a href="#" className="table-link">
									<span className="fa-stack">
										<i className="fa fa-square fa-stack-2x"/>
										<i onClick={() => unBlockUser(data.idusers)} className="fa fa-search-plus fa-stack-1x fa-inverse"/>
									</span>
                                                    </a>
                                                        <a href="#" className="table-link">
									<span className="fa-stack">
										<i className="fa fa-square fa-stack-2x"/>
										<i className="fa fa-pencil fa-stack-1x fa-inverse"/>
									</span>
                                                        </a>
                                                        <a href="#" className="table-link danger">
									<span className="fa-stack">
										<i className="fa fa-square fa-stack-2x"/>
										<i onClick={e => deleteUser(data.idusers)} className="fa fa-trash-o fa-stack-1x fa-inverse"/>
									</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <ul className="pagination pull-right">
                                <li><a href="#"><i className="fa fa-chevron-left"/></a></li>
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#"><i className="fa fa-chevron-right"/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>

}


export default AdminPanel;
