import s from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import React from "react";


type ActiveStyleProps ={
    isActive: boolean
}
export const Nav = () => {

    const active= ({ isActive }: ActiveStyleProps) => {
        return {
            color: isActive ? "gold" : "white",
        };
    };

    return (
        <div className={s.nav}>
            <div>
                <NavLink to={"/profile"} style={active}>
                    Профиль
                </NavLink>
            </div>
            <div>
                <NavLink to={"/messages"} style={active}>
                    Сообщения
                </NavLink>
            </div>
            <div>
                <NavLink to={"/users"} style={active}>
                    Друзья
                </NavLink>
            </div>
            <div>
                <NavLink to={"/music"} style={active}>
                    Музыка
                </NavLink>
            </div>
            <div>
                <NavLink to={"/bookmark"} style={active}>
                    Закладки
                </NavLink>
            </div>
            <div>
                <NavLink to={"/chat"} style={active}>
                    Чат
                </NavLink>
            </div>
            <div>
                <NavLink to={"/calculator"} style={active}>
                    Калькулятор
                </NavLink>
            </div>
            <div>
                <NavLink to={"/games"} style={active}>
                    Игры
                </NavLink>
            </div>
        </div>
    );
};

