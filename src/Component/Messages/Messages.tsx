import s from "./Messages.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {InitialStateType} from "../../redux/reducers/messages-reducer";
import {AppDispatch, RootState} from "../../redux/redux-store";
import React, {useEffect} from "react";
import {validateMessages} from "../../utils/Validaters/validates";
import {actions} from "../../redux/actions/messages-actions";
import avatar from "../../img/ava.jpg"
import {useNavigate} from "react-router-dom";


export function Messages() {
    let isAuth = useSelector((state: RootState)=> state.auth.isAuth)
    let messages = useSelector((state: RootState) => state.messages.messages)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        if(!isAuth){
            navigate("/login")
        }
    }, []);
    return (
        <>
            <MyMessages
                messages={messages}
            />

            <div className={s.messages}>{
                <Formik initialValues={{messages: ""}}
                        validationSchema={validateMessages}
                        onSubmit={(values: { messages: string }, props: { resetForm: () => void }) => {
                            dispatch(actions.addMessages(values.messages))
                            props.resetForm()
                        }}>
                    {({isValid, status}) => (
                        <Form>
                            <div className={s.messages_textarea}>
                                <Field
                                    as="textarea"
                                    name="messages"
                                />
                                <ErrorMessage name="messages"/>
                            </div>
                            <div className={s.messages_button}>
                                <button type="submit" disabled={!isValid}>
                                    Отправить
                                </button>
                            </div>
                                {status && <div className={s.errorMessages}>{status}</div>}
                        </Form>
                    )}
                </Formik>
            }
            </div>
        </>
    )
}

const MyMessages: React.FC<InitialStateType> = (props) => {
    const dispatch: AppDispatch = useDispatch()

    const fakeUsers = [
        { id: 1, name: "User 1", avatar: "https://via.placeholder.com/50" },
        { id: 2, name: "User 2", avatar: "https://via.placeholder.com/50" },
        { id: 3, name: "User 3", avatar: "https://via.placeholder.com/50" },
        { id: 4, name: "User 4", avatar: "https://via.placeholder.com/50" },
        { id: 5, name: "User 5", avatar: "https://via.placeholder.com/50" },
    ];

    return (
        <div className={s.messagesContainer}>
            <div className={s.messagesList}>
                {props.messages.map((el) => (
                    <div key={el.id} className={s.myMessages}>
                        {
                            el.userID === 1
                                ? <p><img src={avatar}/>{el.text}</p>
                                : <p>{el.text}&nbsp;<img src={avatar}/></p>
                        }
                        <div
                            title="Delete"
                            onClick={() => dispatch(actions.deleteMessages(el.id))}
                            className={s.deleteMessage}
                        >
                            x
                        </div>
                    </div>
                ))}
            </div>
            <div className={s.usersList}>
                {fakeUsers.map((user) => (
                    <div key={user.id} className={s.user}>
                        <div className={s.userAvatar}>
                            <img src={user.avatar} alt={`Avatar of ${user.name}`} />
                        </div>
                        <div className={s.userName}>{user.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};