import {updateObjectInArray} from "../utils/reduser-objectHelper";
import {Dispatch} from "@reduxjs/toolkit";
import {BaseThunkType} from "./redux-store";
import {ApiResponseType, usersAPI} from "../DAL/users-api";
import {UsersType} from "../Types/types";
import {ResultCode} from "../DAL/api";

const SUBSCRIBE = "friends/SUBSCRIBE";
const UNSUBSCRIBE = "friends/UNSUBSCRIBE";
const SET_USERS = "friends/SET_USERS";
const SET_TOTAL_COUNT = "friends/SET_TOTAL_COUNT";
const SET_CURRENT_PAGE = "friends/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "friends/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "friends/TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_FILTERS = "friends/SET_FILTERS";


const initialState = {
    users: [] as Array<UsersType>,
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: [] as Array<number>, // array of users id
    filters: {
        term: "",
        friend: null as boolean | null, // null means "all"
    },
};

type InitialStateType = typeof initialState
export type ActionsTypes =
    |SetCurrentPageACType
    | SetTotalCountACType
    | SetUsersACType
    | UnsubscribeSuccessACType
    | SubscribeSuccessACType
    | ToggleIsFetchingACType
    | ToggleIsFollowingProgressACType
    | SetFiltersACType

const friendsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SUBSCRIBE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.id, "id", {followed: true})
            };
        case UNSUBSCRIBE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.id, "id", {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload.users
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload.count,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.current,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload.toggle,
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.payload.toggle
                    ? [...state.isFollowingProgress, action.payload.userId]
                    : state.isFollowingProgress.filter((id) => id !== action.payload.userId),
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };

        default:
            return state;
    }
};


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




export const action = {
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







type ThunkType = BaseThunkType<ActionsTypes>
export const getUsers = (
    currentPage?: number,
    pageSize?: number,
    filters?: FiltersType
): ThunkType => async (dispatch) => {
    try {
        dispatch(action.toggleIsFetching(true));
        let data = await usersAPI.getUsers(
            currentPage,
            pageSize,
            filters?.term,
            filters?.friend
        );
        dispatch(action.setUsers(data.items));
        if (filters) {
            dispatch(action.setFilters(filters));
        }
        dispatch(action.setTotalCount(data.totalCount));
        dispatch(action.toggleIsFetching(false));
    } catch (error) {
        console.error(error);
        dispatch(action.toggleIsFetching(false));
    }
};

type DispatchType = Dispatch<ActionsTypes>
const _subscribeUnsubscribeFlow = async (dispatch: DispatchType,
                                        apiMethod: (id: number) => Promise<ApiResponseType> ,
                                        actionCreator: (id: number) => ActionsTypes,
                                        id: number ) => {

        dispatch(action.toggleIsFollowingProgress(true, id));
        let result = await apiMethod(id);
        if (result.resultCode === ResultCode.Success) {
            dispatch(actionCreator(id));
        }
        dispatch(action.toggleIsFollowingProgress(false, id));

}

export const subscribe = (id: number): ThunkType  => async (dispatch) => {
        let apiMethod = usersAPI.subscribe.bind(usersAPI)
        let actionCreator = action.subscribeSuccess
       await _subscribeUnsubscribeFlow(dispatch, apiMethod, actionCreator, id)

};

export const unsubscribe = (id: number): ThunkType => async (dispatch) => {
        let apiMethod = usersAPI.unsubscribe.bind(usersAPI)
        let actionCreator = action.unsubscribeSuccess
        await _subscribeUnsubscribeFlow(dispatch, apiMethod, actionCreator, id)

};

export default friendsReducer;
