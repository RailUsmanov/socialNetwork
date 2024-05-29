import profileReducer, {InitialStateType} from "../../reducers/profile-reducer";
import {actions} from "../../actions/profile-actions";
import {ProfileType} from "../../../Types/types";


let state: InitialStateType

beforeEach(() => {
    state = {
        profile: [
            {
                userId: 1,
                fullName: "Roman",
                photos: {
                    large: "https://...",
                    small: "https://..."
                },
                lookingForAJob: true,
                lookingForAJobDescription: "React Developers",
                contacts: {
                    youtube: "youtube",
                    website: "website",
                    twitter: "twitter",
                    vk: "vk",
                    mainLink: "mainLink",
                    instagram: "instagram",
                    facebook: "facebook",
                    github: "github",
                },
                aboutMe: "About me text"
            }
        ],
        posts: [
            {
                id: "1",
                text: "Любовь и мир вечны. Джон Леннон.",
                like: 200,
                disLike: 1
            },
            {
                id: "2",
                text: "Мечты так и остаются мечтами, если к ним не идти.",
                like: 333,
                disLike: 20
            }
        ],
        status: "My status",
        isFetching: false
    }
})

test("Add post success, adding at the top", () => {
    let newPostText = "New post"
    let action = actions.addPost(newPostText)
    let newState = profileReducer(state, action)
    expect(newState.posts[0].text).toBe(newPostText)
    expect(newState.posts[0].disLike).toBe(0)
    expect(newState.posts[0].like).toBe(0)
})
test("TDD, Add like", ()=>{
    let action = actions.addLike("1")
    let newState = profileReducer(state, action)
    expect(newState.posts[0].like).toBe(201)
})
test("TDD, ADD dislike", ()=>{
    let action = actions.addDislike("1")
    let newState = profileReducer(state, action)
    expect(newState.posts[0].disLike).toBe(2)
})
test("Delete post success", () => {
    let action = actions.deletePost("2")
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
})

test("Deleting a post with an incorrect ID", () => {
    let action = actions.deletePost("3")
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(2)
})

test("Set profile", () => {
    let newProfile: ProfileType = {
        userId: 2,
        fullName: "Rail Usmanov",
        aboutMe: "I am super",
        contacts: {
            youtube: "youtube",
            website: "website",
            twitter: "twitter",
            vk: "vk",
            mainLink: "mainLink",
            instagram: "instagram",
            facebook: "facebook",
            github: "github",
        },
        lookingForAJob: true,
        lookingForAJobDescription: "React, Redux, Websocket",
        photos: {
            large: "https://...",
            small: "https://..."
        },
    }
    let action = actions.setProfile(newProfile)
    let newState = profileReducer(state, action)
    expect(newState.profile[0].fullName).toBe("Rail Usmanov")
    expect(newState.profile[0].userId).toBe(2)
    expect(newState.profile[0].aboutMe).toBe("I am super")
    expect(newState.profile[0].lookingForAJob).toBe(true)
    expect(newState.profile[0].lookingForAJobDescription).toBe("React, Redux, Websocket")
})

test("Set status success", () => {
    let newStatusText = "My new status"
    let action = actions.setStatus(newStatusText)
    let newState = profileReducer(state, action)
    expect(newState.status).toBe(newStatusText)
})

test("Toggle is fetching", () => {
    let action = actions.toggleIsFetching(true)
    let newState = profileReducer(state, action)
    expect(newState.isFetching).toBe(true)
})