import {configureStore, combineReducers, Action, ThunkAction} from '@reduxjs/toolkit'
import profileReducer from "./reducers/profile-reducer";
import messagesReducer from "./reducers/messages-reducer";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import {appReducer} from "./reducers/app-reducer";
import {bookmarksReducer} from "./reducers/bookmarks-reducer";
import {chatReducer} from "./reducers/chat-reducer";

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