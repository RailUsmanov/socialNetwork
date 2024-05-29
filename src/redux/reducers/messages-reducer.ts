import {ActionsTypes, ADD_MESSAGES, DELETE_MESSAGES} from "../actions/messages-actions";
import uuid from "react-uuid";

type MessagesType = {
    id: string
    userID: number
    text: string
}
export type InitialStateType = {
    messages: Array<MessagesType>
}


const initialState: InitialStateType = {
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
        },
        {
            id: "3",
            userID: 1,
            text: "Даже если вас съели – у вас два выхода.",
        },
    ],
};


const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGES:
            let newMessage = {
                id: uuid(),
                userID: 1,
                text: action.payload.messages,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        case DELETE_MESSAGES:
            return {
                ...state,
                messages: state.messages.filter(m=>{
                    return m.id !== action.payload.id
                })
            }
        default:
            return state;
    }
};

export default messagesReducer;
