export const INITIALIZED_SUCCESS = "social-network/app/INITIALIZED_SUCCESS";
export const actions = {
    initializedSuccess: ():InitializedSuccessType=>({type: INITIALIZED_SUCCESS})
}
export type ActionsTypes = InitializedSuccessType
export type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}