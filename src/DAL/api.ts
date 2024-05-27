import axios from "axios";

export const instance = axios.create({
      baseURL: "https://social-network.samuraijs.com/api/1.0",
      withCredentials: true,
      headers: {"API-KEY": "5a6096ce-ce97-450d-9320-04e463d5e4f1"}
})
export enum ResultCode {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaResult {
    getCaptcha = 10
}


