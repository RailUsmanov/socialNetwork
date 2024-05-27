import s from "./Profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import React, {FC, useEffect, useState} from "react";
import {
    addProfile,
    getUserStatus,
    PostType,
    savePhoto,
    saveProfile,
    updateUserStatus
} from "../../redux/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";
import avatar from "../../img/ava.jpg"
import {Field, Form, Formik} from "formik";
import {ContactsType, PhotosType, ProfileType} from "../../Types/types";
import {AppDispatch, RootState} from "../../redux/redux-store";


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

type StatusType = {
    status: string
    isOwner: boolean
    dispatch: AppDispatch
}
const Status: FC<StatusType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(() => {
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
const InformationAboutMe: FC<InformationAboutMeType> = (props) => {
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

type Contacts = {
    contacts: ContactsType
}
const Contacts: React.FC<Contacts> = (props) => {
    return (
        <ul>
            {Object.keys(props.contacts).map((key, index) => {
                    return (
                        <li key={index}>
                            <a href={props.contacts[key as keyof ContactsType]}>{key}</a>
                        </li>
                    );
            })}
        </ul>
    );
};

interface InformationAboutMeFormType {
    dispatch: AppDispatch
    setEditMode: (editMode: boolean) => void
}
const InformationAboutMeForm: FC<InformationAboutMeFormType & ProfileType> = (props) => {
    return (<>
        <h3>Редактирование информации профиля</h3>
        <Formik
            initialValues={{
                fullName: props.fullName,
                aboutMe: props.aboutMe,
                lookingForAJob: props.lookingForAJob,
                lookingForAJobDescription: props.lookingForAJobDescription,
                contacts: {
                    facebook: props.contacts.facebook,
                    website: props.contacts.website,
                    vk: props.contacts.vk,
                    twitter: props.contacts.twitter,
                    instagram: props.contacts.instagram,
                    youtube: props.contacts.youtube,
                    github: props.contacts.github,
                    mainLink: props.contacts.mainLink
                }

            }}
            onSubmit={(values) => {
                const profile: ProfileType = {
                    userId: props.userId,
                    photos: props.photos,
                    fullName: values.fullName,
                    aboutMe: values.aboutMe,
                    lookingForAJob: values.lookingForAJob,
                    lookingForAJobDescription: values.lookingForAJobDescription,
                    contacts: values.contacts
                };
                props.dispatch(saveProfile(profile))
                props.setEditMode(false)
            }}
        >
            {({values, setFieldValue}) => (<Form>
                <div className={s.contactsItem}>
                    <label htmlFor="fullName">Полное имя:</label>
                    <Field
                        type="text"
                        name="fullName"
                        value={values.fullName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("fullName", e.target.value)}
                    />
                </div>
                <div className={s.contactsItem}>
                    <label htmlFor="aboutMe">Обо мне:</label>
                    <Field
                        type="text"
                        name="aboutMe"
                        value={values.aboutMe}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("aboutMe", e.target.value)}
                    />
                </div>
                <div className={s.contactsItem}>
                    <label htmlFor="lookingForAJob">Ищу ли работу:</label>
                    <Field
                        type="checkbox"
                        name="lookingForAJob"
                        checked={values.lookingForAJob}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("lookingForAJob", e.target.checked)}
                    />
                </div>
                <div className={s.contactsItem}>
                    <label htmlFor="lookingForAJobDescription">Описание работы:</label>
                    <Field
                        as="textarea"
                        name="lookingForAJobDescription"
                        value={values.lookingForAJobDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("lookingForAJobDescription", e.target.value)}
                    />
                </div>
                {Object.keys(props.contacts).map(key => (<div key={key} className={s.contactsItem}>
                    <label htmlFor={key}>{key}</label>
                    <Field
                        type="text"
                        id={key}
                        name={`contacts. ${key}`}
                        value={values.contacts[key as keyof typeof props.contacts]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(`contacts.${key}`, e.target.value)}
                    />
                </div>))}
                <button type="submit">Сохранить</button>
            </Form>)}
        </Formik>
    </>)
}
type Posts = {
    posts: Array<PostType>
    profile: Array<ProfileType>
    authProfilePhoto?: string
}
const Posts: FC<Posts> = (props)=>{
    return (
        <span>
      {props.posts.map((el, index) => (<div className={s.post} key={index}>
          <div>
              <img alt="avatar" src={props.authProfilePhoto || avatar}/>
          </div>
          <div>
              <p>{el.text}</p>
          </div>
          <div className={s.post_grad}>
              <span className={s.post_grad_like}><div>&#128077;</div><div>{el.like}</div></span>
              <span className={s.post_grad_disLike}><div>&#128078;</div><div>{el.disLike}</div></span>
          </div>
      </div>))}
    </span>
    )
}


export function Profile() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    let {id} = useParams()
    let UserIdParams: number | null = Number(id)
    const [editMode, setEditMode] = useState(false)


    const profile = useSelector((state: RootState) => state.profile.profile)
    const status = useSelector((state: RootState) => state.profile.status)
    const userId = useSelector((state: RootState) => state.auth.id)
    const posts = useSelector((state: RootState) => state.profile.posts)
    const authProfilePhoto = useSelector((state: RootState) => state.auth.authProfilePhotos)
    let isOwner = UserIdParams === userId


    useEffect(() => {
        if (!UserIdParams || !userId) {
            navigate("/")
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