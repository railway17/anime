import axios, { AxiosRequestConfig } from "axios"
import { API_END_POINT, SEARCH_LIMIT_COUNT } from "../const"
import { GET_RECOMMENDED_ANIMS, GET_SEARCH_ANIMS } from "./apiUrls";
import { makeConfig } from "./query-helper";
export const getRecommendedAnims = (page: number) => {
    const url = API_END_POINT + GET_RECOMMENDED_ANIMS;
    const config: AxiosRequestConfig<any> = makeConfig({params: {page}})

    return axios.get(url, config)
}

export const getSearchResult = (searchStr: string) => {
    const url = API_END_POINT + GET_SEARCH_ANIMS;
    const config: AxiosRequestConfig<any> = makeConfig({params: {q: searchStr, limit: SEARCH_LIMIT_COUNT}})

    return axios.get(url, config)
}

export const getAnimeById = (id: string) => {
    const url = API_END_POINT + `${GET_SEARCH_ANIMS}/${id}`;
    const config: AxiosRequestConfig<any> = makeConfig()

    return axios.get(url, config)
}