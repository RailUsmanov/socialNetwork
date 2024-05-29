import {actions} from "../../actions/app-actions";
import {initializedApp} from "../../thunks/app-thunk";

test("Initialized App", async ()=>{
    const thunk = initializedApp()
    const dispatch = jest.fn()
    //@ts-ignore
    await thunk(dispatch)
    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.initializedSuccess())
})