import { BuscarDados } from '../modules/api.js';

export async function BuscarEndereco(cep) {
    let data = await BuscarDados(`https://viacep.com.br/ws/${cep}/json/`);

    let endereco = data.logradouro + ', ' + data.bairro + ', ' + data.localidade + ' - ' + data.estado;

    return endereco;
}

export async function BuscarCepPorEndereco(uf, cidade, logradouro) {
    let data = await BuscarDados(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`);

    return data[0]['cep'];
}

export async function BuscarGeo(endereco) {
    return await BuscarDados(`/.netlify/functions/geo?q=${encodeURIComponent(endereco)}`);
}

export function ValidarCep(cep){
    const valor = cep.replace(/\D/g, '');

    return valor.length === 8;
}