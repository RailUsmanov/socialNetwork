import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Pagination} from "antd";
import {AppDispatch} from "../../redux/redux-store";
import {actions, FiltersType} from "../../redux/actions/users-actions";
import {getUsers} from "../../redux/thunks/users-thunk";

type PaginatorProps = {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    portionSize?: number;
    filter: FiltersType;

};

const Paginator = ({
                       totalCount,
                       pageSize,
                       currentPage,
                       portionSize = 10,
                       filter,
                   }: PaginatorProps) => {
    const dispatch: AppDispatch = useDispatch();

    const pageCount = Math.ceil(totalCount / pageSize);
    const [portionNumber] = useState(Math.ceil(currentPage / portionSize));

    const onChangedUsers = (current: number) => {
        dispatch(getUsers(current, pageSize, filter));
        dispatch(actions.setCurrentPage(current));
    };

    return (
        <Pagination
            className="pagination"
            current={currentPage}
            total={totalCount}
            pageSize={pageSize}
            showSizeChanger={false}
            showQuickJumper
            onChange={onChangedUsers}
            prevIcon={<Button disabled={portionNumber <= 1}>&#706;</Button>}
            nextIcon={
                <Button disabled={portionNumber * portionSize >= pageCount}>&#707;</Button>
            }
        />
    );
};

export default Paginator;