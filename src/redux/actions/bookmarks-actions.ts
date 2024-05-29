export const SET_BOOKMARKS = "social-network/bookmarks/SET_BOOKMARKS";
export const  DELETE_BOOKMARKS = "social-network/bookmarks/DELETE_BOOKMARKS";
export const actions = {
    setBookmarks: (text: string, id: number = Date.now()): SetBookmarksACType => ({type: SET_BOOKMARKS, payload: {text, id}}),
    deleteBookmarks:(id: number): DeleteBookmarksACType => ({type: DELETE_BOOKMARKS, payload:{id}})
}
export type ActionsTypes =
    | SetBookmarksACType
    | DeleteBookmarksACType

type SetBookmarksACType = {
    type: typeof SET_BOOKMARKS
    payload: {
        text: string
        id: number
    }
}
type DeleteBookmarksACType = {
    type: typeof  DELETE_BOOKMARKS
    payload: {
        id: number
    }
}


