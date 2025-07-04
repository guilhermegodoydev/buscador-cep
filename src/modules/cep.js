import { BuscarDados } from '../modules/api.js';

export async function BuscarEndereco(cep) {
    return await BuscarDados(`https://viacep.com.br/ws/${cep}/json/`);
}

export async function BuscarCepPorEndereco(uf, cidade, logradouro) {
    let data = await BuscarDados(`/.netlify/functions/proxy?tipo=viacep&uf=${encodeURIComponent(uf)}&cidade=${encodeURIComponent(cidade)}&logradouro=${encodeURIComponent(logradouro)}`);
    if (Array.isArray(data) && data.length > 0 && data[0].cep) {
        return data[0]['cep'];
    }
    throw new Error('CEP não encontrado para o endereço informado.');
}

export async function BuscarGeo(endereco) {
    let data = await BuscarDados(`/.netlify/functions/proxy?tipo=locationiq&q=${encodeURIComponent(endereco)}`);
    if (Array.isArray(data) && data.length > 0 && data[0].lat && data[0].lon && data[0].boundingbox) {
        return {
            lat: data[0]['lat'],
            lon: data[0]['lon'],
            limitesbox: {
                lat1: data[0]['boundingbox'][0],
                lon1: data[0]['boundingbox'][2],
                lat2: data[0]['boundingbox'][1],
                lon2: data[0]['boundingbox'][3]
            }
        };
    }
    throw new Error('Localização não encontrada para o endereço informado.');
}

export function ValidarCep(cep){
    const valor = cep.replace(/\D/g, '');

    return valor.length === 8;
}