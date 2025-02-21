import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './router/Router.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { TaskProvider } from './contexts/TaskContext.jsx'
import "./App.css"
import AuthProvider from './contexts/AuthContext.jsx'
// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <RouterProvider router={Router}/>
      </TaskProvider>
    </QueryClientProvider>
  </AuthProvider>
)
