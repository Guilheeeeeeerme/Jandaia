import { ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { JandaiaLocalNotifications } from './JandaiaLocalNotifications';

const jandaia_bind_path = 'jandaia_bind';
const jandaia_auto_increment_path = 'jandaia_auto_increment';
// const dayInMill: number = 1000 * 60 * 60 * 24;

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

    public static cancelPrematureNotifications(compromisso: Compromisso, jandaiaLocalNotifications: JandaiaLocalNotifications): void {

        let hash: any = JSON.parse(localStorage.getItem(jandaia_bind_path));

        if (!hash) {
            hash = {};
        }

        if (!hash[compromisso.id]) {
            hash[compromisso.id] = [];
        }

        const schedules: ILocalNotification[] = hash[compromisso.id];

        schedules.map((schedule: ILocalNotification) => {
            this.cancelAndReschedule(schedule, jandaiaLocalNotifications, false);
        });

        localStorage.setItem(jandaia_bind_path, JSON.stringify(hash));
    }

    public static scheduleAll(compromissos: Compromisso[], jandaiaLocalNotifications: JandaiaLocalNotifications): Compromisso[] {

        return compromissos.map((compromisso: Compromisso) => {

            if (isNaN(compromisso.id)) {
                compromisso.id = Compromisso.getId();
            }

            const schedule: ILocalNotification = this.buildScheduleObject(compromisso);

            this.cancelAndReschedule(schedule, jandaiaLocalNotifications, true);

            if (compromisso.tipo !== 'Aula') {
                this.schedulePrematureNotifications(compromisso, jandaiaLocalNotifications);
            }

            return compromisso;
        });

        // throw new Error("Method not implemented.");
    }

    private static schedulePrematureNotifications(compromisso: Compromisso, jandaiaLocalNotifications: JandaiaLocalNotifications): void {
        let hash: any = JSON.parse(localStorage.getItem(jandaia_bind_path));

        if (!hash) {
            hash = {};
        }

        if (!hash[compromisso.id]) {
            hash[compromisso.id] = [];
        }

        const newHash = [];

        [ (24 * 10), (24 * 5), 24 ].map((earlier, index) => {

            let id;


            if (  hash[compromisso.id] &&  hash[compromisso.id][index] && hash[compromisso.id][index].id ) {
                id = hash[compromisso.id][index].id;
            } else {
                id = this.getId();
            }

            let at: Date = new Date(compromisso.at);

            earlier = (earlier * 60 * 60 * 1000);
            at = new Date( at.getTime() - earlier );

            let pre = '';

            if ( index === 2 ) {
                pre = 'Amanahã tem ';
            } else if ( index === 1 ) {
                pre = 'Menos de uma semana para ';
            } else {
                pre = 'Faltam 10 dias para ';
            }

            const schedule: ILocalNotification = {
                id: id,
                title: pre + ' ' + compromisso.tipo + ' de ' + compromisso.materia,
                text: Compromisso.getRandomSentence(),
                foreground: true,
                vibrate: true
            };

            const newAt: Date = new Date(at);

            const year = newAt.getFullYear();
            const month = newAt.getMonth();
            const day = newAt.getDate();
            const hours = newAt.getHours();
            const minutes = newAt.getMinutes();
            const seconds = 0;
            const milliseconds = 0;

            schedule.trigger = {
                at: new Date(year, month, day, hours, minutes, seconds, milliseconds),
            };

            newHash.push(schedule);

            this.cancelAndReschedule(schedule, jandaiaLocalNotifications, true);

        });

        hash[compromisso.id] = newHash;
        localStorage.setItem(jandaia_bind_path, JSON.stringify(hash));

    }

    private static getRandomSentence() {
        /**
         * Returns a random number between min (inclusive) and max (exclusive)
         */
        const getRandomArbitrary = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const sentences = [
            'Eai? Já estudou?',
            'Já está preparado?',
            'Corre !!!',
            'Ta chegando !!!',
            'Essa vai ser fácil'
        ];

        return sentences[ Math.floor(getRandomArbitrary(0, sentences.length)) ];
    }

    private static getId(): number {
        let id = +localStorage.getItem(jandaia_auto_increment_path);

        if (isNaN(id)) {
            id = 0;
        }

        id++;

        localStorage.setItem(jandaia_auto_increment_path, String(id));

        return id;
    }

    private static cancelAndReschedule(
        schedule: ILocalNotification,
        jandaiaLocalNotifications: JandaiaLocalNotifications,
        reschedule: boolean): void {
        jandaiaLocalNotifications.cancel(schedule.id).finally(() => {
            // jandaiaLocalNotifications.getAllScheduled().then((all: ILocalNotification[]) => {
            //     console.log({
            //         all
            //     });
            // });
            if (reschedule) {
                // delete schedule.id;
                delete schedule.trigger;
                schedule.id = this.getId();
                // console.log(schedule);
                jandaiaLocalNotifications.schedule(schedule);
            }
        });
    }

    private static buildScheduleObject(compromisso: Compromisso): ILocalNotification {

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
            foreground: true,
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
            const seconds = 0;
            const milliseconds = 0;

            schedule.trigger = {
                at: new Date(year, month, day, hours, minutes, seconds, milliseconds),
            };
        }

        return schedule;
    }

}
//       AGENDA
// + Adicionar compromisso
// 	Tipo:
// 		- Prova
// 		- Trabalho
// 	Quando:
// 		- Data:
// 		- Horário:
// 	Detalhes:
// 		- Matéria:
// 			- Matemática
// 			- Português
// 		- Observações:

// Criar alerta [  ] SIM


// const today = new Date();
// // how many days are between current day (thursday for instance) to sunday, add this difference to this sunday variable
// const weekday = today.getTime() + this.getDayMillDiff(new Date(at).getDay());

// // convert timestamp to Date so that hours can be adjusted
// let firstAt: Date = new Date(weekday);
// firstAt.setHours(
//     new Date(at).getHours(),
//     new Date(at).getMinutes(),
//     0
// );

// while (firstAt.getTime() > today.getTime()) {
//     firstAt = new Date(firstAt.getTime() - (this.dayInMill * 7));
// }

// if (firstAt.getTime() < today.getTime()) {
//     firstAt = new Date(firstAt.getTime() + (this.dayInMill * 7));
// }

// schedule.every = 'week';
// schedule.firstAt = firstAt;

// private static getDayMillDiff(triggerDay) {
//     let curr = new Date();

//     let dayMillDiff = 0;
//     // add a day as long as refday(sunday for instance) is not reached
//     while (curr.getDay() !== triggerDay) {
//         dayMillDiff += this.dayInMill;
//         curr = new Date(curr.getTime() + this.dayInMill);
//     }
//     return dayMillDiff;
// }
