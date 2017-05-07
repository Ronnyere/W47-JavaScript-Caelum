var botao = document.querySelector('#mudaLayout');
var mural = document.querySelector('.mural');

botao.addEventListener('click', function(){

    mural.classList.toggle('mural--linhas');

});

botao.addEventListener('click', function(){

    if (mural.classList.contains('mural--linhas')) {
        botao.textContent = 'Blocos';

    }else{

        botao.textContent = 'Linhas';
    }

});

function	removeCartao(){
    var	cartao	=	document.querySelector("#cartao_"	+	this.dataset.ref);

    //dá uma classe	que	faz	ele	sumir devagar
    cartao.classList.add("cartao--some");

    //tira da página depois	da animação
    setTimeout(function(){
        cartao.remove();
    },400);
}

//pega	os	botões
var	botoes	=	document.querySelectorAll(".opcoesDoCartao-remove");
for	(var	i	=	0;	i	<	botoes.length;	i++)	{

    //adiciona o evento	em cada	botão
    botoes[i].addEventListener("click",	removeCartao);
};

//criando o contador
var	contador	=	$(".cartao").length;

$(".novoCartao").submit(function(event){

    //impede que a página recarregue
    event.preventDefault();

    //pega o que o usuário digitou
    var	campoConteudo	=	$(".novoCartao-conteudo");

    var	conteudo	=	campoConteudo.val().trim();

    //cria os elementos do cartão e	adiciona no	DOM
    if	(conteudo){

        //soma um no contador
        contador++;

        //cria o botão	de remover
        var	botaoRemove	=	$("<button>").addClass("opcoesDoCartao-remove")
            .text("Remover")
            .click(removeCartao);

        //cria a div de	opcoes
        var	opcoes	=	$("<div>").addClass("opcoesDoCartao")
            .append(botaoRemove);

        var	conteudoTag	=	$("<p>").addClass("cartao-conteudo")
            .append(conteudo);

        //acrescenta o append para colocar a div opcoes	no cartão
        $("<div>").addClass("cartao")
            .append(opcoes)
            .append(conteudoTag)
            .prependTo(".mural");
    }
    //apaga	o conteúdo do textarea
    campoConteudo.val("");
});
