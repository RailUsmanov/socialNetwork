import {ProfileType} from "../../Types/types";
import uuid from "react-uuid";
import {
    ActionsTypes,
    ADD_DISLIKE,
    ADD_LIKE,
    ADD_POST,
    DELETE_POST,
    SET_PROFILE,
    SET_STATUS,
    TOGGLE_IS_FETCHING
} from "../actions/profile-actions";

export type PostType = {
    id: string
    text: string
    like: number
    disLike: number
}

export type InitialStateType = {
    profile: Array<ProfileType>
    posts: Array<PostType>
    status: string
    isFetching: boolean
}

const initialState: InitialStateType = {
    profile: [],
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
        },
        {
            id: "3",
            text: "Даже если вас съели – у вас два выхода.",
            like: 2123,
            disLike: 0
        },
    ],
    status: "",
    isFetching: false,
};


const profileReducer = (state = initialState, action: ActionsTypes):  InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: uuid(),
                text: action.payload.text,
                like: 0,
                disLike: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload.postId)
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: [action.payload.profile],
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.payload.status,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload.toggle,
            };
        case ADD_LIKE:
            return {
                ...state,
                posts: state.posts.map(p=> {
                    if(p.id === action.payload.id){
                        return{
                            ...p,
                            like: p.like + 1
                        }
                    }
                    return p
                })
            }
        case ADD_DISLIKE:
        return {
            ...state,
            posts: state.posts.map(p=>{
                if(p.id === action.payload.id){
                    return{
                        ...p,
                        disLike: p.disLike + 1
                    }
                }
                return p
            })
        }
        default:
            return state;
    }
};
export default profileReducer;
