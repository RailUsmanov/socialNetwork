import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from "./Component/Nav/Nav";
import {Navigate, Route, Routes} from "react-router-dom";
import {Profile} from "./Component/Profile/Profile";
import {Header} from "./Component/Header/Header";
import {Users} from "./Component/Users/Users";
import {Messages} from "./Component/Messages/Messages";
import {Login} from "./Component/Login/Login";
import {Bookmark} from "./Component/Bookmark/Bookmark";
import React, {lazy, Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import initializedApp from "./redux/app-reducer";
import Preload from "./command/Preloading/Preload";
import {AppDispatch, RootState} from "./redux/redux-store";
import Footer from "./Component/Footer/Footer";
import Calculator from "./Component/Callculator/Calculator";
import RockPaperScissors from "./Component/Games/Games";

const ChatPage = lazy(() => import("./Pages/Chat/ChatPage"))

function App() {
    let initialized = useSelector((state: RootState) => state.app.initialized)
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(initializedApp())
    }, [dispatch])
    return (
        <div>
            {
                !initialized
                    ? <Preload/>
                    : <>
                        <div className="app">
                            <Header/>
                            <Nav/>
                            <div className="app-content">
                                <Suspense fallback={<Preload/>} >
                                < Routes>
                                    < Route path="/" element={<Navigate to={"/login"}/>}/>
                                    <Route path="/profile/:id?" element={<Profile/>}/>
                                    <Route path="/users" element={<Users/>}/>
                                    <Route path="/messages" element={<Messages/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/bookmark" element={<Bookmark/>}/>
                                    <Route path="/chat" element={<ChatPage/>}/>
                                    <Route path="/calculator" element={<Calculator/>}/>
                                    <Route path="/games" element={<RockPaperScissors/>}/>
                                </Routes>
                                </Suspense>
                            </div>
                            <Footer/>
                        </div>
                    </>

            }

        </div>


    )
        ;
}

export default App;
