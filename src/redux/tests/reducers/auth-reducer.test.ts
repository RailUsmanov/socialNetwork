import authReducer, {InitialStateType} from '../../reducers/auth-reducer';
import {actions} from '../../actions/auth-actions';


let state: InitialStateType

beforeEach(() => {
    state = {
        id: 3,
        login: "rer",
        isAuth: false,
        email: "email@mail.com",
        captchaURL: "captcha URL",
        error: null,
        authProfilePhotos: "https://...."
    }
})

test('Set form error', () => {
    let errorText = 'error Text'
    let action = actions.setFormError(errorText)
    let newState = authReducer(state, action)
    expect(newState.error).toBe(errorText)
})
test('Set auth user data', () => {
    let action = actions.setAuthUserData(1, "login",
        "email", true, undefined)
    let newState = authReducer(state, action)
    expect(newState.id).toBe(1)
    expect(newState.isAuth).toBe(true)
    expect(newState.email).toBe("email")
    expect(newState.login).toBe("login")
    expect(newState.captchaURL).toBe(undefined)
})

test('Get captcha success', () => {
    let captchaURL = "https://..."
    let action = actions.getCaptchaSuccess(captchaURL)
    let newState = authReducer(state, action)
    expect(newState.captchaURL).toBe(captchaURL)
})

test("Auth profile photos", () => {
    let photos = "Profile photos url"
    let action = actions.authProfilePhotos(photos)
    let newState = authReducer(state, action)
    expect(newState.authProfilePhotos).toBe(photos)
})