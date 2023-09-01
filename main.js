//adiciona mascara ao telefone
function MascaraTelefone(tel){  
    var v = tel.value
    if(isNaN(v[v.length-1])){
        tel.value = v.substring(0, v.length-1)
        return
    }       
    
    tel.setAttribute("maxlength", "13")
    if(v.length == 8) tel.value += "-"
    if(v.length == 1) tel.value = "(" + tel.value
    if(v.length == 3) tel.value += ")"
}

function MascaraCelular(cel){  
    var v = cel.value
    if(isNaN(v[v.length-1])){
        cel.value = v.substring(0, v.length-1)
        return
    }       
    
    cel.setAttribute("maxlength", "14")
    if(v.length == 9) cel.value += "-"
    if(v.length == 1) cel.value = "(" + cel.value
    if(v.length == 3) cel.value += ")"
}

//adiciona mascara ao CPF
function MascaraCPF(cpf){
    var v = cpf.value
    if(isNaN(v[v.length-1])){
        cpf.value = v.substring(0, v.length-1)
        return
    }       
    
    cpf.setAttribute("maxlength", "14")
    if(v.length == 3 || v.length == 7) cpf.value += "."
    if(v.length == 11) cpf.value += "-"
}

function MascaraRG(rg){
    var v = rg.value  
    
    rg.setAttribute("maxlength", "12")
    if(v.length == 2 || v.length == 6) rg.value += "."
    if(v.length == 10) rg.value += "-"
}

function MascaraCEP(cep){
    var v = cep.value  
    
    cep.setAttribute("maxlength", "9")
    if(v.length == 5) cep.value += "-"
}

$("#cep").blur(function(){

    var cep = this.value.replace(/[^0-9]/, "");
    
    if(cep.length != 8){
        return false;
    }
    
    
    var url = "https://viacep.com.br/ws/"+cep+"/json/";
    
    
    $.getJSON(url, function(dadosRetorno){
        
            
            $("#endereco").val(dadosRetorno.logradouro);
            $("#bairro").val(dadosRetorno.bairro);
            $("#cidade").val(dadosRetorno.localidade);
            $("#estado").val(dadosRetorno.uf);

    });
});

function validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validarForm()
{
    var nome = document.getElementById('nome').value
    var endereco = document.getElementById('endereco').value
    var bairro = document.getElementById('bairro').value
    var cep = document.getElementById('cep').value.replace(/[^0-9]/, "")
    var cidade = document.getElementById('cidade').value
    var estado = document.getElementById('estado').value
    var telefone = document.getElementById('telefone').value
    var celular = document.getElementById('celular').value
    var rg = document.getElementById('rg').value.replace(/\.|\-/g, "")
    var cpf = document.getElementById('cpf').value.replace(/\.|\-/g, "")

    
    // A url de pesquisa consiste no endereço do webservice + o cep que
    // o usuário informou + o tipo de retorno desejado (entre "json",
    // "jsonp", "xml", "piped" ou "querty")
    var url = "https://viacep.com.br/ws/"+cep+"/json/";

    console.log(cpf)

    if(nome != "")
    {
        console.log('Nome Validado!')
    }else{
        console.log('Preencha o campo \'Nome\'')
    }

    if(telefone != "")
    {
        console.log('Telefone Validado!')
    }else{
        console.log('Preencha o campo \'Telefone\'')
    }

    if(celular != "")
    {
        console.log('Celular Validado!')
    }else{
        console.log('Preencha o campo \'Celular\'')
    }

    if(rg != "")
    {
        console.log('RG Validado!')
    }else{
        console.log('Preencha o campo \'RG\'')
    }

    if(cpf != "")
    {
        if(validarCPF(cpf)){
            console.log('CPF Validado!')
        }else{
            console.log('CPF inválido!')
        }
            
    }else{
        console.log('Preencha o campo \'CPF\'')
    }

    if(cep.length == 8)
    {
        $.getJSON(url, function(dadosRetorno){
            try{
                if(typeof dadosRetorno.complemento != "undefined"){
                    console.log('CEP Validado!')
                }else{
                    console.log('CEP não existe!')
                }
            }catch(ex){}
        });
    }else{
        console.log('Campo \'CEP\' está vázio ou é inválido, preencha para validar os campos de endereço!')
        return false
    }

    if(endereco != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(endereco == dadosRetorno.logradouro){
                console.log('Endereço Validado!')
            }else{
                console.log('Endereço não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Endereço\'')
    }

    if(bairro != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(bairro == dadosRetorno.bairro){
                console.log('Bairro Validado!')
            }else{
                console.log('Bairro não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Bairro\'')
    }

    if(cidade != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(cidade == dadosRetorno.localidade){
                console.log('Cidade Validada!')
            }else{
                console.log('Cidade não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Cidade\'')
    }

    if(estado != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(estado == dadosRetorno.uf){
                console.log('Estado Validado!')
            }else{
                console.log('Estado não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Estado\'')
    }
}