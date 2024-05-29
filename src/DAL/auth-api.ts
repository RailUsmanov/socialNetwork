import {instance, ResultCode, ResultCodeCaptchaResult} from "./api";


export const authApi = {
    login(email: string, password: string, rememberMe: boolean, captcha: string | undefined) {
        return instance.post<LoginDataType>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(result => result.data)
    },
    logout() {
        return instance.delete<LogoutDataType>(`/auth/login`)
            .then(result => result.data)
    },
    authMe() {
        return instance.get<AuthMeDataType>(`/auth/me`).then((result) => {
            return result.data
        });
    }
}

export type LoginDataType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {}
}
export type LogoutDataType = {
    resultCode: ResultCode | ResultCodeCaptchaResult
    messages: Array<string>
    data: {}
}

export type AuthMeDataType = {
    data: {
        id: number
        email: string
        login: string
        captchaURL?: string | undefined
    }
    resultCode: ResultCode
    messages: Array<string>
}