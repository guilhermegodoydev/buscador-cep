import { GerarMapa } from "./modules/mapa.js";
import { ValidarCep, BuscarEndereco } from "./modules/cep.js";

const input = document.getElementById('entrada');
const label = document.getElementById('lblEntrada');
const rdCEP = document.getElementById('porCEP');
const rdEndereco = document.getElementById('porEndereco');
const msgErro = document.getElementById('erro');
const form = document.querySelector('form');
const saida = document.getElementById('saida');
const formCep = document.getElementById('formCep');
const formEndereco = document.getElementById('formEndereco');

let tipoConsulta = 'cep';

GerarMapa();

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const cep = input.value.replace('-','');

  if (tipoConsulta == 'cep') {
    if (!ValidarCep(cep)) {
      ExibirMsgErro('Digite um CEP válido com 8 dígitos.');
      return;
    }
    msgErro.textContent = '';
    saida.textContent = await BuscarEndereco(cep);
  }
  else {
    //saida.textContent = await;
  }
});

rdCEP.addEventListener('change', () => {
  if (rdCEP.checked) {
    label.textContent = 'CEP:';
    input.placeholder = '00000-000';
    input.value = '';
    tipoConsulta = 'cep';

    formCep.classList.remove('escondido');
    let inputs2 = formCep.querySelectorAll('input');
    inputs2.forEach(input => {
      input.disabled = false;
      input.required = true;
    });

    formEndereco.classList.add('escondido');
    let inputs = formEndereco.querySelectorAll('input');
    inputs.forEach(input => {
      input.disabled = true;
      input.required = false;
    });
  }
});

rdEndereco.addEventListener('change', () => {
  if (rdEndereco.checked) {
    label.textContent = 'Endereço:';
    input.placeholder = 'Rua, Bairro, Cidade';
    input.value = '';
    tipoConsulta = 'endereco';

    formEndereco.classList.remove('escondido');
    let inputs2 = formEndereco.querySelectorAll('input');
    inputs2.forEach(input => {
      input.disabled = false;
      input.required = true;
    });

    formCep.classList.add('escondido');
    let inputs = formCep.querySelectorAll('input');
    inputs.forEach(input => {
      input.disabled = true;
      input.required = false;
    });
  }
});

input.addEventListener('input', () => {
  if (rdCEP.checked) {
    let novoValue = input.value.replace(/\D/g, '').slice(0,8);

    if (novoValue.length > 5)
      novoValue = novoValue.replace(/(\d{5})(\d{1})/, '$1-$2');

    input.value = novoValue;
  }
});

function ExibirMsgErro(mensagem) {
  msgErro.classList.add('msgErro');
  msgErro.textContent = mensagem;
  input.focus();
}