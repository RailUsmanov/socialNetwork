import {instance} from "./api";
import {ResultCode} from "./api";
import {UsersType} from "../Types/types";


export type GetUsersDataType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type ApiResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {}
}
export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10, term = "", friend = null as null | boolean) {
        return instance
            .get<GetUsersDataType>(`/users`, {
                params: {
                    page: currentPage,
                    count: pageSize,
                    term: term,
                    friend: friend
                }
            })
            .then((result) => {
                return result.data
            })
    },
    async subscribe(id: number) {
        return instance.post<ApiResponseType>(`/follow/${id}`).then(res => res.data);
    },
    async unsubscribe(id: number) {
        return instance.delete<ApiResponseType>(`/follow/${id}`).then(res => res.data);
    }
}