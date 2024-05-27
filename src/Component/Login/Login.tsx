import s from "./Login.module.css"
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {validateLoginForm} from "../../utils/Validaters/validates";
import {AppDispatch, RootState} from "../../redux/redux-store";

interface loginData {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string | undefined
}
export const Login = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()


    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const captchaURL = useSelector((state: RootState) => state.auth.captchaURL)
    const id = useSelector((state: RootState) => state.auth.id)

    useEffect(() => {
        if (isAuth !== undefined && isAuth) {
            navigate(`/profile/${id}`);
        }
    }, [isAuth, navigate, id]);


    const  handleLogin = useCallback(
        ({ email, password, rememberMe, captcha}: loginData ,
         {setSubmitting, setStatus }: FormikHelpers<any>)=> {
            dispatch(login(email, password, rememberMe, captcha))
                .then(() => {
                    // Успешный вход - очищаем общее сообщение об ошибке
                    setStatus(null);
                })
                .catch((error) => {
                    // Ошибка входа - устанавливаем общее сообщение об ошибке
                    setStatus(error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }, [dispatch])

    return (
        <div className={s.login}>
            <div className={s.form}>
                <h1>Login</h1>
                <Formik initialValues={{
                    email: "", password: "",
                    rememberMe: false, captcha: ""
                }}
                        validationSchema={validateLoginForm}
                        onSubmit={handleLogin}>
                    {({isValid, status}) => (
                        <Form>
                            <div className={s.input}>
                                <Field
                                    type="email"
                                    name="email"
                                />
                                <div className={s.error}>
                                    <ErrorMessage name="email"
                                    />
                                </div>

                            </div>
                            <div className={s.input}>
                                <Field
                                    type="password"
                                    name="password"
                                />
                                <div className={s.error}>
                                    <ErrorMessage name="password"
                                    />
                                </div>
                            </div>
                            <div className={s.checkbox}>
                                <Field
                                    type="checkbox"
                                    name="rememberMe"
                                />
                                remember me
                            </div>
                            <div className={s.error}>
                                {status && <div>{status}</div>}
                            </div>
                            {
                                captchaURL && <div className={s.captcha}>
                                    <div><img src={captchaURL} alt="Captcha"/></div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="captcha"
                                        />

                                    </div>
                                </div>
                            }
                            <div className={s.submit}>
                                <button type="submit" disabled={!isValid}>Login</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
