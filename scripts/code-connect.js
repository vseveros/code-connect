const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", (evento) => { // Adicionado o parâmetro evento
    evento.preventDefault(); // Previne o comportamento padrão do link
    inputUpload.click();  
});

/** Ler conteúdo do arquivo */
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name }); // Corrigido o erro de digitação
        };
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        };
        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo", erro); // Adicionado o erro ao log
        }
    }
});


const inputTags = document.getElementById("input-tags");
const inserirTags = document.querySelector(".lista-tags");

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
            const tagExiste = await verificaTags(tagTexto);
            if (tagExiste) {
            const tagNova = document.createElement("li");
            tagNova.innerHTML= `<p>${tagTexto}</p> <span class="material-icons remove-tag">close</span>`;
            inserirTags.appendChild(tagNova);
            inputTags.value = "";
            } else {
                alert("Tag não foi encontrada");
            } 
        }catch(error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag")
            }
        }
    }
})

const listaTags = document.querySelector(".lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
});

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-Stack", "HTML", "CSS", "JavaScript"];

async function verificaTags(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}
