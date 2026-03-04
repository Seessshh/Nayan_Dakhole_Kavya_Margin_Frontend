import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Products = React.lazy(()=>import('./pages/Products'))
const Customers = React.lazy(()=>import('./pages/Customers'))
const Subscriptions = React.lazy(()=>import('./pages/Subscriptions'))
const Invoices = React.lazy(()=>import('./pages/Invoices'))
const Events = React.lazy(()=>import('./pages/Events'))
const Reports = React.lazy(()=>import('./pages/Reports'))
const Modules = React.lazy(()=>import('./pages/Modules'))
const ModuleDetail = React.lazy(()=>import('./pages/ModuleDetail'))
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import Topbar from './components/Topbar'
import { ToastProvider } from './components/ToastProvider'

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  )
}

function AppShell(){
  const { isAuthenticated } = useAuth()
  return (
    <>
      {isAuthenticated ? <Sidebar /> : null}
      {isAuthenticated ? <Topbar /> : null}
      <ToastProvider>
        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
              <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/modules" element={<ProtectedRoute><Modules /></ProtectedRoute>} />
              <Route path="/modules/:slug" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </div>
      </ToastProvider>
    </>
  )
}
