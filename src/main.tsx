import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './components/modal/context/ModalContext.tsx'
import Modal from './components/modal/Modal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <App />
      <Modal />
    </ModalProvider>
  </StrictMode>,
)
