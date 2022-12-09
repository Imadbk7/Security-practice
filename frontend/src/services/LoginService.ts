import axios from "axios";

export const auth = async (email: string, password: string) => {
return await axios.post('http://localhost:8080/auth', {email: email, password: password});
}


export const verifyRecaptha =async (token: string) => {
    const val = await axios.post('http://localhost:8080/verifyRecaptcha', {token: token})
    return val.data;
}

export const multiFactorAuthentication = async (email: string) => {
    return await axios.post('http://localhost:8080/multifactorAuth', {email: email});
}
