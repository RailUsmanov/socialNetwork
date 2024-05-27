import s from "./Messages.module.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {action, InitialStateType} from "../../redux/messages-reducer";
import {AppDispatch, RootState} from "../../redux/redux-store";
import React from "react";
import {validateMessages} from "../../utils/Validaters/validates";

const MyMessages: React.FC<InitialStateType> = (props) => {
    return (
        <div>{
            props.messages.map(el => {
                return (
                    <div key={el.id} className={s.myMessages}>
                        <p>
                            {el.text}
                        </p>
                    </div>
                )
            })
        }</div>
    )
}

export function Messages() {
    const messages = useSelector((state: RootState) => state.messages.messages)
    const dispatch: AppDispatch = useDispatch()
    return (
        <>
            <MyMessages
                messages={messages}
            />
            <div className={s.messages}>{

                <Formik initialValues={{messages: ""}}
                        validationSchema={validateMessages}
                        onSubmit={(values: { messages: string }, props: { resetForm: () => void }) => {
                            dispatch(action.addMessages(values.messages))
                            props.resetForm()
                        }}>
                    {({isValid, status}) => (
                        <Form>
                            <div>
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
                            <div>
                                {status && <div className={s.errorMessages}>{status}</div>}
                            </div>

                        </Form>
                    )}
                </Formik>
            }
            </div>
        </>
    )
}