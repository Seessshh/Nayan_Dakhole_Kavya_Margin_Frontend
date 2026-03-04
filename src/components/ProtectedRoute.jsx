import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }){
  const { isAuthenticated, initializing } = useAuth()
  if(initializing) return <div style={{padding:20}}>Loading...</div>
  if(!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
