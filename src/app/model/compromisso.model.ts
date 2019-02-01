import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

// export enum TipoCompromisso {
//     Prova,
//     Trabalho,
//     Materia,
// }

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

    public static schedule(compromisso: Compromisso, localNotification: LocalNotifications) {

        localNotification.cancel(compromisso.id).finally(() => {
            try {
                if (compromisso.alerta) {

                    const at: Date = new Date(compromisso.at);

                    if (compromisso.tipo === 'Aula') {

                        localNotification.schedule({
                            id: compromisso.id,
                            title: ' - ' + compromisso.tipo + ' de ' + compromisso.materia,
                            text: compromisso.at,
                            every: 'week',
                            trigger: {
                                at: at,
                            }
                        });
                    } else {

                        localNotification.schedule({
                            id: compromisso.id,
                            title: ' - ' + compromisso.tipo + ' de ' + compromisso.materia,
                            text: compromisso.at,
                            trigger: {
                                at: at,
                            }
                        });

                    }
                }

            } catch (e) {

            }

        });
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
