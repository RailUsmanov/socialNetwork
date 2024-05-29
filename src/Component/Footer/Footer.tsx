import s from "./Footer.module.css";
import React from "react";

type PropsType = {

}
const Footer: React.FC<PropsType> = ()=>{
    return(
        <div className={s.footer}>
            &copy; 2024, Соц Сеть. Все права защищены.
        </div>
    )
}

export default Footer;