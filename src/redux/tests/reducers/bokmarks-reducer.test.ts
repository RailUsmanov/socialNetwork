import {bookmarksReducer, InitialStateType} from "./reducers/bookmarks-reducer";
import {actions} from "./actions/bookmarks-actions";

let state: InitialStateType
 beforeEach(()=>{
    state = {
        bookmark: [
            {
                id: 1,
                text: "Forever and ever!"
            },
            {
                id: 2,
                text: "Tatiana, i love you! I save You!"
            }
        ]
    }
})
test("checking adding bookmark text and change length array", () => {
    let action = actions.setBookmarks("Tatiana, i love you!")
    let newState = bookmarksReducer(state, action)
    expect(newState.bookmark[2].text).toBe("Tatiana, i love you!")
    expect(newState.bookmark.length).toBe(3)
})

test("should not add bookmark with existing ID", () => {
    let action = actions.setBookmarks("New bookmark with existing ID", 1);
    let newState = bookmarksReducer(state, action);
    expect(newState.bookmark.length).toBe(2);
    expect(newState.bookmark[0].text).toBe("Forever and ever!");
});

test("adding a bookmark with empty text", () => {
    let action = actions.setBookmarks("")
    let newState = bookmarksReducer(state, action)
    expect(newState.bookmark[2].text).toBe("")
    expect(newState.bookmark.length).toBe(3)
})
test("checking adding bookmark text and change length array", () => {
    let action = actions.setBookmarks("Tatiana, i love you!")
    let newState = bookmarksReducer(state, action)
    expect(newState.bookmark[2].text).toBe("Tatiana, i love you!")
    expect(newState.bookmark.length).toBe(3)
})

test("Delete Bookmarks", () => {
    let action = actions.deleteBookmarks(2)
    let newState = bookmarksReducer(state, action)
    expect(newState.bookmark.length).toBe(1)
})
test("correct bookmark deletion", () => {
    let action = actions.deleteBookmarks(3)
    let newState = bookmarksReducer(state, action)
    expect(newState.bookmark.length).toBe(2)
})

