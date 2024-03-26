var carrinho = []
var produtos = [
    {
        code: 1,
        nome: "Leite Integral",
        marca: "Italac",
        unidade: "1L",
        preco: 4.50,
      },
      {
        code: 2,
        nome: "Arroz Branco",
        marca: "Tio João",
        unidade: "5kg",
        preco: 12.90,
      },
      {
        code: 3,
        nome: "Papel Higiênico",
        marca: "Neve",
        unidade: "12 rolos",
        preco: 15.90,
      },
      {
        code: 4,
        nome: "Chocolate em Pó 50% Cacau",
        marca: "Nestle",
        unidade: "1,01Kg",
        preco: 79.99,
      },
]

// Função para formatar o CPF
function formatCPFInput() {
    console.log("Formatando CPF...");
    var cpfInput = document.getElementById('cpf');
    var value = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    var newValue = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formata o CPF
    cpfInput.value = newValue;
}

// Event listeners para chamar as funções de formatação e validação ao digitar nos campos
document.getElementById('cpf').addEventListener('input', formatCPFInput);

// Event listener para validar o formulário antes de enviar
document.getElementById('productForm').addEventListener('submit', function(event) {
    var paymentMethod = document.getElementById('paymentMethod').value;

    if ((paymentMethod === 'credit' || paymentMethod === 'debit') && !isValidCPF()) {
        event.preventDefault(); // Impede o envio do formulário se o CPF for inválido
    }
});
var valorTotalCompra = 0;

function addItem(){
    var codeItem = document.getElementById('productCode').value;
    var quantItem = document.getElementById('quantity').value;
    // Verificar se os inputs estão vazios
    if (codeItem === "" || quantItem === "") {
        // Bloquear a ação do botão
        event.preventDefault();
        // Exibir mensagem de erro
        alert("Preencha todos os campos!");
        return;
    }
    codeItem = codeItem - 1;
    // Adicionar o item à lista (seu código)
    // Limpar os inputs
    document.getElementById("productCode").value = "";
    document.getElementById("quantity").value = "";
    alert("Item adicionado!")
    const btnContinuar = document.getElementById("btn-continuar");
    btnContinuar.style.display = "inline-block";

    var valorItem = produtos[codeItem].preco * quantItem
    valorTotalCompra = valorTotalCompra + valorItem

    carrinho.push({
        code: codeItem,
        nome: produtos[codeItem].nome,
        marca: produtos[codeItem].marca,
        unidade: produtos[codeItem].unidade,
        preco: produtos[codeItem].preco,
        quantidade: quantItem,
        total: valorItem,
    })
    
}
const divProdutos = document.getElementById('div-produtos');
const divClientes = document.getElementById('div-cliente');
const divNotaF = document.getElementById('div-notaF');

var CPF = "";
var payment = "";

function continueForCliente(){
    divProdutos.style.display = "none";
    divClientes.style.display = "block";
    document.getElementById('totalSpan').innerHTML = valorTotalCompra
}
function showInvoiceDetails() {
    let invoiceDetailsHTML = "";
    for (const item of carrinho) {
      invoiceDetailsHTML += `
        <p><strong>${item.nome} (${item.marca})</strong></p>
        <p>Quantidade: ${item.quantidade} ${item.unidade}</p>
        <p>Preço: R$ ${item.total.toFixed(2)}</p>
        <hr>
      `;
    }
    document.getElementById("invoiceDetails").innerHTML = invoiceDetailsHTML;
  }
  
    document.getElementById('paymentMethod').addEventListener('change', function() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cashPayment = document.getElementById('cashPayment');
    
  
    if (paymentMethod === 'dinheiro') {
      cashPayment.style.display = "block";
    } else {
      cashPayment.style.display = "none";
    }
  });

  
 

  function continueForNotaF(){
    payment = document.getElementById('paymentMethod').value
    CPF = document.getElementById('cpf').value
    var valorPago = document.getElementById('valorPago').value;
    var cpf = document.getElementById('cpf').value;

    if (payment === "") {
        // Bloquear a ação do botão
        event.preventDefault();
        // Exibir mensagem de erro
        alert("Preencha o campo de pagamento!");
        return;
    }
      
    divClientes.style.display = "none";
    divNotaF.style.display = "block"
    showInvoiceDetails();
    document.getElementById('cpfNotaFiscal').innerHTML = CPF
    document.getElementById('MPNotaFiscal').innerHTML = payment
    document.getElementById('valorTotal').innerHTML = valorTotalCompra;
    var labelTroco = document.getElementById('troco');
    labelTroco.innerHTML = valorPago - valorTotalCompra
    if (payment != 'dinheiro') {
        labelTroco.style.display = "none"
    }
    
    


}