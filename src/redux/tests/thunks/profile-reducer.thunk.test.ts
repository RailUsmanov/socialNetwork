import {profileApi, SetPhotoProfileDataType, UpdateStatusDataType} from "../../../DAL/profile-api";
import {ProfileType} from "../../../Types/types";
import {addProfile, getUserStatus, savePhoto, updateUserStatus} from "../../thunks/profile-thunk";
import {actions} from "../../actions/profile-actions";
import {ResultCode} from "../../../DAL/api";

jest.mock("../../../DAL/profile-api")

const profileAPIMock = profileApi as jest.Mocked<typeof profileApi>

const dispatch = jest.fn()
const getState = jest.fn()

beforeEach(()=>{
    dispatch.mockClear()
    getState.mockClear()
})

const resultAddProfile:  ProfileType = {
    userId: 1,
    photos: {
        small: "https://....",
        large: "https://...."
    },
    aboutMe: "About me",
    contacts: {
        github: "github",
        facebook: "facebook",
        instagram: "instagram",
        mainLink: "mainLink",
        twitter: "twitter",
        website: "website",
        youtube: "youtube",
        vk: "vk"
    },
    fullName: "Roman",
    lookingForAJob: true,
    lookingForAJobDescription: "React Developers"
}

const resolveStatus: string = "My Status"
const updateStatusResole :  UpdateStatusDataType = {
    data: {},
    messages: ['cs'],
    resultCode: ResultCode.Success
}
const savePhotoProfileResole : SetPhotoProfileDataType = {
    data: {
        small: 'https://.......',
        large: 'https://.......'
    },
    messages: [],
    resultCode: ResultCode.Success
}
test('Success add profile', async ()=>{
    // @ts-ignore  TypeScript не может точно определить, что именно возвращает замененный модуль, и поэтому генерирует ошибку.
    profileAPIMock.setProfile.mockReturnValue(Promise.resolve({data: resultAddProfile}))
    const thunk = addProfile(1)
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, (actions.toggleIsFetching(true)))
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.setProfile(resultAddProfile))
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.toggleIsFetching(false))
})

test("Get user status success", async ()=>{
    profileAPIMock.getStatus.mockReturnValue(Promise.resolve(resolveStatus))
    const thunk = getUserStatus(1)
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.setStatus(resolveStatus))
})

test("Update user status success", async ()=>{
    profileAPIMock.updateStatus.mockReturnValue(Promise.resolve(updateStatusResole))
    const statusText  = "status"

    const thunk = updateUserStatus(statusText)
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.setStatus(statusText))
})

//todo Научиться тестировать thunk в котором dispatch(thunk), осталось savePhoto и saveProfile
