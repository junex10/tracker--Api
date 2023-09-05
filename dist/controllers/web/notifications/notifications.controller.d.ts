import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import { NotificationDTO } from './notifications.entity';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    newTreatment(response: Response, request: NotificationDTO): Promise<Response<any, Record<string, any>>>;
}
