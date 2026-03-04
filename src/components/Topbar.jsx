import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Topbar(){
  const { user, logout } = useAuth()
  const [theme, setTheme] = useState(()=> localStorage.getItem('km_theme') || 'dark')
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    document.documentElement.dataset.theme = theme
    localStorage.setItem('km_theme', theme)
  },[theme])

  return (
    <header className="topbar">
      <div className="topbar-left">Kavya Margin</div>
      <div className="topbar-right">
        <button className="ghost" onClick={()=> setTheme(theme==='dark' ? 'light' : 'dark')}>
          {theme==='dark' ? 'Light' : 'Dark'}
        </button>
        <div className="profile" onClick={()=> setOpen(v=>!v)}>
          <div className="avatar">{(user?.name || 'U').slice(0,1).toUpperCase()}</div>
          <div className="name">{user?.name || 'User'}</div>
          {open && (
            <div className="dropdown">
              <div className="item">Settings</div>
              <div className="item" onClick={logout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
