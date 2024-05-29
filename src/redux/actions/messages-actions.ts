export const ADD_MESSAGES = "social-network/messages/ADD_MESSAGES";
export const DELETE_MESSAGES = "social-network/messages/DELETE_MESSAGES";

export const actions = {
    addMessages: (messages: string): AddMessagesACType =>({type: ADD_MESSAGES, payload: {messages}}),
    deleteMessages: (id: string): DeleteMessagesACType =>({type: DELETE_MESSAGES, payload:{id}})
}

export type ActionsTypes =
    | AddMessagesACType
    | DeleteMessagesACType
type AddMessagesACType = {
    type: typeof ADD_MESSAGES
    payload: {
        messages: string
    }
}
type DeleteMessagesACType = {
    type: typeof DELETE_MESSAGES,
    payload: {
        id: string
    }
}