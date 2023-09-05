import { Server } from 'socket.io';
import { SocketService } from './socket.service';
export declare class SocketController {
    private readonly socketService;
    server: Server;
    constructor(socketService: SocketService);
}
