import {MessageTypeAPI, StatusType} from "../../DAL/chat-api";
import uuid from "react-uuid";
import {ActionsType, START_MESSAGE_PROCESSING, STATUS_CHANGED, STOP_MESSAGES_PROCESSING} from "../actions/chat-actions";


type MessagesType = MessageTypeAPI & { id: string }
let initialState = {
    messages: [] as MessagesType[],
    status: "pending" as StatusType
}
export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case START_MESSAGE_PROCESSING:
            return {
                ...state,
                messages: [...state.messages,
                    ...action.payload.messages.map((m)=>({
                        ...m, id: uuid()
                    }))].filter((m, index, array) => index >= array.length - 100)
            }
        case STOP_MESSAGES_PROCESSING:
            return {
                ...state,
                messages: []
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}


export type InitialStateType = typeof initialState


