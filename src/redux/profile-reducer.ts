import {ResultCode} from "../DAL/api";
import {BaseThunkType} from "./redux-store";
import {profileApi} from "../DAL/profile-api";
import {ProfileType} from "../Types/types";
import uuid from "react-uuid";

const ADD_POST = "profile/ADD_POST";
const SET_PROFILE = "profile/SET_PROFILE";
const TOGGLE_IS_FETCHING = "profile/TOGGLE_IS_FETCHING";
const SET_STATUS = "profile/SET_STATUS";
const DELETE_POST = "profile/DELETE_POST";
export type PostType = {
    id: number
    text: string
    like: number
    disLike: number
}

export type InitialStateType = {
    profile: Array<ProfileType>
    posts: Array<PostType>
    status: string
    isFetching: boolean
}

const initialState: InitialStateType = {
    profile: [],
    posts: [
        {
            id: 1,
            text: "Любовь и мир вечны. Джон Леннон.",
            like: 200,
            disLike: 1
        },
        {
            id: 2,
            text: "Мечты так и остаются мечтами, если к ним не идти.",
            like: 333,
            disLike: 20
        },
        {
            id: 3,
            text: "Даже если вас съели – у вас два выхода.",
            like: 2123,
            disLike: 0
        },
    ],
    status: "",
    isFetching: false,
};

type ActionsTypes =
    | AddPostACType
    | DeletePostACType
    | SetStatusACType
    | SetProfileACType
    | ToggleIsFetchingACType
const profileReducer = (state = initialState, action: ActionsTypes):  InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: Number(uuid()),
                text: action.payload.text,
                like: 0,
                disLike: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload.postId)
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: [action.payload.profile],
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.payload.status,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload.toggle,
            };
        default:
            return state;
    }
};

type AddPostACType = {
    type: typeof ADD_POST
    payload:{
        text: string
    }
}
type DeletePostACType = {
    type: typeof DELETE_POST
    payload: {
        postId: number
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
export const actions = {
    addPost: (text: string): AddPostACType => ({type: ADD_POST, payload:{text}}),
    deletePost: (postId: number):DeletePostACType=>({type: DELETE_POST, payload: {postId}}),
    setProfile: (profile: ProfileType): SetProfileACType => ({ type: SET_PROFILE, payload:{profile}}),
    setStatus: (status: string): SetStatusACType=>({type: SET_STATUS,payload: {status}}),
    toggleIsFetching: (toggle: boolean): ToggleIsFetchingACType=> ({type: TOGGLE_IS_FETCHING, payload: {toggle}})
}


type ThunkType = BaseThunkType<ActionsTypes>
export const addProfile = (userId: number): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        let result = await profileApi.setProfile(userId)
        dispatch(actions.setProfile(result.data));
        dispatch(actions.toggleIsFetching(false));
    } catch (error) {
        console.error(error)
    }

};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    try {
        let data = await profileApi.getStatus(userId)
        dispatch(actions.setStatus(data));
    } catch (error) {
        console.error(error)
    }

};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileApi.updateStatus(status)
        if (data.resultCode === ResultCode.Success) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        console.error(error)
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch, getState) => {
    try {
        let data = await profileApi.setPhotoProfile(file);
        let id = getState().auth.id
        if (id !== null) {
            if (data.resultCode === ResultCode.Success) {
                dispatch(addProfile(id));
            }
        }

    } catch (error) {
        console.error(error)
    }

}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    try {
        const id = getState().auth.id
        let data = await profileApi.saveProfileInfo(profile);
        if (data.resultCode === ResultCode.Success) {
            if (id !== null) {
                dispatch(addProfile(id))
            }
        }
    } catch (error) {
        console.error(error)
    }

}

export default profileReducer;
