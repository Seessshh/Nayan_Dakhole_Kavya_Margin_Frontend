import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'

export default function Invoices(){
  const [invoices, setInvoices] = useState([])
  const [customerId, setCustomerId] = useState('')
  const [amount, setAmount] = useState(0)
  const [customers, setCustomers] = useState([])

  useEffect(()=>{ fetchAll() },[])
  function fetchAll(){
    axios.get('http://localhost:4000/api/invoices').then(r=>setInvoices(r.data)).catch(console.error)
    axios.get('http://localhost:4000/api/customers').then(r=>setCustomers(r.data)).catch(()=>{})
  }

  async function add(e){
    e.preventDefault()
    const payload = { customerId, amount: Number(amount) }
    const res = await axios.post('http://localhost:4000/api/invoices', payload)
    setInvoices(prev => [res.data, ...prev])
    setCustomerId(''); setAmount(0)
  }

  const [q, setQ] = useState('')
  const filtered = invoices.filter(i=> (`${i._id} ${i.status} ${i.amount}`).toLowerCase().includes(q.toLowerCase()))
  const columns = [
    { key:'_id', label:'ID' },
    { key:'amount', label:'Amount' },
    { key:'status', label:'Status' },
    { key:'issuedAt', label:'Issued', render:v=> v ? new Date(v).toLocaleDateString() : '' }
  ]

  return (
    <div className="content">
      <h1 className="page-title">Invoices</h1>
      <form onSubmit={add} className="toolbar">
        <select value={customerId} onChange={e=>setCustomerId(e.target.value)} required>
          <option value="">Choose customer</option>
          {customers.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input placeholder="Amount" type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button type="submit">Create Invoice</button>
      </form>
      <SearchBar value={q} onChange={setQ} placeholder="Search invoices..." />
      <Table columns={columns} data={filtered} initialSort={{ key:'issuedAt', dir:'desc' }} />
    </div>
  )
}
