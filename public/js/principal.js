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

    var	conteudo	=	campoConteudo.val().trim()
                                           .replace(/\n/g,	"<br>");

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

function	decideTipoCartao(conteudo){
    var	quebras	=	conteudo.split("<br>").length;
    var	totalDeLetras	=	conteudo.replace(/<br>/g,	"	").length;
    var	ultimoMaior	=	"";
    conteudo.replace(/<br>/g,	"	")
        .split("	")
        .forEach(function(palavra){
            if	(palavra.length	>	ultimoMaior.length)	{
                ultimoMaior	=	palavra;
            }
        });

    var	tamMaior	=	ultimoMaior.length;

    //no mínimo,todoCartão	tem	o texto	pequeno
    var	tipoCartao	=	"cartao--textoPequeno";

    if	(tamMaior	<	9	&&	quebras	<	5	&&	totalDeLetras	<	55)	{
        tipoCartao	=	"cartao--textoGrande";
    }	else	if	(tamMaior	<	12	&&	quebras	<	6	&&	totalDeLetras	<	75)	{
        tipoCartao	=	"cartao--textoMedio";
    }
    return	tipoCartao;
}
