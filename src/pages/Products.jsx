import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'
import { useLocation } from 'react-router-dom'

export default function Products(){
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(()=>{ fetchProducts() },[])
  function fetchProducts(){
    axios.get('http://localhost:4000/api/products').then(r=>setProducts(r.data)).catch(console.error)
  }

  async function add(e){
    e.preventDefault()
    const p = { name, price: Number(price) }
    const res = await axios.post('http://localhost:4000/api/products', p)
    setProducts(prev => [res.data, ...prev])
    setName(''); setPrice(0)
  }

  const [q, setQ] = useState('')
  const location = useLocation()
  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const qp = params.get('q')
    if(qp!=null) setQ(qp)
  },[location.search])
  const filtered = products.filter(p=> (`${p.name} ${p.price}`).toLowerCase().includes(q.toLowerCase()))
  const columns = [
    { key:'name', label:'Name' },
    { key:'price', label:'Price' },
    { key:'createdAt', label:'Created', render:v=> v ? new Date(v).toLocaleDateString() : '' }
  ]

  return (
    <div className="content">
      <h1 className="page-title">Products</h1>
      <form onSubmit={add} className="toolbar">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <SearchBar value={q} onChange={setQ} placeholder="Search products..." />
      <Table columns={columns} data={filtered} initialSort={{ key:'name', dir:'asc' }} />
    </div>
  )
}
