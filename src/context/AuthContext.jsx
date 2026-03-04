import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(()=>{
    const saved = localStorage.getItem('km_auth')
    if(saved){
      try{
        const { user, token } = JSON.parse(saved)
        setUser(user || null); setToken(token || null)
      }catch{}
    }
    setInitializing(false)
  },[])

  function login(username, password){
    if(!username || !password) throw new Error('Enter credentials')
    const fakeToken = 'km_' + Math.random().toString(36).slice(2)
    const u = { name: username, email: `${username}@example.com` }
    setUser(u); setToken(fakeToken)
    localStorage.setItem('km_auth', JSON.stringify({ user: u, token: fakeToken }))
  }

  function logout(){
    setUser(null); setToken(null)
    localStorage.removeItem('km_auth')
  }

  const value = useMemo(()=>({
    user, token, initializing,
    isAuthenticated: !!token,
    login, logout
  }),[user, token, initializing])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){ return useContext(AuthContext) }
