import {instance} from "./api";

export type CaptchaDataType = {
    url: string
}
export const security = {
    captcha() {
        return instance.get<CaptchaDataType>(`/security/get-captcha-url`).then(result => {
            return result.data
        })
    }
}