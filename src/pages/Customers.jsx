import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'

export default function Customers(){
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(()=>{ fetchCustomers() },[])
  function fetchCustomers(){
    axios.get('http://localhost:4000/api/customers').then(r=>setCustomers(r.data)).catch(console.error)
  }

  async function add(e){
    e.preventDefault()
    const c = { name, email }
    const res = await axios.post('http://localhost:4000/api/customers', c)
    setCustomers(prev => [res.data, ...prev])
    setName(''); setEmail('')
  }

  const [q, setQ] = useState('')
  const filtered = customers.filter(c=> (`${c.name} ${c.email}`).toLowerCase().includes(q.toLowerCase()))
  const columns = [
    { key:'name', label:'Name' },
    { key:'email', label:'Email' },
    { key:'createdAt', label:'Joined', render:v=> v ? new Date(v).toLocaleDateString() : '' }
  ]

  return (
    <div className="content">
      <h1 className="page-title">Customers</h1>
      <form onSubmit={add} className="toolbar">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <SearchBar value={q} onChange={setQ} placeholder="Search customers..." />
      <Table columns={columns} data={filtered} initialSort={{ key:'name', dir:'asc' }} />
    </div>
  )
}
