import messagesReducer, {InitialStateType} from "../../reducers/messages-reducer";
import {actions} from "../../actions/messages-actions";

let state: InitialStateType

beforeEach(()=>{
    state = {
        messages: [
            {
                id: "1",
                userID: 1,
                text: "Любовь и мир вечны. Джон Леннон.",
            },
            {
                id: "2",
                userID: 2,
                text: "Мечты так и остаются мечтами, если к ним не идти.",
            }
        ]
    }
})

test('Add messages success', ()=>{
    let text = "New messages text"
    let action = actions.addMessages(text)
    let newState = messagesReducer(state, action )
    expect(newState.messages[2].text).toBe(text)
    expect(newState.messages.length).toBe(3)
})

test('TDD, messages delete', ()=>{
    let action = actions.deleteMessages("2")
    let newState = messagesReducer(state, action)
    expect(newState.messages.length).toBe(1)
})