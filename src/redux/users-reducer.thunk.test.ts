import {action, getUsers, subscribe, unsubscribe} from "./users-reducer";
import {ApiResponseType, GetUsersDataType, usersAPI} from "../DAL/users-api";
import {ResultCode} from "../DAL/api";
jest.mock("../DAL/users-api")

const usersApiMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatch = jest.fn()
const getState= jest.fn()
beforeEach(()=>{
    dispatch.mockClear()
    getState.mockClear()
})

const result: ApiResponseType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {},
}
const resultGetUsers: GetUsersDataType = {
    items: [
        {
            id: 1,
            name: "Roma",
            followed: true,
            photos: {
                small: undefined,
                large: undefined
            },
            status: ""
        },
        {
            id: 2,
            name: "Roma2",
            followed: true,
            photos: {
                small: undefined,
                large: undefined
            },
            status: ""
        }
    ],
    error: null,
    totalCount: 100
}


test("Success subscribe thunk", async ()=>{
    usersApiMock.subscribe.mockReturnValue(Promise.resolve(result))
    const thunk = subscribe(3)
   await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1,action.toggleIsFollowingProgress(true, 3))
    expect(dispatch).toHaveBeenNthCalledWith(2,action.subscribeSuccess( 3))
    expect(dispatch).toHaveBeenNthCalledWith(3,action.toggleIsFollowingProgress(false, 3))
})

test("Success unsubscribe thunk", async  ()=>{
    usersApiMock.unsubscribe.mockReturnValue(Promise.resolve(result))
    const thunk = unsubscribe(3)
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1,action.toggleIsFollowingProgress(true, 3))
    expect(dispatch).toHaveBeenNthCalledWith(2,action.unsubscribeSuccess( 3))
    expect(dispatch).toHaveBeenNthCalledWith(3,action.toggleIsFollowingProgress(false, 3))
})

test("Get Users success thunk", async ()=>{
    usersApiMock.getUsers.mockReturnValue(Promise.resolve(resultGetUsers))
    const thunk = getUsers()
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(4)
    expect(dispatch).toHaveBeenNthCalledWith(1, action.toggleIsFetching(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, action.setUsers(resultGetUsers.items))
    expect(dispatch).toHaveBeenNthCalledWith(3, action.setTotalCount(resultGetUsers.totalCount))
    expect(dispatch).toHaveBeenNthCalledWith(4, action.toggleIsFetching(false))
})