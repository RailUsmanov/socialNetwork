import {chatAPI, MessageTypeAPI, StatusType} from "../../DAL/chat-api";
import {Dispatch} from "@reduxjs/toolkit";
import {actions, ActionsType} from "../actions/chat-actions";
import {BaseThunkType} from "../redux-store";

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
type ThunkType = BaseThunkType<ActionsType>