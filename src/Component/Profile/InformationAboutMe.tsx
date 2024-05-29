import {PhotosType} from "../../Types/types";
import React, {FC} from "react";
import s from "./Profile.module.css";


export const InformationAboutMe: FC<InformationAboutMeType> = (props) => {
    return (<>
            <h2>{props.fullName}</h2>
            {props.isOwner && <button
                className={s.profile_editButton}
                onClick={() => props.setEditMode(true)}
            >...</button>}
            <div className={s.profile_infWork}>
                <p>Обо мне: {props.aboutMe}</p>
                <p>Ищу ли работу: {props.lookingForAJob ? 'Да ищу!' : 'Нет!'}</p>
                {props.lookingForAJob && <p>Описание работы: {props.lookingForAJobDescription}</p>}
            </div>
        </>
    )
}
type InformationAboutMeType = {
    userId: number | null
    photos: PhotosType
    fullName: string
    isOwner: boolean
    aboutMe: string | undefined
    lookingForAJob: boolean
    setEditMode: (editMode: boolean) => void
    lookingForAJobDescription: string | undefined
}