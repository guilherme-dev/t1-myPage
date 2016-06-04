"use strict";

function Aluno(XMLdata){
	this.grr = XMLdata.getElementsByTagName("MATR_ALUNO")[0].firstChild.nodeValue;
    this.nome  = XMLdata.getElementsByTagName("NOME_ALUNO")[0].firstChild.nodeValue;
    this.materia   = XMLdata.getElementsByTagName("NOME_ATIV_CURRIC")[0].firstChild.nodeValue;
    this.codMateria    = XMLdata.getElementsByTagName("COD_ATIV_CURRIC")[0].firstChild.nodeValue;
    if((XMLdata.getElementsByTagName("FREQUENCIA")[0].firstChild != null) && (XMLdata.getElementsByTagName("SIGLA")[0].firstChild != null)) {
	    this.ano        = XMLdata.getElementsByTagName("ANO")[0].firstChild.nodeValue;
	    this.periodo    = XMLdata.getElementsByTagName("PERIODO")[0].firstChild.nodeValue;
	    this.nota       = XMLdata.getElementsByTagName("MEDIA_FINAL")[0].firstChild.nodeValue;
	    this.frequencia = XMLdata.getElementsByTagName("FREQUENCIA")[0].firstChild.nodeValue;
	    this.situacao   = XMLdata.getElementsByTagName("SIGLA")[0].firstChild.nodeValue;
	    this.tipo	   = XMLdata.getElementsByTagName("DESCR_ESTRUTURA")[0].firstChild.nodeValue;
    }
}


function XMLparser(xml){
	var XMLalunos = xml.getElementsByTagName("ALUNO");
	for (var i = 0; i < alunos.length; i++) {
		var aluno = new Aluno(XMLalunos);
		alunosParsed.push(aluno);
	}
	return alunosParsed;
}

var alunosParsed =  [];

$(function(){
	function main() {
	    $.get("alunos.xml", function(data){
	        alunosParsed = XMLparser(data);
	        a = new Aluno(alunosParsed);
	    });

	    $('#buscar').click(function(){

	    });
	}

	main();

});


