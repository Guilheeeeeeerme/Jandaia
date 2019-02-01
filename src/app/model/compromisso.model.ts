
const uuidv1 = require('uuid/v1');

export class Compromisso {
    id: any;

    constructor(
        public tipo: string,
        public at: string,
        public materia: string,
        public observacoes: string,
        public alerta: boolean) {
        this.id = uuidv1();
    }

    public static schedule(compromisso: Compromisso) {

        const id = +compromisso.id.replace(/[^0-9]/g, '');
        const at: Date = new Date(compromisso.at);
        const schedule: any = {
            id: id,
            title: compromisso.tipo + ' de ' + compromisso.materia,
            text: compromisso.at,
            trigger: {
                at: at,
            },
            foreground: true
        };

        if (compromisso.tipo === 'Aula') {
            schedule.every = 'week';
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
