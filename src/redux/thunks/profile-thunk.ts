import {BaseThunkType} from "../redux-store";
import {actions, ActionsTypes} from "../actions/profile-actions";
import {profileApi} from "../../DAL/profile-api";
import {ResultCode} from "../../DAL/api";
import {ProfileType} from "../../Types/types";

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
