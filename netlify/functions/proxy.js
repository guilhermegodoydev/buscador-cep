export async function handler(event) {
    const { q, tipo, uf, cidade, logradouro } = event.queryStringParameters;
    let url;

    if (tipo === 'locationiq') {
        const key = process.env.LOCATIONIQ;
        url = `https://us1.locationiq.com/v1/search?key=${key}&q=${encodeURIComponent(q)}&format=json`;
    } else if (tipo === 'viacep') {
        url = `https://viacep.com.br/ws/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ erro: 'Tipo de API não suportado' }),
        };
    }

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return {
            statusCode: 200,
            body: JSON.stringify(dados),
        };
    } catch (erro) {
        return {
            statusCode: 500,
            body: JSON.stringify({ erro: 'Erro ao buscar dados na API externa' }),
        };
    }
}