import React from 'react'
import ReactDOM from 'react-dom/client'
import UIModule from './UIModule';
import './index.css'

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UIModule />
    </ThemeProvider>
  </React.StrictMode>,
)
