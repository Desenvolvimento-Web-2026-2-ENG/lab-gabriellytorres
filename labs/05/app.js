const LIMITE = 100;
let itens = [];

const inputNome = document.querySelector("#nome");
const inputPreco = document.querySelector("#preco");
const inputQuantidade = document.querySelector("#quantidade");
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnDesfazer = document.querySelector("#btn-desfazer");
const btnLimpar = document.querySelector("#btn-limpar");

const elMensagem = document.querySelector("#mensagem");
const elQtdItens = document.querySelector("#qtd-itens");
const elTotal = document.querySelector("#total");
const elSaldo = document.querySelector("#saldo");
const elDesconto = document.querySelector("#desconto");
const elStatusOrcamento = document.querySelector("#status-orcamento");
const elLista = document.querySelector("#lista");

function validarEntrada(nome, preco, quantidade) {
  if (!nome || nome.trim() === "") {
    return "Por favor, informe o nome do item.";
  }
  if (Number.isNaN(preco) || preco <= 0) {
    return "O preço deve ser um valor maior que zero.";
  }
  if (Number.isNaN(quantidade) || quantidade < 1) {
    return "A quantidade deve ser no mínimo 1.";
  }
  return ""; 
}

function atualizarInterface() {
  elLista.innerHTML = "";
  let total = 0;

  for (const item of itens) {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.textContent = `${item.nome} (${item.quantidade}x R$ ${item.preco.toFixed(2)}) - Subtotal: R$ ${subtotal.toFixed(2)}`;
    elLista.appendChild(li);
  }

  const saldo = LIMITE - total;
  elQtdItens.textContent = itens.length;
  elTotal.textContent = `R$ ${total.toFixed(2)}`;
  elSaldo.textContent = `R$ ${saldo.toFixed(2)}`;

  if (total > LIMITE) {
    elStatusOrcamento.textContent = "Orçamento estourado!";
    elStatusOrcamento.classList.add("alerta");
  } else {
    elStatusOrcamento.textContent = "Dentro do orçamento";
    elStatusOrcamento.classList.remove("alerta");
  }

  if (total > 150) {
    const totalComDesconto = total * 0.9;
    elDesconto.textContent = `Total com 10% de desconto: R$ ${totalComDesconto.toFixed(2)}`;
  } else {
    elDesconto.textContent = "";
  }
}

btnAdicionar.addEventListener("click", function () {
  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);
  const quantidade = parseInt(inputQuantidade.value, 10);

  const erro = validarEntrada(nome, preco, quantidade);

  if (erro !== "") {
    elMensagem.textContent = erro;
    return;
  }

  elMensagem.textContent = "";
  itens.push({ nome, preco, quantidade });

  inputNome.value = "";
  inputPreco.value = "";
  inputQuantidade.value = "1";
  inputNome.focus();

  atualizarInterface();
});

btnDesfazer.addEventListener("click", function () {
  if (itens.length > 0) {
    itens.pop();
    elMensagem.textContent = "";
    atualizarInterface();
  }
});

btnLimpar.addEventListener("click", function () {
  itens = [];
  elMensagem.textContent = "";
  atualizarInterface();
});

atualizarInterface();
