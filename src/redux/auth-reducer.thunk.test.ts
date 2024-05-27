import {authApi, AuthMeDataType, LoginDataType, LogoutDataType} from "../DAL/auth-api";
import {ResultCode} from "../DAL/api";
import {actions, getAuthUserData, getCaptcha, login, logout} from "./auth-reducer";
import {CaptchaDataType, security} from "../DAL/security-api";

jest.mock("../DAL/auth-api")
jest.mock("../DAL/security-api")
const authApiMock = authApi as jest.Mocked<typeof authApi>
const securityMock = security as jest.Mocked<typeof security>
const dispatch = jest.fn()
const getState = jest.fn()
beforeEach(() => {
    dispatch.mockClear()
    getState.mockClear()
})

const resultLogin: LoginDataType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {}
}
const resultLogout: LogoutDataType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {}
}
const resultGetAuthUserData: AuthMeDataType = {
    data: {
        email: "Roman",
        login: "Roman Mock",
        id: 1,
        captchaURL: undefined
    },
    resultCode: ResultCode.Success,
    messages: []
}
const resultGetCaptcha:  CaptchaDataType = {
    url: "http"
}
test("Login success", async () => {
    authApiMock.login.mockReturnValue(Promise.resolve(resultLogin))
    const thunk = login("r@gmail.com", "rrrr",
        true, undefined)
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
})

test("Logout success", async () => {
    authApiMock.logout.mockReturnValue(Promise.resolve(resultLogout))
    const thunk = logout()
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.setAuthUserData(null, null,
                                                                            null, false,
                                                                                undefined))
})
test("Get auth user Data success", async ()=>{
    authApiMock.authMe.mockReturnValue(Promise.resolve(resultGetAuthUserData))
    const thunk =  getAuthUserData()
    await thunk(dispatch, getState, {})
    let {id, login, email, captchaURL} = resultGetAuthUserData.data
    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.setAuthUserData(id,login, email, true, captchaURL))
})

test("Get Captcha success",async ()=>{
    securityMock.captcha.mockReturnValue(Promise.resolve(resultGetCaptcha))
    const thunk =  getCaptcha()
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.getCaptchaSuccess(resultGetCaptcha.url))
})