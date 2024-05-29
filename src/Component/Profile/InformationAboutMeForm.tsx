import {AppDispatch} from "../../redux/redux-store";
import React, {FC} from "react";
import {ProfileType} from "../../Types/types";
import {Field, Form, Formik} from "formik";
import {saveProfile} from "../../redux/thunks/profile-thunk";
import s from "./Profile.module.css";


export const InformationAboutMeForm: FC<InformationAboutMeFormType & ProfileType> = (props) => {
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
interface InformationAboutMeFormType {
    dispatch: AppDispatch
    setEditMode: (editMode: boolean) => void
}