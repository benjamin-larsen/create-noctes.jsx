import HelloWorld from './components/HelloWorld.jsx'
import JavascriptLogo from './assets/javascript.svg'

export default {
  render() {
    return (
      <>
        <div>
          <a href='https://vite.dev' target='_blank'>
            <img src='/vite.svg' class='logo' alt='Vite logo' />
          </a>
          <a href='https://github.com/benjamin-larsen/Noctes.jsx' target='_blank'>
            <img src={JavascriptLogo} class='logo vanilla' alt='JavaScript logo' />
          </a>
        </div>
        <HelloWorld msg='Vite + Noctes.jsx' />
      </>
    )
  }
}