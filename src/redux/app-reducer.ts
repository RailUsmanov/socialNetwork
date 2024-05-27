import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType} from "./redux-store";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS";

type InitialStateType = {
    initialized: boolean
}


const initialState: InitialStateType = {
    initialized: false,
};

export type ActionsTypes = InitializedSuccessType
export const appReducer = (state  = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

export const actions = {
    initializedSuccess: ():InitializedSuccessType=>({type: INITIALIZED_SUCCESS})
}

type ThunkType = BaseThunkType<ActionsTypes>
export const initializedApp = (): ThunkType => async (dispatch) => {
    try {
        await dispatch(getAuthUserData());
        dispatch(actions.initializedSuccess());
    } catch (error) {
        console.error(error)
    }

};

export default initializedApp

