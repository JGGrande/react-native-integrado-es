import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MusicaPage } from './Musica.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MusicaPage />
  </StrictMode>,
)
