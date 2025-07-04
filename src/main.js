import { GerarMapa, GerarMarcador, MarcarAreaMapa } from "./modules/mapa.js";
import { ValidarCep, BuscarEndereco, BuscarCepPorEndereco, BuscarGeo } from "./modules/cep.js";
import { AlterarEstadoInputs, ExibirMsgErro, MontarEnderecoCompleto } from "./modules/utils.js";

const input = document.getElementById('entrada');
const label = document.getElementById('lblEntrada');
const rdCEP = document.getElementById('porCEP');
const rdEndereco = document.getElementById('porEndereco');
const msgErro = document.getElementById('erro');
const form = document.querySelector('form');
const saida = document.getElementById('saida');
const formCep = document.getElementById('formCep');
const formEndereco = document.getElementById('formEndereco');
const estado = document.getElementById('estado');
const cidade = document.getElementById('cidade');
const rua = document.getElementById('rua');
const botao = document.getElementById('btnform');

let tipoConsulta = 'cep';

GerarMapa();

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  if (botao) botao.disabled = true;

  msgErro.textContent = '';
  let geo, enderecoExibicao;

  try {
    if (tipoConsulta == 'cep') {
      const cep = input.value.replace(/\D/g, '');
      if (!ValidarCep(cep)) {
        ExibirMsgErro('Digite um CEP válido', msgErro, input);
        return;
      }
      const dataCep = await BuscarEndereco(cep);
      enderecoExibicao = MontarEnderecoCompleto(dataCep);
      saida.textContent = 'Endereço: ' + enderecoExibicao;
      geo = await BuscarGeo(enderecoExibicao);
    } else {
      const cepLocal = await BuscarCepPorEndereco(estado.value, cidade.value, rua.value);
      saida.textContent = 'CEP: ' + cepLocal;
      const dataCep = await BuscarEndereco(cepLocal);
      enderecoExibicao = MontarEnderecoCompleto(dataCep);
      geo = await BuscarGeo(enderecoExibicao);
    }

    GerarMarcador(geo.lat, geo.lon);
    MarcarAreaMapa(geo.limitesbox.lat1, geo.limitesbox.lon1, geo.limitesbox.lat2, geo.limitesbox.lon2);
  } catch (error) {
    ExibirMsgErro('Erro ao buscar dados. Tente novamente.', msgErro, input);
    console.error(error);
  }

  if (botao) botao.disabled = false;
});

function AlternarConsulta(tipo) {
  if (tipo === 'cep') {
    label.textContent = 'CEP:';
    input.placeholder = '00000-000';
    tipoConsulta = 'cep';
    AlterarEstadoInputs(formCep, true);
    AlterarEstadoInputs(formEndereco, false);
    formCep.classList.remove('escondido');
    formEndereco.classList.add('escondido');
  } else {
    label.textContent = 'Endereço:';
    input.placeholder = 'Rua, Bairro, Cidade';
    tipoConsulta = 'endereco';
    AlterarEstadoInputs(formCep, false);
    AlterarEstadoInputs(formEndereco, true);
    formCep.classList.add('escondido');
    formEndereco.classList.remove('escondido');
  }
  input.value = '';
  msgErro.textContent = '';
}

rdCEP.addEventListener('change', () => AlternarConsulta('cep'));
rdEndereco.addEventListener('change', () => AlternarConsulta('endereco'));

input.addEventListener('input', () => {
  if (rdCEP.checked) {
    let novoValue = input.value.replace(/\D/g, '').slice(0,8);

    if (novoValue.length > 5)
      novoValue = novoValue.replace(/(\d{5})(\d{1})/, '$1-$2');

    input.value = novoValue;
  }
});