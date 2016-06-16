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

    $("#grade>tbody td").each(function(td){
        $(this).mouseup(function(event){
            event.preventDefault();
            showDetails(event, $(this));  
        });
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

function mudaCelula(celula, situacao){
	var classe;
	switch (situacao) {
		case "Aprovado":
			celula.css('background-color', '#70D086');
			break;
		case "Reprovado":
			celula.css('background-color', '#BF5E67');
			break;
		case "Matricula":
			celula.css('background-color', '#4F56B3');
			break;
		case "Equivale":
			celula.css('background-color', '#DBEA59');
			break;
		default:
			celula.css('background-color', 'white');
			break;
	}
}

function montaGrade(grrAluno){
	//reseta a grade
	$("#grade>tbody td").each(function(td){
        $(this).css('background', "white");
        $(this).attr('id', $(this).html());
    });

	materias = findMaterias(grrAluno);
	if (!materias.length) {
		alert('Aluno não encontrado!');
	}
	var optativa = 0;
	for(var i = 0; i < materias.length; i++){
        var codMateria = materias[i].codMateria;
        var situacao = materias[i].situacao;
        var nomeMateria = materias[i].materia;
        //cada celula da tabela possui como id o codigo da disciplina
		var celula = $("#" + codMateria);
        //Se é um trabalho de graduação
        if (nomeMateria.indexOf("Trabalho") > -1){
        	//TG I ou II
        	if (nomeMateria.indexOf("II") > -1){
			    mudaCelula($("#TGII"), situacao);
			    $("TGII").attr('id', codMateria);
			} else {
			    mudaCelula($("#TGI"), situacao);
			    $("TGI").attr('id', codMateria);
			}
        } else if(materias[i].tipo == "Optativas"){
		    optativa++;
		    mudaCelula($("#OPT" + optativa), situacao);
		    $("#OPT" + optativa).attr('id', codMateria);
		} else if(celula.length) {
            mudaCelula(celula, situacao);
        }       
    }
}

function findHistoricoMateria(materias, cod){
    var tentativas = [];
    for(var i = 0; i < materias.length; i++){
        if(materias[i].codMateria == cod){
            tentativas.push(materias[i]);
        }
    }
    return tentativas;
}

function showDetails(event, td){
    var html = "";
    var historico = findHistoricoMateria(materias, td.attr("id"));
    if (historico.length == 0){
        html = ('Matéria não cursada ainda.');
    }
    if(event.button == 2) {
        for(var i = 0; i < historico.length; i++){
        	//acumula as materias
            html +='\
                <p>' + historico[i].materia + '</p>\
                <p>Nota: ' + historico.nota + '</p>\
                <p>Frequencia: ' + historico.frequencia + '</p>\
                <p>' + historico.ano + ' - ' + historico.periodo + '</p><br>\
            ';
        }
        $('.modal-header h2').html('Histórico');
        $('.modal-body').html(html);
        $('#modal').dialog({maxHeight: 400});
    }/* else {
        var grr = $("#grr").val()
        var aluno = findAluno(grr);
        var disc = findDiscForAluno(aluno, td.attr('id'));
        for(var i = 0; i < disc.length; i++){
            $("#popup").html('\
                <p>' + historico.nomeDisc + '</p>\
                <p>' + historico.ano + ' - ' + historico.periodo + '</p><br>\
                <p>Nota: ' + historico.nota + '</p>\
                <p>Frequencia: ' + historico.frequencia + '</p>\
            ');
        }
        if(disc.length == 0){
            $("#popup").html('Nunca cursado!');
        }
        $('#popup').dialog({maxHeight: 350});
    }*/
}

var materias = [];
var alunosParsed =  [];
$(function(){
	main();
});


