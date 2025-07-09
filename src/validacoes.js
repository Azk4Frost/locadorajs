/*Função onde receve o que foi escrito no campo "Modelo"
e passa teste com o regex validando o que foi escrito,
se estiver no padrão, retorna true e segue a aplicação,
se retornar falso, dá erro e mostra que não foi possível cadastrar*/
export function validar_Modelo(Modelo) {
    if(/^[a-zA-Z\s]*$/.test(Modelo)) {
        return true;
    }else {
        return false;
    };
};

/*Função onde receve o que foi escrito no campo "Ano"
e passa teste com o regex validando o que foi escrito,
se estiver no padrão, retorna true e segue a aplicação,
se retornar falso, dá erro e mostra que não foi possível cadastrar*/
export function validar_Ano(Ano) {
    if(/^[\d\s]*$/.test(Ano)) {
        return true;
    }else {
        return false;
    };
}

/*Função onde receve o que foi escrito no campo "Chassi"
e passa teste com o regex validando o que foi escrito,
se estiver no padrão, retorna true e segue a aplicação,
se retornar falso, dá erro e mostra que não foi possível cadastrar*/
export function validar_Chassi(Chassi) {
    if(/^[\d\s]*$/.test(Chassi)) {
        return true;
    }else {
        return false;
    };
}
