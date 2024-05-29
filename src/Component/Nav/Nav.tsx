import s from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import React, {FC, memo} from "react";


type ActiveStyleProps = {
    isActive: boolean
}
type NavProps = {};
export const Nav: FC<NavProps> = memo(() => {

    const active = ({isActive}: ActiveStyleProps) => {
        return {
            color: isActive ? "gold" : "white",
        };
    };

    return (
        <div className={s.nav}>
            <NavLink to={"/profile"} style={active}>
                <div>Профиль</div>
            </NavLink>
            <NavLink to={"/users"} style={active}>
                <div> Друзья</div>
            </NavLink>
            <NavLink to={"/messages"} style={active}>
                <div> Сообщения (демо)</div>
            </NavLink>
            <NavLink to={"/chat"} style={active}>
                <div> Чат</div>
            </NavLink>
            <NavLink to={"/calculator"} style={active}>
                <div>Калькулятор</div>
            </NavLink>
            <NavLink to={"/games"} style={active}>
                <div>Игры (1)</div>
            </NavLink>
            <NavLink to={"/bookmark"} style={active}>
                <div> Закладки (демо)</div>
            </NavLink>
        </div>
    );
});

