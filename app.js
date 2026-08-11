/* ===================================================================
   app.js
   -------------------------------------------------------------------
   Este arquivo é o "cérebro" da loja. Ele é carregado em TODAS as
   páginas (index.html, carrinho.html e checkout.html) e cuida de:

   1) Ler e salvar o carrinho no LocalStorage (nosso "banco de dados")
   2) Adicionar / remover / alterar quantidade de produtos
   3) Atualizar o contador de itens no ícone do carrinho (navbar)
   4) Renderizar (desenhar) o catálogo, o carrinho e finalizar a compra

   Dica para a apresentação: o LocalStorage é uma memória do navegador
   que guarda dados em formato de TEXTO (chave/valor) e continua lá
   mesmo se a página for recarregada ou fechada.
=================================================================== */

// Chave usada para salvar o carrinho no LocalStorage
const CHAVE_CARRINHO = "carrinho";

/* -------------------------------------------------------------------
   FUNÇÕES DE ACESSO AO "BANCO DE DADOS" (LocalStorage)
------------------------------------------------------------------- */

// Busca o carrinho salvo no LocalStorage.
// Como o LocalStorage só guarda texto, usamos JSON.parse() para
// transformar o texto de volta em um array/objeto JavaScript.
function obterCarrinho() {
  const dados = localStorage.getItem(CHAVE_CARRINHO);
  return dados ? JSON.parse(dados) : [];
}

// Salva o carrinho no LocalStorage.
// Usamos JSON.stringify() para transformar o array/objeto em texto.
function salvarCarrinho(carrinho) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  atualizarContadorCarrinho(); // sempre que salvar, atualiza o número no ícone
}

/* -------------------------------------------------------------------
   OPERAÇÕES DO CARRINHO
------------------------------------------------------------------- */

// Adiciona um produto ao carrinho (ou aumenta a quantidade se já existir)
function adicionarAoCarrinho(idProduto) {
  const produto = PRODUTOS.find((p) => p.id === idProduto);
  if (!produto) return;

  const carrinho = obterCarrinho();

  // Verifica se o produto já está no carrinho
  const itemExistente = carrinho.find((item) => item.id === idProduto);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    // Guardamos só o essencial no carrinho (id, nome, preço, imagem, quantidade)
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
  }

  salvarCarrinho(carrinho);
  mostrarNotificacao(`"${produto.nome}" adicionado ao carrinho!`);
}

// Altera a quantidade de um item (delta pode ser +1 ou -1)
function alterarQuantidade(idProduto, delta) {
  const carrinho = obterCarrinho();
  const item = carrinho.find((p) => p.id === idProduto);
  if (!item) return;

  item.quantidade += delta;

  // Se a quantidade chegar a zero, remove o item do carrinho
  if (item.quantidade <= 0) {
    removerDoCarrinho(idProduto);
    return;
  }

  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

// Remove um item completamente do carrinho
function removerDoCarrinho(idProduto) {
  let carrinho = obterCarrinho();
  carrinho = carrinho.filter((p) => p.id !== idProduto);
  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

// Calcula o valor total do carrinho (soma de preço x quantidade)
function calcularTotal(carrinho) {
  return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

// Conta quantos itens (somando quantidades) existem no carrinho
function contarItensCarrinho(carrinho) {
  return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

/* -------------------------------------------------------------------
   FORMATAÇÃO
------------------------------------------------------------------- */

// Formata um número para o padrão de moeda brasileiro (R$ 0,00)
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* -------------------------------------------------------------------
   INTERFACE: NAVBAR (contador do carrinho, presente em todas as páginas)
------------------------------------------------------------------- */

function atualizarContadorCarrinho() {
  const carrinho = obterCarrinho();
  const total = contarItensCarrinho(carrinho);

  // Pode existir mais de um elemento com essa classe (ex: versão mobile e desktop)
  document.querySelectorAll(".contador-carrinho").forEach((el) => {
    el.textContent = total;
    // Esconde a bolinha quando o carrinho está vazio
    el.classList.toggle("hidden", total === 0);
  });
}

// Pequena notificação "toast" que aparece no canto da tela
function mostrarNotificacao(mensagem) {
  const toastExistente = document.getElementById("toast");
  if (toastExistente) toastExistente.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = mensagem;
  toast.className =
    "fixed bottom-5 right-5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-lg z-50 " +
    "animate-[fadeInUp_0.3s_ease-out] text-sm font-medium";
  document.body.appendChild(toast);

  // Remove a notificação depois de 2.5 segundos
  setTimeout(() => toast.remove(), 2500);
}

/* -------------------------------------------------------------------
   INTERFACE: CATÁLOGO DE PRODUTOS (index.html)
------------------------------------------------------------------- */

function renderizarCatalogo() {
  const container = document.getElementById("catalogo");
  if (!container) return; // se não existir essa div nessa página, não faz nada

  container.innerHTML = PRODUTOS.map(
    (produto) => `
    <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div class="aspect-square overflow-hidden bg-slate-100">
        <img src="${produto.imagem}" alt="${produto.nome}"
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div class="p-4 flex flex-col flex-1">
        <span class="text-xs uppercase tracking-wide text-amber-600 font-semibold mb-1">${produto.categoria}</span>
        <h3 class="font-semibold text-slate-800 mb-2 flex-1">${produto.nome}</h3>
        <p class="text-xl font-bold text-slate-900 mb-3">${formatarPreco(produto.preco)}</p>
        <button
          onclick="adicionarAoCarrinho(${produto.id})"
          class="w-full bg-slate-900 hover:bg-amber-600 text-white font-medium py-2.5 rounded-xl transition-colors duration-200">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `
  ).join("");
}

/* -------------------------------------------------------------------
   INTERFACE: PÁGINA DO CARRINHO (carrinho.html)
------------------------------------------------------------------- */

function renderizarCarrinho() {
  const container = document.getElementById("lista-carrinho");
  if (!container) return; // só executa na página do carrinho

  const carrinho = obterCarrinho();
  const areaVazio = document.getElementById("carrinho-vazio");
  const areaResumo = document.getElementById("resumo-carrinho");

  // Carrinho vazio: mostra mensagem e esconde lista/resumo
  if (carrinho.length === 0) {
    container.innerHTML = "";
    if (areaVazio) areaVazio.classList.remove("hidden");
    if (areaResumo) areaResumo.classList.add("hidden");
    return;
  }

  if (areaVazio) areaVazio.classList.add("hidden");
  if (areaResumo) areaResumo.classList.remove("hidden");

  // Desenha cada item do carrinho
  container.innerHTML = carrinho
    .map(
      (item) => `
    <div class="flex items-center gap-4 bg-white rounded-2xl shadow-sm p-4">
      <img src="${item.imagem}" alt="${item.nome}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0" />

      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-slate-800 truncate">${item.nome}</h3>
        <p class="text-slate-500 text-sm">${formatarPreco(item.preco)} / unidade</p>
      </div>

      <div class="flex items-center gap-2 border border-slate-200 rounded-lg">
        <button onclick="alterarQuantidade(${item.id}, -1)"
                class="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg font-bold">−</button>
        <span class="w-6 text-center font-medium">${item.quantidade}</span>
        <button onclick="alterarQuantidade(${item.id}, 1)"
                class="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg font-bold">+</button>
      </div>

      <p class="w-24 text-right font-bold text-slate-900">${formatarPreco(item.preco * item.quantidade)}</p>

      <button onclick="removerDoCarrinho(${item.id})" title="Remover item"
              class="text-slate-400 hover:text-red-500 transition-colors p-2">
        ✕
      </button>
    </div>
  `
    )
    .join("");

  // Atualiza o resumo (subtotal, total, quantidade de itens)
  const total = calcularTotal(carrinho);
  const qtdItens = contarItensCarrinho(carrinho);

  const elTotal = document.getElementById("valor-total");
  const elQtd = document.getElementById("qtd-itens");
  if (elTotal) elTotal.textContent = formatarPreco(total);
  if (elQtd) elQtd.textContent = qtdItens;
}

/* -------------------------------------------------------------------
   INTERFACE: CHECKOUT (checkout.html)
------------------------------------------------------------------- */

// Mostra o resumo do pedido na página de checkout (somente leitura)
function renderizarResumoCheckout() {
  const container = document.getElementById("resumo-checkout");
  if (!container) return; // só executa na página de checkout

  const carrinho = obterCarrinho();

  if (carrinho.length === 0) {
    container.innerHTML = `<p class="text-slate-500 text-sm">Seu carrinho está vazio.</p>`;
    const btn = document.getElementById("btn-finalizar");
    if (btn) btn.disabled = true;
    return;
  }

  const linhas = carrinho
    .map(
      (item) => `
      <div class="flex justify-between text-sm py-1.5">
        <span class="text-slate-600">${item.nome} <span class="text-slate-400">x${item.quantidade}</span></span>
        <span class="font-medium text-slate-800">${formatarPreco(item.preco * item.quantidade)}</span>
      </div>`
    )
    .join("");

  const total = calcularTotal(carrinho);

  container.innerHTML = `
    ${linhas}
    <div class="border-t border-slate-200 mt-3 pt-3 flex justify-between font-bold text-slate-900">
      <span>Total</span>
      <span>${formatarPreco(total)}</span>
    </div>
  `;
}

// Executado quando o formulário de checkout é enviado
function finalizarCompra(evento) {
  evento.preventDefault(); // impede o recarregamento da página

  const carrinho = obterCarrinho();
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // Coleta os dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  // Monta um "pedido" e salva no LocalStorage (histórico simples)
  const pedido = {
    cliente: { nome, email, endereco, pagamento },
    itens: carrinho,
    total: calcularTotal(carrinho),
    data: new Date().toLocaleString("pt-BR")
  };
  localStorage.setItem("ultimoPedido", JSON.stringify(pedido));

  // Limpa o carrinho, pois a compra foi concluída
  salvarCarrinho([]);

  // Feedback para o usuário
  alert(
    `Pedido realizado com sucesso! 🎉\n\nObrigado, ${nome}!\nTotal: ${formatarPreco(pedido.total)}\nForma de pagamento: ${pagamento}`
  );

  // Redireciona de volta para a loja
  window.location.href = "index.html";
}

/* -------------------------------------------------------------------
   INICIALIZAÇÃO
   Executa assim que o HTML da página termina de carregar.
------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  atualizarContadorCarrinho();
  renderizarCatalogo();
  renderizarCarrinho();
  renderizarResumoCheckout();
});