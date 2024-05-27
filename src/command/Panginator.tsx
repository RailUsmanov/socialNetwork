import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Pagination} from 'antd';
import {action, FiltersType, getUsers} from '../redux/users-reducer';
import {AppDispatch} from '../redux/redux-store';

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
        dispatch(action.setCurrentPage(current));
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