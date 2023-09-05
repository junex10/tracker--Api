/// <reference types="multer" />
import { Response } from 'express';
import { GetChatsDTO, NewChatDTO, NewMessageDTO, GetLogsDTO, DeleteDTO, ViewedDTO } from './chat.entity';
import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChats(request: GetChatsDTO, response: Response): Promise<Response<any, Record<string, any>>>;
    newChat(response: Response, request: NewChatDTO): Promise<Response<any, Record<string, any>>>;
    newMessage(response: Response, request: NewMessageDTO, files: Express.Multer.File[]): Promise<Response<any, Record<string, any>>>;
    getLogs(request: GetLogsDTO, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(response: Response, request: DeleteDTO): Promise<Response<any, Record<string, any>>>;
    viewed(response: Response, request: ViewedDTO): Promise<Response<any, Record<string, any>>>;
    getUsers(response: Response): Promise<Response<any, Record<string, any>>>;
}
