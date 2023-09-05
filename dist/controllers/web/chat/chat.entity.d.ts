export declare class GetChatsDTO {
    user_id: number;
}
export declare class NewChatDTO {
    sender_id: number;
    name: string;
    receiver_id?: number;
}
export declare class NewMessageDTO {
    sender_id: number;
    message: string;
    session_id: number;
    attachments?: [];
}
export declare class GetLogsDTO {
    chat_session_id: number;
}
export declare class DeleteDTO {
    chat_session_id: number;
    host_id: number;
}
export declare class ViewedDTO {
    chat_session_id: number;
    user_id: number;
}
