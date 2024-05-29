import {ActionsTypes, DELETE_BOOKMARKS, SET_BOOKMARKS} from "../actions/bookmarks-actions";



const initialState: InitialStateType = {
    bookmark: [
        {
            id: 1,
            text: "Forever and ever!"
        },
    ]
}

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

export type BookmarkType = {
    id: number
    text: string
}

export type InitialStateType = {
    bookmark: Array<BookmarkType>
}
