import { NotificationType, Notifications, User } from 'src/models';
import { NotificationDTO } from './notifications.entity';
export declare class NotificationsService {
    private notificationsTypeModel;
    private notificationsModel;
    private userModel;
    constructor(notificationsTypeModel: typeof NotificationType, notificationsModel: typeof Notifications, userModel: typeof User);
    newTreatment: (request: NotificationDTO) => Promise<boolean>;
}
