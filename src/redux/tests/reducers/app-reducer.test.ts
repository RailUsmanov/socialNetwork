import {appReducer, InitialStateType} from "../../reducers/app-reducer";
import {actions} from "../../actions/app-actions";

let state: InitialStateType

beforeEach(() => {
    state = {
        initialized: false
    }
})

test('Initialized success', () => {
    let action = actions.initializedSuccess()
    let newState = appReducer(state, action)
    expect(newState.initialized).toBe(true)
})