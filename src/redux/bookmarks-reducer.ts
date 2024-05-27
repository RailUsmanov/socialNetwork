const SET_BOOKMARKS = "bookmarks/SET_BOOKMARKS"
const  DELETE_BOOKMARKS = "bookmarks/DELETE_BOOKMARKS"
export type BookmarkType = {
    id: number
    text: string
}

 export type InitialStateType = {
    bookmark: Array<BookmarkType>
}

const initialState: InitialStateType = {
    bookmark: [
        {
            id: 1,
            text: "Forever and ever!"
        },
    ]
}
type ActionsTypes =
    | SetBookmarksACType
    | DeleteBookmarksACType
export  const bookmarksReducer = (state = initialState, action: ActionsTypes):  InitialStateType => {
   switch (action.type){
       case SET_BOOKMARKS:
           if (state.bookmark.some(bookmark => bookmark.id === action.payload.id)) {
               return state;
           }
           let newBookmarks = {
               id: action.payload.id,
               text: action.payload.text
           }
           return{
               ...state,
               bookmark: [...state.bookmark, newBookmarks]
           }
       case DELETE_BOOKMARKS:
           return {
               ...state,
               bookmark: state.bookmark.filter(b=> b.id !== action.payload.id)
           }
       default:
           return state
   }
}

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
export const actions = {
    setBookmarks: (text: string, id: number = Date.now()): SetBookmarksACType => ({type: SET_BOOKMARKS, payload: {text, id}}),
    deleteBookmarks:(id: number): DeleteBookmarksACType => ({type: DELETE_BOOKMARKS, payload:{id}})
}



