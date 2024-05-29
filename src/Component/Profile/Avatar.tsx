import {PhotosType} from "../../Types/types";
import {AppDispatch} from "../../redux/redux-store";
import React, {FC} from "react";
import s from "./Profile.module.css";
import avatar from "../../img/ava.jpg";

type AvatarType = {
    photos: PhotosType
    fullName: string
    isOwner: boolean
    dispatch: AppDispatch
    target: React.ChangeEventHandler<HTMLInputElement>;
}
const Avatar: FC<AvatarType> = (props) => {
    return (<>
        <div className={s.avatar}>
        {

            props.photos.large ? <img src={props.photos.large} alt={props.fullName}/> :
    <img src={avatar} alt={props.fullName}/>}
    </div>
    {props.isOwner && <div className={s.avatarChange}>
        <label>
        &nbsp;<em>Изменить фото </em><br/>
    <input type="file" onChange={props.target}/>
    </label>
    </div>}

    </>

    )
    }