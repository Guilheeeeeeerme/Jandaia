import { ILocalNotification } from '@ionic-native/local-notifications/ngx';
const jandaia_auto_increment_path = 'jandaia_auto_increment';

export class Compromisso {

    public id: number;
    public earlier: any;

    constructor(
        public tipo: string,
        public at: string,
        public materia: string,
        public observacoes: string,
        public alerta: boolean) {
        this.id = Compromisso.getId();
    }

    public static getId(): number {
        let id = +localStorage.getItem(jandaia_auto_increment_path);

        if (isNaN(id)) {
            id = 0;
        }

        id++;

        localStorage.setItem(jandaia_auto_increment_path, String(id));

        return id;
    }

    public static buildScheduleObject(compromisso: Compromisso): ILocalNotification {

        const id = +compromisso.id;
        let at: Date = new Date(compromisso.at);
        const _at: Date = new Date(compromisso.at);

        try {

            let earlier = +compromisso.earlier;

            if (!isNaN(earlier) && earlier > 0) {
                earlier = (earlier * 60 * 1000);
                at = new Date( at.getTime() - earlier );
            }

        } catch (error) {
            console.error(error);
        }

        const schedule: ILocalNotification = {
            id: id,
            title: compromisso.tipo + ' de ' + compromisso.materia,
            text: _at.toLocaleTimeString(),
            vibrate: true
        };

        if (compromisso.tipo === 'Aula') {

            let weekday = new Date(at).getDay();
            weekday = (weekday === 0) ?  7 : weekday;

            schedule.trigger = {
                every: {
                    weekday: weekday,
                    hour: new Date(at).getHours(),
                    minute: new Date(at).getMinutes(),
                },
                count: 365
            };

            // schedule.priority = 1;

        } else {

            const newAt: Date = new Date(at);

            const year = newAt.getFullYear();
            const month = newAt.getMonth();
            const day = newAt.getDate();
            const hours = newAt.getHours();
            const minutes = newAt.getMinutes();

            // at: new Date(year, month, day, hours, minutes, seconds, milliseconds),

            schedule.trigger = {
                // every: { year: year, month: month, day: day, hour: hours, minute: minutes },
                at: new Date(year, month, day, hours, minutes, 0, 0)
                // every: {
                //     minute: minutes,
                //     hour: hours,
                //     day: day,
                //     month: month,
                //     year: year
                // },
            };
        }

        return schedule;
    }

}