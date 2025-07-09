import fs from 'fs';
const JSON_path = './locadora.json';

/* Função que lê os arquivos que são recebidos de veículos e enviados diretamente
ao diretório da constante JSON_path retornando a resposta ao arquivo JSON  */
export function ler_Veiculos() {
    const data = fs.readFileSync(JSON_path, 'utf-8');
    return JSON.parse(data);
}

/*Ao receber os carros cadastrados e armazenados no JSON, a função salva o que foi feito mantendo o que foi
cadastrado em locadora.JSON podendo sair e mesmo assim ter tudo armazenado*/
export function salvar_Veiculos(veiculos){
    fs.writeFileSync(JSON_path, JSON.stringify(veiculos, null, 2), 'utf-8');
;}