export function ExibirMsgErro(mensagem, msgErroElem, inputElem) {
  msgErroElem.classList.add('msgErro');
  msgErroElem.innerHTML = mensagem;
  if (inputElem) inputElem.focus();
}

export function MontarEnderecoCompleto(data) {
  const partes = [data.logradouro, data.bairro, data.localidade, data.uf, 'Brasil'];
  return partes.filter(Boolean).join(', ');
}

export function AlterarEstadoInputs(form, estado) {
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.disabled = !estado;
    input.required = estado;
  });
}

export function RemoverAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}