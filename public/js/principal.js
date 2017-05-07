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

            contador++;

            var	botaoRemove	=	$("<button>").addClass("opcoesDoCartao-remove")
                .attr("data-ref",	contador)
                .text("Remover")
                .click(removeCartao);

            var	conteudoTag	=	$("<p>").addClass("cartao-conteudo")
                .append(conteudo);

            var	opcoes	=	$("<div>").addClass("opcoesDoCartao")
                .append(botaoRemove);

            //	**código novo** chamada	para nova função
            var	tipoCartao	=	decideTipoCartao(conteudo);

            //	**código novo**	adicionando	classe no novo cartão
            $("<div>").attr("id","cartao_"	+	contador)
                .addClass("cartao")
                .addClass(tipoCartao)
                .append(opcoes)
                .append(conteudoTag)
                .prependTo(".mural");
        }

        //apaga	o conteúdo do textarea
        campoConteudo.val("");
    });

    function decideTipoCartao(conteudo){

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

        //no mínimo,todoCartão tem o texto pequeno
        var	tipoCartao	=	"cartao--textoPequeno";

        if	(tamMaior	<	9	&&	quebras	<	5	&&	totalDeLetras	<	55)	{
            tipoCartao	=	"cartao--textoGrande";
        }	else	if	(tamMaior	<	12	&&	quebras	<	6	&&	totalDeLetras	<	75)	{
            tipoCartao	=	"cartao--textoMedio";
        }
        return	tipoCartao;
    }


    $("#busca").on("input",	function(){

        //guarda o valor digitado, removendo espaços extras.
        var	busca	=	$(this).val().trim();
        if(busca.length){
            $(".cartao").hide().filter(function(){
                return	$(this).find(".cartao-conteudo")
                               .text()
                               .match(new	RegExp(busca,	"i"));
            }).show();

        }else{

            $(".cartao").show();
         }

    });

    $("#ajuda").click(function(){
        $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
            function(res){
                console.log(res);
                res.instrucoes.forEach(function(instrucao){
                    adicionaCartao(instrucao.conteudo,	instrucao.cor);
                });
            }
        );
    });

    function adicionaCartao(conteudo, cor){

        contador++;

        var	botaoRemove	=	$("<button>").addClass("opcoesDoCartao-remove")
            .attr("data-ref",	contador)
            .text("Remover")
            .click(removeCartao);

        var	opcoes	=	$("<div>").addClass("opcoesDoCartao")
                                  .append(botaoRemove);

        var	tipoCartao	= decideTipoCartao(conteudo);

        var	conteudoTag	= $("<p>").addClass("cartao-conteudo")
                                  .append(conteudo);

        $("<div>").attr("id","cartao_"	+	contador)
            .addClass("cartao")
            .addClass(tipoCartao)
            .append(opcoes)
            .append(conteudoTag)
            .css("background-color",	cor)
            .prependTo(".mural");
    }

    // $("#sync").click(function(){
    //     var	cartoes	=	[];
    //     $(".cartao").each(function(){
    //         var	cartao=	{};
    //         cartao.conteudo	=	$(this).find(".cartao-conteudo").html();
    //         cartoes.push(cartao);
    //     });
    //
    //     //escolha seu nome de usuario aqui
    //     var	mural	=	{
    //         usuario:	"seu.email@exemplo.com.br"
    //         ,cartoes:	cartoes
    //     }
    //
    //     $.ajax({
    //         url:	"https://ceep.herokuapp.com/cartoes/salvar"
    //         ,method:	"POST"
    //         ,data:	mural
    //         ,success:	function(res){
    //             console.log(res.quantidade	+	"	cartões	salvos	em	"
    //                 +	res.usuario);
    //         }
    //         ,error:	function(){
    //             console.log("Não	foi	possível	salvar	o	mural");
    //         }
    //     });
    // });


    $("#sync").click(function(){

        $("#sync").removeClass("botaoSync--sincronizado");
        $("#sync").addClass("botaoSync--esperando");

        // //	código posterior comentado
        // $.ajax({
        //     url:	"https://ceep.herokuapp.com/cartoes/salvar"
        //     ,method:	"POST"
        //     ,data:	mural
        //     ,success:	function(res){
        //
        //         //	novidade aqui
        //         $("#sync").addClass("botaoSync--sincronizado");
        //         console.log(res.quantidade	+	"	cartões	salvos	em	"
        //             +	res.usuario);
        //     }
        //     ,error:	function(){
        //
        //         //	novidade aqui
        //         $("#sync").addClass("botaoSync--deuRuim");
        //         console.log("Não	foi	possível	salvar	o	mural");
        //     }
        //     ,complete:	function(){
        //         $("#sync").removeClass("botaoSync--esperando");
        //     }
        // });

        var	usuario	=	"seu.email@exemplo.com.br";

        $.getJSON(
            "https://ceep.herokuapp.com/cartoes/carregar?callback=?",
            {usuario:	usuario},
            function(res){
                var	cartoes	=	res.cartoes;
                console.log(cartoes.length	+	"	carregados	em	"	+	res.usuario);
                cartoes.forEach(function(cartao){
                    adicionaCartao(cartao.conteudo);
                });
            }
        );

    });


