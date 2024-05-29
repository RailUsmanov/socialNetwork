import {MessageTypeAPI, StatusType} from "../../DAL/chat-api";

export const START_MESSAGE_PROCESSING = "social-network/chat/START_MESSAGE_PROCESSING";
export const STOP_MESSAGES_PROCESSING = "social-network/chat/STOP_MESSAGES_PROCESSING";
export const STATUS_CHANGED = "social-network/chat/STATUS_CHANGED";
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
export type ActionsType =
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