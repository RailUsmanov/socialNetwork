import s from "./Bookmark.module.css"
import {Field, Form, Formik,} from "formik";
import {SaveBookmarks} from "./SaveBookmarks/SaveBookmarks";
import {useDispatch} from "react-redux";
import {actions} from "../../redux/bookmarks-reducer";
import {AppDispatch} from "../../redux/redux-store";


export function Bookmark() {
    const dispatch: AppDispatch = useDispatch()
    return (
        <>
            <h1>Сохранить Закладки</h1>
            <SaveBookmarks/>
            <Formik initialValues={{"text": ""}}
                    onSubmit={(values: {text: string}, props: {resetForm: () => void}) => {
                        dispatch(actions.setBookmarks(values.text))
                        props.resetForm()
                    }}>
                {({handleChange, values}) => (<Form>
                    <div className={s.textarea}>
                        <Field
                            as="textarea"
                            name="text"
                            onChange={handleChange}
                            value={values.text}
                        />
                    </div>
                    <div className={s.button}>
                        <button type="submit">Сохранить</button>
                    </div>
                </Form>)}
            </Formik>
        </>
    )
}