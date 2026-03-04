import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e){
    e.preventDefault()
    try{
      login(username.trim(), password.trim())
      navigate('/', { replace: true })
    }catch(err){
      setError(String(err?.message || err || 'Login failed'))
    }
  }

  return (
    <div style={{display:'grid',placeItems:'center',minHeight:'100vh'}}>
      <div className="card" style={{width:360}}>
        <h2 style={{marginTop:0}}>Welcome</h2>
        <p className="desc">Sign in to continue</p>
        <form onSubmit={onSubmit} style={{display:'grid',gap:10}}>
          <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error ? <div style={{color:'var(--danger)'}}>{error}</div> : null}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}
