import axios from "axios";
import {SetStateAction} from "react";
import {User} from "../components/LandingComponent";
import {authHelper} from "../Helpers/AuthHelper";

const config = {
    headers: {Authorization: `Bearer ` + localStorage.getItem('jwt')}
};

export const getUsers = (array: { (value: SetStateAction<User[]>): void; (arg0: any): void; }) => {
    axios.get('http://localhost:8080/GetUsers', config).then(data => {
        authHelper(data);
        array(data.data);
    });
}

export const unBLockUser = async (id: number) => {
    const data = await axios.post('http://localhost:8080/unBlockUser', {id: id})
    authHelper(data)
    return data;
}

export const deleteUserServ = async (id: number) => {
    const data = await axios.post('http://localhost:8080/deleteUser', {id: id}, config)
    authHelper(data);
    return data;
}
