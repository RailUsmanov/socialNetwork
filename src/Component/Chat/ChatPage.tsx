import React, {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import avatar from "../../img/ava.jpg";
import {MessageTypeAPI} from "../../DAL/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/redux-store";
import {sendMessages, startMessagesListening, stopMessagesListening} from "../../redux/thunks/chat-thunk";

const ChatPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: RootState) => state.chat.status)
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);

    return (
        <>
            <div>
                {status === 'error' && <div>Перезагрузите страницу произошла ошибка</div>}
                <Messages/>
                <AddMessages/>
            </div>
        </>
    );
}

const Messages = React.memo(() => {
    let messages = useSelector((state: RootState) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 200) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useLayoutEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);
    return (
        <div
            style={{
                border: "1px solid black",
                borderRadius: "15px",
                padding: "15px",
                margin: "10px",
                height: "400px",
                overflowY: "auto",
            }}
            onScroll={scrollHandler}
        >
            {messages.map((m) => (
                <Message key={m.id} message={m}/>
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
})


const Message: FC<{ message: MessageTypeAPI }> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo || avatar} style={{width: "30px"}} alt={message.userName}/>
            <b>{message.userName}</b>
            <br/>
            <p>{message.message}</p>
            <hr/>
        </div>
    );
})

const AddMessages = React.memo(() => {
    const status = useSelector((state: RootState) => state.chat.status)
    const dispatch: AppDispatch = useDispatch()
    const [message, setMessage] = useState("");
    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessages(message))
        setMessage("");
    };

    return (
        //todo Применить react-form-hook или formik
        <>
            <div>
        <textarea
            style={{
                width: "90%",
                resize: "none",
                borderRadius: "15px",
                padding: "10px",
                height: "100px",
                margin: "10px",
            }}
            value={message}
            onChange={(e) => {
                setMessage(e.target.value);
            }}
        />
            </div>
            <div
                style={{
                    textAlign: "end",
                    width: "90%",
                }}
            >
                <button
                    disabled={status !== 'ready'}
                    onClick={sendMessageHandler}
                >
                    отправить
                </button>
            </div>
        </>
    );
})

export default ChatPage;