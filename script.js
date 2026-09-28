const formulario = document.querySelector("form");
const cpf = document.querySelector("#cpf");

// Formatação automática do CPF
cpf.addEventListener("input", function () {

    let valor = cpf.value.replace(/\D/g, "");
    valor = valor.substring(0, 11);

    if (valor.length > 9) {
        valor = valor.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{1,2})$/,
            "$1.$2.$3-$4"
        );
    } else if (valor.length > 6) {
        valor = valor.replace(
            /^(\d{3})(\d{3})(\d{1,3})$/,
            "$1.$2.$3"
        );
    } else if (valor.length > 3) {
        valor = valor.replace(
            /^(\d{3})(\d{1,3})$/,
            "$1.$2"
        );
    }

    cpf.value = valor;
});


// Criptografar a senha
async function criptografarSenha(senha) {

    const dados = new TextEncoder().encode(senha);

    const hash = await crypto.subtle.digest("SHA-256", dados);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


// Realizar cadastro
formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const endereco = document.querySelector("#endereco").value;
    const cpfValor = document.querySelector("#cpf").value;

    // Criptografa a senha
    const senhaCriptografada = await criptografarSenha(senha);

    const informacoes =
        "CADASTRO\n" +
        "============================\n" +
        "Nome: " + nome + "\n" +
        "E-mail: " + email + "\n" +
        "Senha : " + senhaCriptografada + "\n" +
        "Endereço: " + endereco + "\n" +
        "CPF: " + cpfValor + "\n" +
        "============================";

    const arquivo = new Blob([informacoes], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivo);
    link.download = "cadastro.txt";

    link.click();

    URL.revokeObjectURL(link.href);

    alert("Cadastro realizado com sucesso!");
});