import initializedApp, {actions} from "./app-reducer";
import {getAuthUserData} from "./auth-reducer";

test("", async ()=>{
    const thunk = initializedApp()
    const dispatch = jest.fn()
    //@ts-ignore
    await thunk(dispatch)
    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.initializedSuccess())
})