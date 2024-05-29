import {
    ActionsTypes,
    AUTH_PROFILE_PHOTOS,
    GET_CAPTCHA_SUCCESS,
    SET_AUTH_USER_DATA,
    SET_FORM_ERROR
} from "../actions/auth-actions";


let initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: undefined,
    error: null,
    authProfilePhotos: undefined
};


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case SET_FORM_ERROR:
            return {
                ...state,
                ...action.payload
            }
        case AUTH_PROFILE_PHOTOS:
            return {
                ...state,
                authProfilePhotos: action.payload.photos
            }
        default:
            return state;
    }
};
export default authReducer;

export type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaURL?: string | undefined
    error?: string | null
    authProfilePhotos?: string
}