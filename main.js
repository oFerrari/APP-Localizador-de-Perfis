import '@picocss/pico'
import './style.css'

const formConsultarUsuario = document.querySelector('.consultarUsuario')
const inputUsuario = formConsultarUsuario.usuario
const informacoes = document.querySelector('.informacoes');
const btnConsultarUsuario = document.querySelector('.btnConsultarUsuario')

formConsultarUsuario.addEventListener('submit', function (event) {
  event.preventDefault();
  btnConsultarUsuario.setAttribute('aria-busy', 'true')
  consultarUsuario(inputUsuario.value)
  ativaLoader(true)
})

async function consultarUsuario(usuario) {
  let response = await fetch(`https://api.github.com/users/${usuario}`)
  let dadosUsuario = await response.json();

  if (dadosUsuario.name === 'undefined') {
    informacoes.innerHTML = `<div class="erro">Usuario não encontrado!</div>`
  } else {
    informacoes.innerHTML = `
      <p>Foto: <img src="${dadosUsuario.avatar_url}"></p>
        <p>Nome: ${dadosUsuario.name}</p>
        <a href="${dadosUsuario.html_url}">Perfil no GitHub</a>  
      `
  }
  ativaLoader(false)
}

function ativaLoader(ativo){
  if(ativo){
      btnConsultarUsuario.setAttribute('aria-busy', 'true');
      btnConsultarUsuario.textContent = 'Localizando Perfil, Aguarde...'
  }else{
      btnConsultarUsuario.removeAttribute('aria-busy');
      btnConsultarUsuario.textContent = 'Consultar'
  }

 /*  ativaLoader(false) */
  
}