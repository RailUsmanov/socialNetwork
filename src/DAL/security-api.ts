import {instance} from "./api";

export const security = {
    captcha() {
        return instance.get<CaptchaDataType>(`/security/get-captcha-url`).then(result => {
            return result.data
        })
    }
}
export type CaptchaDataType = {
    url: string
}