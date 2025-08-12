import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ConfigProvider } from "antd";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#408634",
        borderRadius: 0,
        // aur tokens... (typography, spacing, etc.)
      },
    }}
  >
     <BrowserRouter>

    <App />

    </BrowserRouter>
     </ConfigProvider>
  </StrictMode>,
)
