import {ActionsTypes, INITIALIZED_SUCCESS} from "../actions/app-actions";
const initialState = {
    initialized: false,
};
export type InitialStateType = typeof initialState
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
}

