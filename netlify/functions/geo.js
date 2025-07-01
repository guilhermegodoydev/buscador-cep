export async function handler(event) {
    const endereco = event.queryStringParameters.q;
    const key = process.env.LOCATIONIQ;

    const url = `https://us1.locationiq.com/v1/search?key=${key}&q=${encodeURIComponent(endereco)}&format=json`;

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