import axios from "axios";

export const getUser = () => {
    const config = {
        headers: {Authorization: `Bearer ` + localStorage.getItem('jwt')}
    };
    const bodyParameters = {
        key: "value"};
    return axios.post('http://localhost:8080/getUserInfo', bodyParameters, config);
}
