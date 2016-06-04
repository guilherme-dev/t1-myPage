"use strict";

function main(){
       $.ajax({
	        type: "GET" ,
	        url: "../alunos.xml" ,
	        dataType: "xml" ,
	        success: function(xml) {
	        	AlunosParser(xml);
        	}
   		});

    $('#buscar').click(function(e){
    	e.preventDefault();
    	montaGrade($('#grr-aluno').val());
    });
}

function Aluno(){
	this.grr = null;
    this.nome  = null;
    this.materia   = null;
    this.codMateria    = null;
    this.ano        = null;
    this.periodo    = null;
    this.nota       = null;
    this.frequencia = null;
    this.situacao   = null;
    this.tipo	   = null;
}

function AlunosParser(xml){
	var $xml  = $(xml);
	var $alunos = $xml.find('ALUNO');
	$alunos.each(function(){
		var aluno = new Aluno();
		aluno.grr = $(this).find('MATR_ALUNO').text();
		aluno.nome = $(this).find('NOME_ALUNO').text();
		aluno.materia = $(this).find('NOME_ATIV_CURRIC').text();
		aluno.codMateria = $(this).find('COD_ATIV_CURRIC').text();
		aluno.frequencia = $(this).find('FREQUENCIA').text();
		aluno.situacao = $(this).find('SIGLA').text();
		if (aluno.frequencia != null && aluno.situacao != null) {
			aluno.ano = $(this).find('ANO').text();
			aluno.periodo = $(this).find('PERIODO').text();
			aluno.nota = $(this).find('MEDIA_FINAL').text();
			aluno.tipo = $(this).find('DESCR_ESTRUTURA').text();
		}
		alunosParsed.push(aluno);
	});
}

function findMaterias(grr){
	var $alunos = $(alunosParsed);
	var aluno = [];
	$alunos.each(function(){
		if (this.grr == grr) {
			aluno.push(this);
		}
	});
	return aluno;
}

function montaGrade(grr-aluno){
	var materias = findMaterias(grr-aluno);
	
}


var alunosParsed =  [];
$(function(){
	main();
});


