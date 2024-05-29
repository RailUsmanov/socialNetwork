import {BaseThunkType} from "../redux-store";
import {actions, ActionsTypes, FiltersType} from "../actions/users-actions";
import {ApiResponseType, usersAPI} from "../../DAL/users-api";
import {Dispatch} from "@reduxjs/toolkit";
import {ResultCode} from "../../DAL/api";

type ThunkType = BaseThunkType<ActionsTypes>
export const getUsers = (
    currentPage?: number,
    pageSize?: number,
    filters?: FiltersType
): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(
            currentPage,
            pageSize,
            filters?.term,
            filters?.friend
        );
        dispatch(actions.setUsers(data.items));
        if (filters) {
            dispatch(actions.setFilters(filters));
        }
        dispatch(actions.setTotalCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    } catch (error) {
        console.error(error);
        dispatch(actions.toggleIsFetching(false));
    }
};

type DispatchType = Dispatch<ActionsTypes>
const _subscribeUnsubscribeFlow = async (dispatch: DispatchType,
                                         apiMethod: (id: number) => Promise<ApiResponseType> ,
                                         actionCreator: (id: number) => ActionsTypes,
                                         id: number ) => {

    dispatch(actions.toggleIsFollowingProgress(true, id));
    let result = await apiMethod(id);
    if (result.resultCode === ResultCode.Success) {
        dispatch(actionCreator(id));
    }
    dispatch(actions.toggleIsFollowingProgress(false, id));

}

export const subscribe = (id: number): ThunkType  => async (dispatch) => {
    let apiMethod = usersAPI.subscribe.bind(usersAPI)
    let actionCreator = actions.subscribeSuccess
    await _subscribeUnsubscribeFlow(dispatch, apiMethod, actionCreator, id)

};

export const unsubscribe = (id: number): ThunkType => async (dispatch) => {
    let apiMethod = usersAPI.unsubscribe.bind(usersAPI)
    let actionCreator = actions.unsubscribeSuccess
    await _subscribeUnsubscribeFlow(dispatch, apiMethod, actionCreator, id)

};
