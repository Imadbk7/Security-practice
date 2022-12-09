import { AxiosResponse } from "axios";

export const authHelper = (data: AxiosResponse<any, any>) => {
    if (data.data === 'token expired'){
        localStorage.removeItem('jwt');
        window.location.reload();
    }
}
