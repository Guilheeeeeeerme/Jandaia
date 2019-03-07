
const uuidv1 = require('uuid/v1');

export class Compromisso {

    constructor(
        public tipo: string,
        public at: string,
        public materia: string,
        public observacoes: string,
        public alerta: boolean) {
        this.id = uuidv1();
    }
    id: any;

    public static schedule(compromisso: Compromisso) {

        const id = +compromisso.id.replace(/[^0-9]/g, '');
        const at: Date = new Date(compromisso.at);
        const schedule: any = {
            id: id,
            title: compromisso.tipo + ' de ' + compromisso.materia,
            text: compromisso.at,
            foreground: true
        };

        if (compromisso.tipo === 'Aula') {
            schedule.every = 'week';

            const today = new Date();
            // how many days are between current day (thursday for instance) to sunday, add this difference to this sunday variable
            const weekday = today.getTime() + this.getDayMillDiff(new Date(at).getDay());

            // convert timestamp to Date so that hours can be adjusted
            const firstAt: Date = new Date(weekday);
            firstAt.setHours(
                new Date(at).getHours(),
                new Date(at).getMinutes(),
                0
            );

            console.log(firstAt);

            schedule.firstAt = firstAt;

        } else {
            schedule.trigger = {
                at: at,
            };
        }

        return schedule;

        // if (compromisso.alerta) {
        // localNotification.schedule(schedule);
        // }

        // const cancelPrevious = localNotification.cancel(id);

        // cancelPrevious.then(() => console.log(id, 'Foi cancelado.'));
        // cancelPrevious.catch(() => console.log(id, 'Nao foi cancelado.'));

        // cancelPrevious.finally(() => {


        // });
    }

    private static getDayMillDiff(triggerDay) {
        let curr = new Date();
        let dayMillDiff = 0;
        const dayInMill = 1000 * 60 * 60 * 24;
        // add a day as long as refday(sunday for instance) is not reached
        while (curr.getDay() !== triggerDay) {
            dayMillDiff += dayInMill;
            curr = new Date(curr.getTime() + dayInMill);
        }
        return dayMillDiff;
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
