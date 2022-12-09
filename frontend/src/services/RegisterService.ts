import axios from "axios";


export const register = async (name: string, email:string, password: string) => {
    const data = await axios.post('http://localhost:8080/register', {name: name, email: email, password: password});
    console.log(data.data);
    return await data.data;
}

export const checkPw = async (password: string) => {
    const data = await axios.post('http://localhost:8080/checkPw', {pw: password});
    console.log(await data.data);
    return data.data;
}
