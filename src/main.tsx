import React from 'react'
import { createRoot } from 'react-dom/client'
import ColorGameRoyale from '../app/ColorGameRoyale'
import './styles.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <ColorGameRoyale />
  </React.StrictMode>
)
