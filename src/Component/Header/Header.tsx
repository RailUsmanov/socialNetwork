import {NavLink} from "react-router-dom";
import s from "./Header.module.css";
import logo from "../../img/logo/logo.png";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {Avatar} from "antd";
import defaultAvatar from '../../img/ava.jpg'
import {logout} from "../../redux/thunks/auth-thunk";

export const Header = () => {
    let login = useSelector((state: RootState) => state.auth.login)
    let isAuth = useSelector((state: RootState) => state.auth.isAuth)
    let authProfilePhotos = useSelector((state: RootState) => state.auth.authProfilePhotos)
    const dispatch: AppDispatch = useDispatch()

    return (
        <div className={s.header}>
            <div className={s.header_name}>
                <NavLink to={"/profile"}>
                    <span>
                        <img src={logo} alt="логотип"/>
                    </span>
                </NavLink>
                <span>
          <h1>FriendLink</h1>
        </span>
            </div>
            <div className={s.header_dopOption}>
                <Avatar shape="square" size="large" icon={<img src={authProfilePhotos || defaultAvatar}/>}/>
                <div className={s.header_login}>
                    {isAuth ? (
                        <span>
              <span>{login}</span>&nbsp;
                            <span onClick={() => {
                                dispatch(logout())
                            }} className={s.header_logout}>
                Выйти
              </span>
            </span>
                    ) : (
                        <span>
              <NavLink to={"/login"}>авторизоваться</NavLink>
            </span>
                    )}
                </div>
            </div>
        </div>
    );
};
