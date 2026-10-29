import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Musica.css'
import { MusicaPage } from './Musica.tsx'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFound.tsx'
import { MusicaListPage } from './pages/MusicaListPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='page-content'>


        <Routes>
          <Route path='/' element={<MusicaListPage />} />
          <Route path='/musicas' element={<MusicaPage />} />
          <Route path='/app' element={<App />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
