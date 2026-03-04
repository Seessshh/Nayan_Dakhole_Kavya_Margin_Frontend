import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'
import { useLocation } from 'react-router-dom'

export default function Subscriptions(){
  const [subs, setSubs] = useState([])
  const [customerId, setCustomerId] = useState('')
  const [productId, setProductId] = useState('')
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])

  useEffect(()=>{ fetchAll() },[])
  function fetchAll(){
    axios.get('http://localhost:4000/api/subscriptions').then(r=>setSubs(r.data)).catch(console.error)
    axios.get('http://localhost:4000/api/customers').then(r=>setCustomers(r.data)).catch(()=>{})
    axios.get('http://localhost:4000/api/products').then(r=>setProducts(r.data)).catch(()=>{})
  }

  async function add(e){
    e.preventDefault()
    const payload = { customerId, productId, status: 'active' }
    const res = await axios.post('http://localhost:4000/api/subscriptions', payload)
    setSubs(prev => [res.data, ...prev])
    setCustomerId(''); setProductId('')
  }

  const [q, setQ] = useState('')
  const location = useLocation()
  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const qp = params.get('q')
    if(qp!=null) setQ(qp)
  },[location.search])
  const filtered = subs.filter(s=> (`${s._id} ${s.status}`).toLowerCase().includes(q.toLowerCase()))
  const columns = [
    { key:'_id', label:'ID' },
    { key:'status', label:'Status' },
    { key:'startDate', label:'Start', render:v=> v ? new Date(v).toLocaleDateString() : '' },
    { key:'endDate', label:'End', render:v=> v ? new Date(v).toLocaleDateString() : '' }
  ]

  return (
    <div className="content">
      <h1 className="page-title">Subscriptions</h1>
      <form onSubmit={add} className="toolbar">
        <select value={customerId} onChange={e=>setCustomerId(e.target.value)} required>
          <option value="">Choose customer</option>
          {customers.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select value={productId} onChange={e=>setProductId(e.target.value)} required>
          <option value="">Choose product</option>
          {products.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <button type="submit">Create</button>
      </form>
      <SearchBar value={q} onChange={setQ} placeholder="Search subscriptions..." />
      <Table columns={columns} data={filtered} initialSort={{ key:'startDate', dir:'desc' }} />
    </div>
  )
}
