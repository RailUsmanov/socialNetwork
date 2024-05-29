import {PostType} from "../../redux/reducers/profile-reducer";
import {ProfileType} from "../../Types/types";
import React, {FC} from "react";
import {AppDispatch} from "../../redux/redux-store";
import {useDispatch} from "react-redux";
import s from "./Profile.module.css";
import avatar from "../../img/ava.jpg";
import {actions} from "../../redux/actions/profile-actions";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {validatePost} from "../../utils/Validaters/validates";


export const Posts: FC<Posts> = (props)=>{
    const dispatch: AppDispatch = useDispatch()
    return (
        <>
            <div>
                <Formik
                    initialValues={{postText: ""}}
                    validationSchema={validatePost}
                    onSubmit={(values)=>{
                    dispatch(actions.addPost(values.postText))
                }}>
                    {
                        ({isValid, handleChange, values})=>(
                            <Form>
                                <div className={s.post_add}>
                                    <Field
                                        as="textarea"
                                        name="postText"
                                        onChange={handleChange}
                                        value={values.postText}
                                    />
                                    <div>
                                        <ErrorMessage name="postText"/>
                                    </div>
                                    <div className={s.post_add_button}>
                                        <button type="submit" disabled={!isValid}>Сохранить</button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <span>
      {props.posts.map((el, index) => (<div className={s.post} key={index}>
          <div>
              <img alt="avatar" src={props.authProfilePhoto || avatar}/>
          </div>
          <div>
              <p>{el.text}</p>
          </div>
          <div className={s.post_grad}>
              <span
                  title="Like"
                  className={s.post_grad_like} onClick={() => {
                  dispatch(actions.addLike(el.id))
              }}><div>&#128077;</div><div>{el.like}</div></span>
              <span
                  title="Dislike"
                  className={s.post_grad_disLike} onClick={() => {
                  dispatch(actions.addDislike(el.id))
              }}><div>&#128078;</div><div>{el.disLike}</div></span>
              <div
                  title="Delete Post"
                  className={s.post_grad_delete}
                  onClick={() => {
                      dispatch(actions.deletePost(el.id))
                  }}
              >x
              </div>
          </div>
      </div>))}
    </span>

        </>

    )
}

type Posts = {
    posts: Array<PostType>
    profile: Array<ProfileType>
    authProfilePhoto?: string
}