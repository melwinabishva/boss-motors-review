import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/DataContext.jsx'
import "react-toastify/dist/ReactToastify.css";
import { NotificationProvider } from "./context/NotificationProvider";
import { ViewModeProvider } from './context/ViewModeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <DataProvider>
        <ViewModeProvider>
          <App />
        </ViewModeProvider>

      </DataProvider>
    </NotificationProvider>
  </StrictMode>,
)
