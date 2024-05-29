import {AppDispatch} from "../../redux/redux-store";
import React, {FC, useLayoutEffect, useState} from "react";
import {updateUserStatus} from "../../redux/thunks/profile-thunk";
import s from "./Profile.module.css";

export const Status: FC<StatusType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useLayoutEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.dispatch(updateUserStatus(status))

    }
    const onChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }
    return (<div>
        {props.isOwner ? <div className={s.profile_status}>
            <b>Статус</b><br/>
            {editMode ? <input
                autoFocus={true}
                onBlur={deactivateEditMode}
                value={status}
                onChange={onChangeStatus}
            /> : <span
                onClick={activateEditMode}
            >
              {props.status || "No status"}
                </span>}
        </div> : <div className={s.profile_status}>
            <b>Статус</b><br/>
            <span>{props.status || "No status"}</span>
        </div>}
    </div>);
}

type StatusType = {
    status: string
    isOwner: boolean
    dispatch: AppDispatch
}