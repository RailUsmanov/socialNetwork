const ADD_MESSAGES = "messages/ADD_MESSAGES";
type MessagesType = {
    id: number
    text: string
}
export type InitialStateType = {
    messages: Array<MessagesType>
}


const initialState: InitialStateType = {
    messages: [
        {
            id: 1,
            text: "Любовь и мир вечны. Джон Леннон.",
        },
        {
            id: 2,
            text: "Мечты так и остаются мечтами, если к ним не идти.",
        },
        {
            id: 3,
            text: "Даже если вас съели – у вас два выхода.",
        },
    ],
};

type ActionsTypes = AddMessagesACType
const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGES:
            let newMessage = {
                id: Date.now(),
                text: action.payload.messages,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
};


type AddMessagesACType = {
    type: typeof ADD_MESSAGES
    payload: {
        messages: string
    }
}
export const action = {
    addMessages: (messages: string): AddMessagesACType =>({type: ADD_MESSAGES, payload: {messages}})
}

export default messagesReducer;
