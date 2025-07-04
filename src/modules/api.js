export async function BuscarDados(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados: ${response.statusText} - Código de erro: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Erro de rede ou ao processar resposta: ${error.message}`);
    }
}