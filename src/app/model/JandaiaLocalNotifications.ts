import { ILocalNotification } from '@ionic-native/local-notifications/ngx';

export interface JandaiaLocalNotifications {
    cancel(id: number): Promise<any>;
    // getAllScheduled(): Promise<ILocalNotification[]>;
    schedule(schedule: ILocalNotification): void;
}
