import React, {memo, useEffect} from "react";
import s from "./Users.module.css";
import {useDispatch, useSelector} from "react-redux";
import avatar from "../../img/ava.jpg"
import {getUsers, subscribe, unsubscribe} from "../../redux/users-reducer";
import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import Paginator from "../../command/Panginator";
import {AppDispatch, RootState} from "../../redux/redux-store";
import Preload from "../../command/Preloading/Preload";
import {Field, Form, Formik} from "formik";

export const Users = React.memo(() => {
    let users = useSelector((state: RootState) => state.users.users)
    let currentPage = useSelector((state: RootState) => state.users.currentPage)
    let totalCount = useSelector((state: RootState) => state.users.totalCount)
    let pageSize = useSelector((state: RootState) => state.users.pageSize)
    let isFollowingProgress = useSelector((state: RootState) => state.users.isFollowingProgress)
    let isFetching = useSelector((state: RootState) => state.users.isFetching)
    let filter = useSelector((state: RootState) => state.users.filters)
    let dispatch: AppDispatch = useDispatch()
    let navigate = useNavigate()
    let [searchParams] = useSearchParams();
    useEffect(() => {
        //todo Применить query-string для удаления не нужной query параметров из URi
        navigate({
            pathname: '/users',
            search: `page=${currentPage}&term=${filter.term}&friend=${filter.friend}`
        })
    }, [filter, currentPage]);

    useEffect(() => {
        let term = searchParams.get('term') || '';
        let friend = searchParams.get('friend') || 'null';
        dispatch(getUsers(1, pageSize, {
            term,
            friend: friend === 'true' ? true : friend === 'false' ? false : null
        }));
    }, []);
    return (
        <div>
            <div>
                <SearchUserForm
                    pageSize={pageSize}
                />
            </div>
            {
                isFetching
                    ? <Preload/>
                    : <div>
                        <Paginator
                            currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} filter={filter}
                        />
                        {users.map((el, index) => {
                            return (
                                <div className={s.friends} key={index}>
                                    <div>
                                        <NavLink to={`/profile/${el.id}`}>
                                            <>
                                                {el.photos.large
                                                    ? <img src={el.photos.small} alt="Avatar"/>
                                                    : <img src={avatar} alt="Default avatar"/>
                                                }
                                            </>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <b>Полное Имя:</b>&nbsp;{el.name} <br/>
                                        <b>Статус</b>&nbsp;{el.status} <br/>
                                    </div>
                                    <div className={s.friends_follow}>
                                        {el.followed ? (
                                            <button
                                                disabled={isFollowingProgress.some(id => id === el.id)}
                                                onClick={() => {
                                                    dispatch(unsubscribe(el.id))
                                                }}
                                            >
                                                Отписаться
                                            </button>
                                        ) : (
                                            <button
                                                disabled={isFollowingProgress.some(id => id === el.id)}
                                                onClick={() => {
                                                    dispatch(subscribe(el.id))
                                                }}
                                            >
                                                Подписаться
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            }
        </div>
    );
});

type PropsType = {
    pageSize: number;
};

type ValuesType = {
    term: string
    friend: string
};

type FormikType = {
    resetForm: () => void;
};

const SearchUserForm: React.FC<PropsType> = memo((props) => {
    const dispatch: AppDispatch = useDispatch();

    const submitForm = (values: ValuesType, formik: FormikType) => {
        let friend = values.friend === "true" ? true : values.friend === "false" ? false : null;
        dispatch(getUsers(1, props.pageSize, {term: values.term, friend}));
        // formik.resetForm();
    };

    return (
        <div className={s.searchForm}>
            <Formik initialValues={{term: '', friend: "null"}} onSubmit={submitForm}>
                {({handleChange, values}) => (
                    <Form>
                        <Field
                            name="term"
                            type="text"
                            value={values.term}
                            onChange={handleChange}
                        />
                        <Field name="friend" as="select">
                            <option value="true">Все друзья</option>
                            <option value="null">Все пользователи</option>
                            <option value="false">(Не подписанные)</option>
                        </Field>
                        <button type="submit">Поиск</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});