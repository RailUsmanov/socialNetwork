import {configureStore, combineReducers, Action, ThunkAction} from '@reduxjs/toolkit'
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {bookmarksReducer} from "./bookmarks-reducer";
import {chatReducer} from "./chat-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer,
    auth: authReducer,
    bookmarks: bookmarksReducer,
    app: appReducer,
    chat: chatReducer
})

const store = configureStore({
    reducer: rootReducer
})



export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch

//Супер тип для Thunk
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>

//не используеться, угадывание типов Actions(при использование дописываем к actions (as const))
type PropertiesType<T> = T extends {[key: string]: infer U } ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>