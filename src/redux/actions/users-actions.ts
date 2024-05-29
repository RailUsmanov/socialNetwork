import {UsersType} from "../../Types/types";

export const SUBSCRIBE = "social-network/friends/SUBSCRIBE";
export const UNSUBSCRIBE = "social-network/friends/UNSUBSCRIBE";
export const SET_USERS = "social-network/friends/SET_USERS";
export const SET_TOTAL_COUNT = "social-network/friends/SET_TOTAL_COUNT";
export const SET_CURRENT_PAGE = "social-network/friends/SET_CURRENT_PAGE";
export const TOGGLE_IS_FETCHING = "social-network/friends/TOGGLE_IS_FETCHING";
export const TOGGLE_IS_FOLLOWING_PROGRESS = "social-network/friends/TOGGLE_IS_FOLLOWING_PROGRESS";
export const SET_FILTERS = "social-network/friends/SET_FILTERS";

export const actions = {
    toggleIsFollowingProgress: (toggle: boolean, userId: number):ToggleIsFollowingProgressACType =>{
        return {
            type: TOGGLE_IS_FOLLOWING_PROGRESS,
            payload: {
                toggle,
                userId,
            }
        }
    },
    toggleIsFetching: (toggle: boolean): ToggleIsFetchingACType =>({type: TOGGLE_IS_FETCHING,
        payload: {toggle}}),
    subscribeSuccess: (id: number): SubscribeSuccessACType =>({type: SUBSCRIBE,payload: {id}}),
    unsubscribeSuccess: (id: number): UnsubscribeSuccessACType =>({type: UNSUBSCRIBE, payload:{id}}),
    setUsers: (users: Array<UsersType>): SetUsersACType => ({type: SET_USERS, payload:{users}}),
    setTotalCount: (count: number): SetTotalCountACType =>({type: SET_TOTAL_COUNT, payload: {count}}),
    setCurrentPage: (current: number): SetCurrentPageACType =>({type: SET_CURRENT_PAGE, payload: {current}}),
    setFilters: (filters: FiltersType): SetFiltersACType => ({
        type: SET_FILTERS,
        payload: filters,
    }),
}


export type ActionsTypes =
    |SetCurrentPageACType
    | SetTotalCountACType
    | SetUsersACType
    | UnsubscribeSuccessACType
    | SubscribeSuccessACType
    | ToggleIsFetchingACType
    | ToggleIsFollowingProgressACType
    | SetFiltersACType


type ToggleIsFollowingProgressACType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    payload: {
        toggle: boolean
        userId: number
    }
}
type ToggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING
    payload: {
        toggle: boolean
    }
}
type SubscribeSuccessACType = {
    type: typeof SUBSCRIBE
    payload: {
        id: number
    }
}
type UnsubscribeSuccessACType = {
    type: typeof UNSUBSCRIBE
    payload:{
        id: number
    }
}
type SetUsersACType = {
    type: typeof SET_USERS,
    payload:{
        users: Array<UsersType>
    }
}
type SetTotalCountACType = {
    type: typeof SET_TOTAL_COUNT,
    payload: {
        count: number
    }
}
type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    payload: {
        current: number
    }
}
export type FiltersType = {
    term: string;
    friend: boolean | null;
};
type SetFiltersACType = {
    type: typeof SET_FILTERS;
    payload: FiltersType;
};