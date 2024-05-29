import s from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {addProfile, getUserStatus, savePhoto} from "../../redux/thunks/profile-thunk";
import {Avatar} from "./Avatar";
import {Status} from "./Status";
import {InformationAboutMe} from "./InformationAboutMe";
import {InformationAboutMeForm} from "./InformationAboutMeForm";
import {Posts} from "./Post";
import {Contacts} from "./Contacts";

export function Profile() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    let {id} = useParams()
    let UserIdParams: number | null = Number(id)
    const [editMode, setEditMode] = useState(false)

    let profile = useSelector((state: RootState) => state.profile.profile)
    let status = useSelector((state: RootState) => state.profile.status)
    let userId = useSelector((state: RootState) => state.auth.id)
    let posts = useSelector((state: RootState) => state.profile.posts)
    let authProfilePhoto = useSelector((state: RootState) => state.auth.authProfilePhotos)
    let isOwner = UserIdParams === userId


    useEffect(() => {
        if (!UserIdParams || !userId) {
            navigate("/login")
        } else {
            dispatch(addProfile(UserIdParams))
            dispatch(getUserStatus(UserIdParams))
        }

    }, [dispatch, id, userId, navigate]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(savePhoto(file));
        }
    };
    return (<>
        {profile.map((el, index) => {
            return (<div key={index} className={s.profile}>
                <Avatar
                    photos={el.photos}
                    fullName={el.fullName}
                    target={handleAvatarChange}
                    dispatch={dispatch}
                    isOwner={isOwner}
                />
                <Status
                    status={status}
                    dispatch={dispatch}
                    isOwner={isOwner}
                />
                {!editMode && <InformationAboutMe
                    fullName={el.fullName}
                    aboutMe={el.aboutMe}
                    lookingForAJob={el.lookingForAJob}
                    lookingForAJobDescription={el.lookingForAJobDescription}
                    isOwner={isOwner}
                    setEditMode={setEditMode}
                    photos={profile[0].photos}
                    userId={userId}
                />}

                <div className={s.profile_contacts}>
                    {isOwner ? <>
                        {editMode ? <InformationAboutMeForm
                            dispatch={dispatch}
                            contacts={el.contacts}
                            setEditMode={setEditMode}
                            fullName={el.fullName}
                            lookingForAJob={el.lookingForAJob}
                            lookingForAJobDescription={el.lookingForAJobDescription}
                            photos={profile[0].photos}
                            userId={userId}
                            aboutMe={el.aboutMe}
                        /> : <div>
                            <h3>Contacts:</h3>
                            <Contacts
                                contacts={el.contacts}
                            />
                        </div>}
                    </> : <Contacts
                        contacts={el.contacts}
                    />}
                </div>
                {
                    isOwner && <Posts
                        posts={posts}
                        profile={profile}
                        authProfilePhoto={authProfilePhoto}
                    />
                }
            </div>)
        })}
    </>)
}