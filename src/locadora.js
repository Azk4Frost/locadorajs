//Importação da Bíblioteca inquirer
import inquirer from 'inquirer';
//Importação de duas funções criadas para salvar arquivos em storage.js
import { ler_Veiculos, salvar_Veiculos } from './storage.js';

//objeto locadora que contém propriedades e métodos(Funções)
const locadora = {
    // Propriedade Veículos que recebe um método importado de storage.js, que lê os objetos (Carros Cadastrados) que são armazenados em veículos
    veiculos: ler_Veiculos(),

    // Método Cadastrar veículos, que cria os carros, confere se já existem e os encaixam em um array na propriedade veículos 
    cadastrarVeiculo(veiculos) {
    /* constante que verifica se há um ID em algum carro localizado em veículos e compara,
    caso ja exista dispara um console.log que informa que já existe o chassi cadastrado e
    retorna seguindo ao fluxo da aplicação */
    const jaExiste = this.veiculos.find(v => v.Chassi === veiculos.Chassi);
        if (jaExiste === true) {
        console.log("Já existe um veículo com esse Chassi!");
        return;
    };
    /* constante que recebe os objetos criados e adiciona em veiculos a propriedade disponibilidade
    com true de valor para deixá-lo ativo para aluguel, pois se estiver false, o código entende que está alugado*/ 
    const veiculoCompleto = {
    ...veiculos,
    disponibilidade: true,
    };
    /* puxa a constante acima para dentro da propriedade veiculos e salvando o conteúdo dentro de um arquivo JSON e mostra no console que foi
    cadastrado com sucesso, seguindo o fluxo da aplicação*/
    this.veiculos.push(veiculoCompleto);
    salvar_Veiculos(this.veiculos);
    console.log("Veículo cadastrado com sucesso!");
    },

    /*Método que lista todas as opções criadas com o método cadastrarVeículos com o total e todas as informações e disponibilidade,
     caso não houver nada cadastrado, ele mostra na tela que não há nada registrado e pede para cadastrar, seguindo o fluxo da aplicação e voltando ao menu*/
    listarVeiculo() {
        if (this.veiculos.length === 0) {
        console.log("Nenhum veículo cadastrado! faça o seu, cadastro!!");
        } else {
            this.veiculos.forEach((v,pos) => {
                console.log(`Há um total de: ${pos + 1} Veículos Castrados! aqui está o Modelo: ${v.Modelo}, Ano: ${v.Ano}, Chassi: ${v.Chassi}, Disponibilidade: ${v.disponibilidade}`);
            });
        };
    },

    /* Método para aluguel dos veículos cadastrados, primeiro,
    é necessário verificar o ID do chassi do carro que deseja alugar
    e uma comparação é feita com os ID's existentes em veículos 
    e o ID digitado pelo usuário, tendo resultado positivo, o aluguel é feito com sucesso  */
    async alugarVeiculo() {
        const aluguel = await inquirer.prompt([
            {
                type: 'input',
                name: 'Id',
                message: 'Para alugar um carro, digite corretamente o ID do chassi e veja se está disponível:'
            }
        ]);
        const compareId = this.veiculos.find(v => v.Chassi === Number(aluguel.Id));
        
        if (!compareId){
            console.log("ID não encontrado, tente novamente")
            return;
        }

        if (compareId.disponibilidade === false){
            console.log("Este veículo já está alugado.");
            return;
        }

        compareId.disponibilidade = false;
        console.log("Veículos alugado com sucesso")

        salvar_Veiculos(this.veiculos);
    },

    /* Com a mesma lógica do Aluguel, Devolver o veículo corre no sentido oposto onde, invés de verificar a disponibilidade dos veículos true,
    percorre o código procurando carros com disponibilidade false, ou seja, procura carros não disponíveis (Alugados)*/
    async devolverVeiculo() {
        const devolucao = await inquirer.prompt([
            {
                type: 'input',
                name:'Id',
                message: 'Para devolução de um veículo, digite corretamente o chassi para confirmação:'
            }
        ]);

        const compareDevolution = this.veiculos.find(v => v.Chassi === Number(devolucao.Id));

        if (!compareDevolution){
            console.log("ID não encontrado, tente novamente")
            return;
        }

        if (compareDevolution.disponibilidade === true){
            console.log("Este veículo não foi alugado ainda");
            return;
        }

        compareDevolution.disponibilidade = true;
        console.log("Veículos Devolvido com sucesso")

        salvar_Veiculos(this.veiculos);
    }
};

// Exporta a locadora para ser importada em qualquer arquivo
export default locadora;