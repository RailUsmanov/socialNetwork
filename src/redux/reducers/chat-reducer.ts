import {chatAPI, MessageTypeAPI, StatusType} from "../DAL/chat-api";
import {BaseThunkType} from "./redux-store";
import {Dispatch} from "@reduxjs/toolkit";
import uuid from "react-uuid";

const START_MESSAGE_PROCESSING = 'chat/START_MESSAGE_PROCESSING'
const STOP_MESSAGES_PROCESSING = 'chat/STOP_MESSAGES_PROCESSING'
const STATUS_CHANGED = 'chat/STATUS_CHANGED'

type MessagesType = MessageTypeAPI & {id: string}
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
export const actions = {
    startMessagesProcessing: (messages: MessageTypeAPI[]): MessagesReceivedACType => {
        return {
            type: START_MESSAGE_PROCESSING,
            payload: {messages}
        }
    },
    stopMessagesProcessing: (): StopMessagesProcessingACType => {
        return {
            type: STOP_MESSAGES_PROCESSING
        }
    },
    statusChanged: (status: StatusType): StatusChangedACType => {
        return {
            type: STATUS_CHANGED,
            payload: {
                status: status
            }
        }
    }
}
let _newMessagesHandler: ((messages: MessageTypeAPI[]) => void) | null = null
let _statusChangingHandler: ((status: StatusType) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.startMessagesProcessing(messages))
        }
    }
    return _newMessagesHandler
}
const newStatusHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if (_statusChangingHandler === null) {
        _statusChangingHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangingHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    dispatch(actions.stopMessagesProcessing());
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status-changes', newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changes', newStatusHandlerCreator(dispatch))
    dispatch(actions.stopMessagesProcessing())
}
export const sendMessages = (messages: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessages(messages)
}

export type InitialStateType = typeof initialState
type ActionsType =
    | MessagesReceivedACType
    | StopMessagesProcessingACType
    | StatusChangedACType

type MessagesReceivedACType = {
    type: typeof START_MESSAGE_PROCESSING,
    payload: {
        messages: MessageTypeAPI[]
    }
}
type StopMessagesProcessingACType = {
    type: typeof STOP_MESSAGES_PROCESSING
}
type StatusChangedACType = {
    type: typeof STATUS_CHANGED,
    payload: {
        status: StatusType
    }
}

type ThunkType = BaseThunkType<ActionsType>