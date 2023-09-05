import { User, ChatSession, Chats, ChatUsers } from "src/models";
import { DeleteDTO, GetChatsDTO, GetLogsDTO, NewChatDTO, NewMessageDTO, ViewedDTO } from './chat.entity';
export declare class ChatService {
    private userModel;
    private chatModel;
    private chatSessionModel;
    private chatUsersModel;
    constructor(userModel: typeof User, chatModel: typeof Chats, chatSessionModel: typeof ChatSession, chatUsersModel: typeof ChatUsers);
    getChats: (request: GetChatsDTO) => Promise<any[]>;
    newChat: (request: NewChatDTO) => Promise<ChatSession>;
    newMessage: (request: NewMessageDTO, files: Express.Multer.File[]) => Promise<Chats>;
    getLogs: (request: GetLogsDTO) => Promise<{
        logs: Chats[];
        photo: string;
    }>;
    delete: (request: DeleteDTO) => Promise<boolean>;
    viewed: (request: ViewedDTO) => Promise<boolean>;
    getUsers: () => Promise<User[]>;
}
