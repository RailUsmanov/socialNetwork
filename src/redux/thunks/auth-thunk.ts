import {BaseThunkType} from "../redux-store";
import {actions, ActionsTypes} from "../actions/auth-actions";
import {security} from "../../DAL/security-api";
import {profileApi} from "../../DAL/profile-api";
import {authApi} from "../../DAL/auth-api";
import {ResultCode, ResultCodeCaptchaResult} from "../../DAL/api";

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

