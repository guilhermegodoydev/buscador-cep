export async function BuscarDados(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erro ao buscar os dados: ${response.statusText} - Código de erro: ${response.status}`);
    }

    const data = await response.json();

    return data;
}