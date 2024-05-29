import s from "./Preload.module.css";
import preload from "../../img/preload/gif.svg";
import React from "react";


const Preload =()=>{
    return (
        <div className={s.preload}>
            <img
                src={preload} alt="Загрузка!"
                className={s.preload}
            />
        </div>
    )
}

export default Preload