import React, { createContext, useContext, useState } from 'react'

const ToastCtx = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])
  function showToast(message, type='info'){
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(()=> setToasts(prev => prev.filter(t=>t.id!==id)), 3000)
  }
  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      <div className="toasts">
        {toasts.map(t=>(
          <div key={t.id} className={`toast ${t.type}`}>{t.message}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast(){ return useContext(ToastCtx) }
