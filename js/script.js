if (document.getElementById('myform') != null) {
  document.getElementById('myform').addEventListener('submit', salvarBloco);
}

function salvarBloco(e) {

  var nomeBloco = document.getElementById('nomeBloco').value;
  var redeSocial = document.getElementById('redeSocial').value;
  var corBloco = document.getElementById('corBloco').value;
  var numeroIntegrantes = document.getElementById('numeroIntegrantes').value;

  if (!validarFormulario(nomeBloco, redeSocial, corBloco, numeroIntegrantes)) {
    return false;
  }

  var bloco = {
    nomeBloco: nomeBloco,
    redeSocial: redeSocial,
    corBloco: corBloco,
    numeroIntegrantes: numeroIntegrantes
  }

  if (localStorage.getItem('blocos') === null) {

    var blocos = [];
    blocos.push(bloco);
    localStorage.setItem('blocos', JSON.stringify(blocos));

  } else {

    var blocos = JSON.parse(localStorage.getItem('blocos'));
    blocos.push(bloco);
    localStorage.setItem('blocos', JSON.stringify(blocos));
  }

  document.getElementById('myform').reset();

  buscarBlocos();

  e.preventDefault();
}



function deletarBloco(nomeBloco) {

  var blocos = JSON.parse(localStorage.getItem('blocos'));

  for (var i = 0; i < blocos.length; i++) {
    if (blocos[i].nomeBloco == nomeBloco) {
      blocos.splice(i, 1);
    }
  }

  localStorage.setItem('blocos', JSON.stringify(blocos));

  buscarBlocos();
}

function buscarBlocos() {

  var blocos = JSON.parse(localStorage.getItem('blocos'));
  var blocosResults = document.getElementById('blocosResults');


  if (blocosResults != null) {
    blocosResults.innerHTML = '';
    for (var i = 0; i < blocos.length; i++) {
      var nomeBloco = blocos[i].nomeBloco;
      var redeSocial = blocos[i].redeSocial;
      var corBloco = blocos[i].corBloco;
      var numeroIntegrantes = blocos[i].numeroIntegrantes;

      // style="background-color:' + converterCor(corBloco) + ';

      blocosResults.innerHTML += '<div class="well text-danger">' +
        '<h3>&#127917' + nomeBloco + '  &#x1F465; ' + numeroIntegrantes +
        ' 🎨 <span style="background:' + converterCor(corBloco) + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
        ' 💻 <a class="btn btn-danger" target="_blank" href="' + addhttp(redeSocial) + '">Rede Social</a> ' +
        ' &#10060; <a onclick="deletarBloco(\'' + nomeBloco + '\')" class="btn btn-danger" href="#">Deletar</a> ' +
        '</h3>' +
        '</div>';
    }
  }
}


function validarFormulario(nomeBloco, redeSocial, corBloco, numeroIntegrantes) {

  if (!nomeBloco || !redeSocial || !corBloco || !numeroIntegrantes) {
    alert('Favor preencher os campos obrigatórios do formulário');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!redeSocial.match(regex)) {
    alert('Por favor digite uma URL válida');
    return false;
  }

  return true;
}

function addhttp(redeSocial) {
  if (!/^(?:f|ht)tps?\:\/\//.test(redeSocial)) {
    redeSocial = "http://" + redeSocial;
  }
  return redeSocial;
}

function converterCor(cor) {

  switch (cor) {
    case 'Laranja':
      return 'orange';
    case 'Azul':
      return 'blue';
    case 'Verde':
      return 'green'
    case 'Rosa':
      return 'pink';
    case 'Amarelo':
      return 'yellow';
    case 'Vermelho':
      return 'red';
    case 'laranja':
      return 'orange';
    default:
      'white';
  }
}
