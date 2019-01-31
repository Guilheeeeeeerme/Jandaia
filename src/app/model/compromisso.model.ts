// export enum TipoCompromisso {
//     Prova,
//     Trabalho,
//     Materia,
// }

export class Compromisso {

    constructor(
        public tipo: string,
        public dia: string,
        public hora: string,
        public materia: string,
        public observacoes: string,
        public alerta: boolean) {
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
}