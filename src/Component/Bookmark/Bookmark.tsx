import s from "./Bookmark.module.css";
import {ErrorMessage, Field, Form, Formik,} from "formik";
import {SaveBookmarks} from "./SaveBookmarks/SaveBookmarks";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {actions} from "../../redux/actions/bookmarks-actions";
import {validateBookmark} from "../../utils/Validaters/validates";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


export function Bookmark() {
    let isAuth = useSelector((state: RootState)=> state.auth.isAuth)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuth){
            navigate("/login")
        }
    }, []);
    return (
        <>
            <SaveBookmarks/>
            <Formik initialValues={{"text": ""}}
                    validationSchema={validateBookmark}
                    onSubmit={(values: { text: string }, props: { resetForm: () => void }) => {
                        dispatch(actions.setBookmarks(values.text))
                        props.resetForm()
                    }}>
                {({handleChange, values, status, isValid}) => (<Form>
                    <div className={s.textarea}>
                        <Field
                            as="textarea"
                            name="text"
                            onChange={handleChange}
                            value={values.text}
                        />
                        <div>
                            <ErrorMessage name="text"/>
                        </div>
                    </div>
                    <div className={s.button}>
                        <button type="submit" disabled={!isValid}>Сохранить</button>
                    </div>
                </Form>)}
            </Formik>
        </>
    )
}