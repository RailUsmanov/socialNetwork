import {updateObjectInArray} from "../../utils/reduser-objectHelper";
import {UsersType} from "../../Types/types";
import {
    ActionsTypes,
    SET_CURRENT_PAGE,
    SET_FILTERS,
    SET_TOTAL_COUNT,
    SET_USERS,
    SUBSCRIBE,
    TOGGLE_IS_FETCHING,
    TOGGLE_IS_FOLLOWING_PROGRESS,
    UNSUBSCRIBE
} from "../actions/users-actions";


const initialState = {
    users: [] as Array<UsersType>,
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: [] as Array<number>, // array of users id
    filters: {
        term: "",
        friend: null as boolean | null, // null means "all"
    },
};

export type InitialStateType = typeof initialState


const friendsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SUBSCRIBE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.id, "id", {followed: true})
            };
        case UNSUBSCRIBE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.id, "id", {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload.users
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload.count,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.current,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload.toggle,
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.payload.toggle
                    ? [...state.isFollowingProgress, action.payload.userId]
                    : state.isFollowingProgress.filter((id) => id !== action.payload.userId),
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };

        default:
            return state;
    }
};
export default friendsReducer;
