//todo Следует рассмотреть вариант использования класса вместо функций,
// чтобы упростить управление состоянием и обработку событий.


type SubscriberType = {
    type: 'messages-received';
    callback: MessagesReceivedSubscribersType;
} | {
    type: 'status-changes';
    callback: StatusChangedSubscribersType;
};

const subscribers: {
    [key: string]: SubscriberType[];
} = {
    'messages-received': [] ,
    'status-changes': []
};

let webSocket: WebSocket | null = null

const handleCloseListener = () => {
    console.log('close');
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 5000);
};

const handleMessage = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach((s: SubscriberType) => {
        if (s.type === 'messages-received') {
            s.callback(newMessages);
        }
    });
};
const handleOpen = ()=>{
    notifySubscribersAboutStatus('ready')
}
const handleError = () =>{
    notifySubscribersAboutStatus('error')
}
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changes'].forEach((s: SubscriberType) => {
        if (s.type === 'status-changes') {
            s.callback(status);
        }
    });
}

const clearUp = () => {
    webSocket?.removeEventListener("close", handleCloseListener);
    webSocket?.removeEventListener("message", handleMessage);
    webSocket?.removeEventListener('open', handleOpen)
    webSocket?.removeEventListener('error', handleError)
};


function createChannel() {
    clearUp();
    webSocket?.close();
    webSocket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus('pending')
    webSocket.addEventListener("close", handleCloseListener);
    webSocket.addEventListener("message", handleMessage);
    webSocket.addEventListener("open", handleOpen)
    webSocket.addEventListener("error", handleError)
}

export type MessageTypeAPI = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type StatusType = "pending" | "ready" | "error";

type EventNameType = 'messages-received' | 'status-changes';
type MessagesReceivedSubscribersType = (messages: MessageTypeAPI[]) => void;
type StatusChangedSubscribersType = (status: StatusType) => void;

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['messages-received'] = [];
        subscribers['status-changes'] = [];
        if (webSocket) {
            clearUp();
            webSocket.close();
        }
    },
    subscribe<T extends EventNameType>(
        eventName: T,
        callback: T extends 'messages-received' ? MessagesReceivedSubscribersType : StatusChangedSubscribersType
    ): () => void {
        const subscriberData: SubscriberType = {
            type: eventName,
            callback: callback as any
        };
        subscribers[eventName].push(subscriberData);
        const removeSubscribers = () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s.callback !== callback);
        };
        return removeSubscribers;
    },
    unsubscribe<T extends EventNameType>(
        eventName: T,
        callback: T extends 'messages-received' ? MessagesReceivedSubscribersType : StatusChangedSubscribersType
    ): void {
        subscribers[eventName] = subscribers[eventName].filter(s => s.callback !== callback);
    },
    sendMessages(messages: string) {
        webSocket?.send(messages);
    }
};
