import usersReducer, {InitialStateType} from "../../reducers/users-reducer";
import {actions} from "../../actions/users-actions";
import {PhotosType} from "../../../Types/types";


let state: InitialStateType

beforeEach(()=>{
    state = {
        users: [
            {
                id: 1,
                name: "Dima",
                status: "ad",
                photos:{
                    small: "https://...",
                    large: "https://..."
                },
                followed: true
            },
            {
                id: 2,
                name: "Roman",
                status: "Re",
                photos:{
                    small: "https://...",
                    large: "https://..."
                },
                followed: false
            }
        ],
        filters: {
            term: "",
            friend: null
        },
        currentPage: 1,
        pageSize: 10,
        totalCount: 100,
        isFetching: false,
        isFollowingProgress: []
    }
})

test("Toggle is following progress", ()=>{
    let action = actions.toggleIsFollowingProgress(true, 2)
    let newState = usersReducer(state, action)
    expect(newState.isFollowingProgress[0]).toBe(2)
    let action2 = actions.toggleIsFollowingProgress(false, 2)
    let newState2 = usersReducer(state, action2)
    expect(newState2.isFollowingProgress.length).toBe(0)
})
test("Toggle is fetching", ()=>{
    let action = actions.toggleIsFetching(true)
    let newState = usersReducer(state, action)
    expect(newState.isFetching).toBe(true)
})

test("Subscribe success", ()=>{
    let action = actions.subscribeSuccess(2)
    let newState = usersReducer(state, action)
    expect(newState.users[1].followed).toBe(true)
})

test("Unsubscribe success", ()=>{
    let action = actions.unsubscribeSuccess(1)
    let newState = usersReducer(state, action)
    expect(newState.users[0].followed).toBe(false)
})

test("Set Users", ()=>{
    let action = actions.setUsers([
        {
            followed: false,
            name: "Dina",
            id: 4,
            photos: {
                small: "https://...",
                large: "https://..."
            },
            status: undefined
        },
        {
            followed: true,
            name: "Rome",
            id: 5,
            photos: {
                small: "https://...",
                large: "https://..."
            },
            status: "Viva Victoria"
        }
    ])
    let newState = usersReducer(state, action)
    expect(newState.users[0].id).toBe(4)
    expect(newState.users[1].id).toBe(5)
    expect(newState.users[0].status).toBe(undefined)
    expect(newState.users[1].status).toBe("Viva Victoria")
})

test("Set total count", ()=>{
    let action = actions.setTotalCount(200)
    let newState = usersReducer(state, action)
    expect(newState.totalCount).toBe(200)
})

test("Set current page", ()=>{
    let action = actions.setCurrentPage(2)
    let newState = usersReducer(state, action)
    expect(newState.currentPage).toBe(2)
})

test("Set filters", ()=>{
    let filter = {
        term: "It-incubator.com",
        friend: true
    }
    let action = actions.setFilters(filter)
    let newState = usersReducer(state, action)
    expect(newState.filters.term).toBe(filter.term)
    expect(newState.filters.friend).toBe(filter.friend)
})
