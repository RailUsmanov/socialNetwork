import s from "./SaveBookmarks.module.css"
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {BookmarkType} from "../../../redux/bookmarks-reducer";

export function SaveBookmarks(){
    const bookmarks = useSelector<RootState, BookmarkType[]>(state => state.bookmarks.bookmark)
    return(
        <>
            <h1>Закладки</h1>
            {
                bookmarks.map((el, index)=>{
                    return(
                        <div  className={s.saveBookmarks} key={index}>
                            <p>{el.text}</p>
                        </div>
                    )
                })
            }
        </>


    )
}