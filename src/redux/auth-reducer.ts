import {ResultCode, ResultCodeCaptchaResult} from "../DAL/api";
import {BaseThunkType} from "./redux-store";
import {authApi} from "../DAL/auth-api";
import {security} from "../DAL/security-api";
import {profileApi} from "../DAL/profile-api";


const SET_AUTH_USER_DATA = "auth/SET_AUTH_USER_DATA";
const GET_CAPTCHA_SUCCESS = "auth/GET_CAPTCHA_SUCCESS";
const SET_FORM_ERROR = "auth/SET_FORM_ERROR";
const AUTH_PROFILE_PHOTOS = "auth/AUTH_PROFILE_PHOTOS";

export type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaURL?: string | undefined
    error?: string | null
    authProfilePhotos?:  string
}
let initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: undefined,
    error: null,
    authProfilePhotos:  undefined
};

type ActionsTypes =
    | SetFormErrorACType
    | SetAuthUserDataACType
    | GetCaptchaSuccessACType
    | AuthProfilePhotosACType
const authReducer = ( state = initialState, action: ActionsTypes ): InitialStateType => {
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


type SetFormErrorACType = {
    type: typeof SET_FORM_ERROR
    payload:{
        error: string
    }
}
type SetAuthUserDataACType = {
    type: typeof SET_AUTH_USER_DATA
    payload:{
        id: number | null
        login: string | null
        email: string | null
        isAuth: boolean
        captchaURL?: string | undefined
    }
}
type GetCaptchaSuccessACType = {
    type: typeof GET_CAPTCHA_SUCCESS
    payload:{
        captchaURL: string
    }
}
type AuthProfilePhotosACType = {
    type: typeof AUTH_PROFILE_PHOTOS,
    payload: {
        photos: string
    }
}

export const actions = {
    setFormError: (error: string): SetFormErrorACType => ({type: SET_FORM_ERROR, payload: {error}}),
    setAuthUserData: (id: number | null, login: string | null, email: string | null,
                      isAuth: boolean, captchaURL: string | undefined): SetAuthUserDataACType => {
        return {
            type: SET_AUTH_USER_DATA,
            payload: { id, login, email, isAuth, captchaURL }
        }
    },
    getCaptchaSuccess: (captchaURL: string): GetCaptchaSuccessACType => {
        return {
            type: GET_CAPTCHA_SUCCESS,
            payload: { captchaURL }
        }
    },
    authProfilePhotos: (photos: string): AuthProfilePhotosACType => {
        return {
            type: AUTH_PROFILE_PHOTOS,
            payload: { photos }
        }
    }

}
type ThunkType = BaseThunkType<ActionsTypes>
export const getCaptcha = (): ThunkType => async (dispatch) => {
    try {
        const data = await security.captcha()
        const captchaURL = data.url
        dispatch(actions.getCaptchaSuccess(captchaURL))
    } catch (error) {
        console.error(error)
    }

}
const authPhotos = (id: number): ThunkType => async (dispatch)=>{
    const data = await profileApi.setProfile(id)
    const photos = data.data.photos.large
    if(photos){
        dispatch(actions.authProfilePhotos(photos))
    }
}
export const getAuthUserData = ():ThunkType => async (dispatch) => {
    try {
        const data = await authApi.authMe()
        if (data.resultCode === 0) {
            let {id, login, email, captchaURL} = data.data;
            dispatch(actions.setAuthUserData(id, login, email, true, captchaURL = undefined));
            dispatch(authPhotos(id))
        }
    } catch (error) {
        console.error(error)
    }

}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string | undefined): ThunkType => async (dispatch) => {
    try {
        let data = await authApi.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCode.Success) {
            dispatch(getAuthUserData());
        } else {
            if (Number(data.resultCode) === ResultCodeCaptchaResult.getCaptcha) {
                dispatch(getCaptcha());
            }else if(data.resultCode === ResultCode.Error){
                console.error('fefefe')
            }
            let errorMessage = data.messages.length > 0 ? data.messages[0] : "Some Error";
            dispatch(actions.setFormError(errorMessage));
            return Promise.reject(errorMessage); // Возвращаем Promise с сообщением об ошибке

        }
    } catch (error) {
        dispatch(actions.setFormError('Some Error')); // Устанавливаем сообщение об ошибке в случае ошибки запроса
        console.error(error);
        return Promise.reject('Some Error'); // Возвращаем Promise с сообщением об ошибке
    }
};
export const logout = (): ThunkType => async (dispatch) => {
    try {
        let data = await authApi.logout()
        if (data.resultCode === ResultCode.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false, undefined))
        }
    } catch (error) {
        console.error(error)
    }
}


export default authReducer;
