import {ProfileType} from "../../Types/types";

export const ADD_POST = "social-network/profile/ADD_POST";
export const SET_PROFILE = "social-network/profile/SET_PROFILE";
export const TOGGLE_IS_FETCHING = "social-network/profile/TOGGLE_IS_FETCHING";
export const SET_STATUS = "social-network/profile/SET_STATUS";
export const DELETE_POST = "social-network/profile/DELETE_POST";
export const ADD_LIKE = "social-network/profile/ADD_LIKE";
export const ADD_DISLIKE = "social-network/profile/ADD_DISLIKE";




export const actions = {
    addPost: (text: string): AddPostACType => ({type: ADD_POST, payload:{text}}),
    deletePost: (postId: string):DeletePostACType=>({type: DELETE_POST, payload: {postId}}),
    setProfile: (profile: ProfileType): SetProfileACType => ({ type: SET_PROFILE, payload:{profile}}),
    setStatus: (status: string): SetStatusACType=>({type: SET_STATUS,payload: {status}}),
    toggleIsFetching: (toggle: boolean): ToggleIsFetchingACType=> ({type: TOGGLE_IS_FETCHING, payload: {toggle}}),
    addLike: (id: string): AddLikeACType =>({type: ADD_LIKE, payload:{id}}),
    addDislike: (id: string): AddDislikeACType => ({type: ADD_DISLIKE, payload:{id}})
}

export type ActionsTypes =
    | AddPostACType
    | DeletePostACType
    | SetStatusACType
    | SetProfileACType
    | ToggleIsFetchingACType
    | AddLikeACType
    | AddDislikeACType

type AddPostACType = {
    type: typeof ADD_POST
    payload:{
        text: string
    }
}
type DeletePostACType = {
    type: typeof DELETE_POST
    payload: {
        postId: string
    }
}
type SetProfileACType = {
    type: typeof SET_PROFILE
    payload:{
        profile: ProfileType
    }
}
type SetStatusACType = {
    type:typeof SET_STATUS
    payload: {
        status: string
    }
}
type ToggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING
    payload: {
        toggle: boolean
    }
}
type AddLikeACType = {
    type: typeof ADD_LIKE,
    payload: {
        id: string
    }
}
type AddDislikeACType = {
    type: typeof ADD_DISLIKE,
    payload:{
        id: string
    }
}