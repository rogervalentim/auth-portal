import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './app'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/auth-context'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <Toaster richColors />
    <App />
    </AuthProvider>
    </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>,
)
