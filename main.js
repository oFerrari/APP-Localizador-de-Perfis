import '@picocss/pico'
import './style.css'

const formConsultarUsuario = document.querySelector('#consultarUsuario')
const inputUsuario = formConsultarUsuario.usuario
const informacoes = document.querySelector('#informacoes');
const btnConsultarUsuario = document.querySelector('#btnConsultarUsuario')

formConsultarUsuario.addEventListener('submit', function (event) {
  event.preventDefault();
  btnConsultarUsuario.setAttribute('aria-busy', 'true')
  consultarUsuario(inputUsuario.value)
  ativaLoader(true)
})

async function consultarUsuario(usuario) {
  let response = await fetch(`https://api.github.com/users/${usuario}/json/`)
  let dadosUsuario = await response.json();

  if (dadosUsuario.erro) {
    informacoes.innerHTML = `<div class="erro">Usuario não encontrado!</div>`
  } else {
    informacoes.innerHTML = `
      <p>Foto: ${dadosUsuario.avatar_url}</p>
        <p>Nome ${dadosUsuario.login}</p>
        <p>Localidade ${dadosUsuario.url}</p>
      `

  }
  ativaLoader(false)
}