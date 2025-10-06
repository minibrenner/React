import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const mountId = window.__GOVIDEOS_ROOT_ID || 'root'
const el = document.getElementById(mountId)
console.log('[GoVideos] mountId =', mountId, 'found?', !!el)

if (el) {
  createRoot(el).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  console.error('[GoVideos] Elemento de montagem não encontrado:', mountId)
}
