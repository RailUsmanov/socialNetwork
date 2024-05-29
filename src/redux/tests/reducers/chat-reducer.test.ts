import {chatReducer, InitialStateType} from "./reducers/chat-reducer";
import {actions} from "./actions/chat-actions";

let state: InitialStateType;


beforeEach(()=>{
    state = {
        messages: [
            {
                message: "Hay",
                photo: "src",
                userId: 1,
                userName: "Vladimir",
                id: "2e22e"
            },
            {
                message: "Hay",
                photo: "src1",
                userId: 2,
                userName: "Ivan",
                id: "2e2232e"
            }
        ],
        status: "pending"
    }
})

test('Changing the text in the message array and changing the length of the array', ()=>{
    let action = actions.startMessagesProcessing([
        {
            message: "How are you!",
            photo: "src1",
            userId: 2,
            userName: "Ivan",
        }
    ])
    let newState = chatReducer(state, action)
    expect(newState.messages[2].message).toBe("How are you!")
    expect(newState.messages.length).toBe(3)
})
test('Check that the array is cleared when stop messages processing', ()=>{
    let action = actions.stopMessagesProcessing()
    let newState = chatReducer(state, action)
    expect(newState.messages.length).toBe(0)
})

test.each([
    ['pending', 'pending'],
    ['ready', 'ready'],
    ['error', 'error']
])('Status changed to %s', (status, expectedStatus) => {
    let action = actions.statusChanged(<"pending" | "ready" | "error">status);
    let newState = chatReducer(state, action);
    expect(newState.status).toBe(expectedStatus);
});