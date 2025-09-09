import { App, root } from 'noctes.jsx'
import './style.css'
import AppRoot from './App.jsx'

new App(
  root(AppRoot, "#app")
).render()
