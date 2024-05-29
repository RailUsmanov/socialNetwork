import {BaseThunkType} from "../redux-store";
import {actions, ActionsTypes} from "../actions/app-actions";
import {getAuthUserData} from "./auth-thunk";


type ThunkType = BaseThunkType<ActionsTypes>
export const initializedApp = (): ThunkType => async (dispatch) => {
    try {
        await dispatch(getAuthUserData());
        dispatch(actions.initializedSuccess());
    } catch (error) {
        console.error(error)
    }

};