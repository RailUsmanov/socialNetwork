export const SET_AUTH_USER_DATA = "social-network/auth/SET_AUTH_USER_DATA";
export const GET_CAPTCHA_SUCCESS = "social-network/auth/GET_CAPTCHA_SUCCESS";
export const SET_FORM_ERROR = "social-network/auth/SET_FORM_ERROR";
export const AUTH_PROFILE_PHOTOS = "social-network/auth/AUTH_PROFILE_PHOTOS";
export const actions = {
    setFormError: (error: string): SetFormErrorACType => ({type: SET_FORM_ERROR, payload: {error}}),
    setAuthUserData: (id: number | null, login: string | null, email: string | null,
                      isAuth: boolean, captchaURL: string | undefined): SetAuthUserDataACType => {
        return {
            type: SET_AUTH_USER_DATA,
            payload: {id, login, email, isAuth, captchaURL}
        }
    },
    getCaptchaSuccess: (captchaURL: string): GetCaptchaSuccessACType => {
        return {
            type: GET_CAPTCHA_SUCCESS,
            payload: {captchaURL}
        }
    },
    authProfilePhotos: (photos: string): AuthProfilePhotosACType => {
        return {
            type: AUTH_PROFILE_PHOTOS,
            payload: {photos}
        }
    }

}

export type ActionsTypes =
    | SetFormErrorACType
    | SetAuthUserDataACType
    | GetCaptchaSuccessACType
    | AuthProfilePhotosACType

type SetFormErrorACType = {
    type: typeof SET_FORM_ERROR
    payload: {
        error: string
    }
}
type SetAuthUserDataACType = {
    type: typeof SET_AUTH_USER_DATA
    payload: {
        id: number | null
        login: string | null
        email: string | null
        isAuth: boolean
        captchaURL?: string | undefined
    }
}
type GetCaptchaSuccessACType = {
    type: typeof GET_CAPTCHA_SUCCESS
    payload: {
        captchaURL: string
    }
}
type AuthProfilePhotosACType = {
    type: typeof AUTH_PROFILE_PHOTOS,
    payload: {
        photos: string
    }
}