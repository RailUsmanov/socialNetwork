import {chatAPI} from "../../../DAL/chat-api";
import {actions} from "../../actions/chat-actions";
import {sendMessages, startMessagesListening, stopMessagesListening} from "../../thunks/chat-thunk";

jest.mock("../../../DAL/chat-api", () => ({
    chatAPI: {
        start: jest.fn(),
        stop: jest.fn(),
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
        sendMessages: jest.fn(),
    },
}));

describe("chat-thunk", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("startMessagesListening", () => {
        it("should start listening for messages and status changes", async () => {
            const dispatch = jest.fn();
            const getState = jest.fn();

            await startMessagesListening()(dispatch, getState, {});

            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith(actions.stopMessagesProcessing());
            expect(chatAPI.start).toHaveBeenCalledTimes(1);
            expect(chatAPI.subscribe).toHaveBeenCalledTimes(2);
            expect(chatAPI.subscribe).toHaveBeenCalledWith(
                "messages-received",
                expect.any(Function)
            );
            expect(chatAPI.subscribe).toHaveBeenCalledWith(
                "status-changes",
                expect.any(Function)
            );
        });
    });

    describe("stopMessagesListening", () => {
        it("should stop listening for messages and status changes", async () => {
            const dispatch = jest.fn();
            const getState = jest.fn();

            await stopMessagesListening()(dispatch, getState, {});

            expect(chatAPI.stop).toHaveBeenCalledTimes(1);
            expect(chatAPI.unsubscribe).toHaveBeenCalledTimes(2);
            expect(chatAPI.unsubscribe).toHaveBeenCalledWith(
                "messages-received",
                expect.any(Function)
            );
            expect(chatAPI.unsubscribe).toHaveBeenCalledWith(
                "status-changes",
                expect.any(Function)
            );
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith(actions.stopMessagesProcessing());
        });
    });

    describe("sendMessages", () => {
        it("should send messages through the API", async () => {
            const dispatch = jest.fn();
            const getState = jest.fn();
            const messages = "Hello, world!";

            await sendMessages(messages)(dispatch, getState, {});

            expect(chatAPI.sendMessages).toHaveBeenCalledTimes(1);
            expect(chatAPI.sendMessages).toHaveBeenCalledWith(messages);
        });
    });
});