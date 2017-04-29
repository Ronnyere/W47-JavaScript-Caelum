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