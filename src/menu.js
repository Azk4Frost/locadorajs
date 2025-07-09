/* Importações para dentro de menu para validação, prompt e seu resultado */
import inquirer from 'inquirer';
import locadora from './locadora.js';
import { validar_Ano, validar_Modelo, validar_Chassi } from './validacoes.js';

/* Variável que é fundamental para a execução da aplicação, pois como ela sempre será true
ela percorre uma função importante mantendo o código rodando, não encerrando assim que um método é acessado*/ 
let executando = true;

/*Hub de cadadstro onde pergunta o modelo, ano e chassi do carro que deseja cadastrar e valida seus campos
com regex, para checar se o que foi digitado pelo usuário foi correto (texto em campo de texto e numero em campos de número por exemplo) */
const Cadastrar = async () => {
    const resposta_cadastro = await inquirer.prompt([
        //Informa o modelo do carro
        {
            type: 'input',
            name: 'Modelo',
            message: 'Qual o modelo do carro?'
        },
        //Informa o Ano de fabricação
        {
            type: 'number',
            name: 'Ano',
            message: 'Qual o ano de fabricação?'
        },
        //Informa o ID do chassi
        {
            type: 'number',
            name: 'Chassi',
            message: 'Qual o id do chassi?'
        },
    ]);

    /* Estrutura condicional que valida os campos com a função importada de validações.js */
    if (
        !validar_Modelo(resposta_cadastro.Modelo) ||
        !validar_Ano(resposta_cadastro.Ano) ||
        !validar_Chassi(resposta_cadastro.Chassi)
    ) {
        console.log("Dados inválidos. Tente novamente.");
        return;
    }

    /*Ao Importar a locadora para dentro do menu, podemos passar como parâmetro Resposta_cadastro e seus dados, para a criação,
    listagem, aluguel e devolução dos veículos  */
    locadora.cadastrarVeiculo(resposta_cadastro);

};

/* Função criada para caso o usuário quiser encerrar manualmente a aplicação */
const Sair = async () => {
    console.log('Saindo...')
    process.exit()
}

//função assíncrona onde contém um menu Prompt inquirer que lista as opções ao usuário esperando uma resposta
async function menuPrincipal() {
    const menu = await inquirer.prompt([
    {
        //Seleciona qual o tipo do prompt inquirer
        type: 'list',
        //nomeia a chave que receberá a opção selecionada
        name: 'ação',
        // Mensagem mostrando como utilizar a aplicação
        message: 'Seja Bem vindo a locadora Javascript! Utilize as SETAS para navegação e ENTER para confirmar',
        //As opções do menu da lista, aqui fica o fluxo da aplicação e determinaremos para onde vai
        choices: ['Cadastrar', 'Listar', 'Alugar', 'Devolver', 'Sair']
    }
    ]);
    //Estrutura de Condicional, que para cada opção no menu, executa uma função diferente 
    switch (menu.ação){
        case 'Cadastrar': 
            await Cadastrar()
            break
        case 'Listar': 
            await locadora.listarVeiculo()
            break
        case 'Sair':
            await Sair()
            break
        case 'Alugar':
            await locadora.alugarVeiculo()
            break
        case 'Devolver':
            await locadora.devolverVeiculo()
            break
        default: 
        console.log('opção inválida, tente novamente!');
    }
}

/* Coração da aplicação, criada para manter o menu aberto mesmo depois de escolher uma opção, utilizando a constante "executando"
que sempre recebe true, mantendo while ativo e criando um loop */
export const iniciar = async () => {
    while(executando){
        await menuPrincipal()
    }
};

