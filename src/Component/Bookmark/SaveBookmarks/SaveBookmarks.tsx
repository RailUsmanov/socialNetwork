import s from "./SaveBookmarks.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/redux-store";
import {BookmarkType} from "../../../redux/reducers/bookmarks-reducer";
import {useState} from "react";
import {actions} from "../../../redux/actions/bookmarks-actions";

export function SaveBookmarks(){
    const bookmarks = useSelector<RootState, BookmarkType[]>(state => state.bookmarks.bookmark)
    const dispatch: AppDispatch = useDispatch()
    return(
        <div className={s.saveBookmarks_Container}>
            <h2>Закладки</h2>
            {
                bookmarks.map((el, index)=>{
                    return(
                        <div  className={s.saveBookmarks} key={index}>
                            <p>{el.text}</p>
                            <div
                                title="Delete bookmark"
                                className={s.saveBookmarks_delete}
                                onClick={()=>{
                                    dispatch(actions.deleteBookmarks(el.id))
                                }}
                            >x</div>
                        </div>
                    )
                })
            }
        </div>


    )
}