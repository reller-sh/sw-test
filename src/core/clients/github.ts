import axios from "axios";


export const github = async <TResp extends object>(
    {
        path = '',
        method = 'get',
        query = {},
        data = {},
    }): Promise<TResp> => {
    const config = {
        baseURL: 'https://api.github.com',
        data,
        method,
        url: path,
        params: query
    };
    const axiosInstance = axios.create()
    const response = await axiosInstance.request<TResp>(config)

    switch (response.status) {
        case 200:
        case 201:
            return response.data
        default:
            throw Error(response.statusText)
    }

}