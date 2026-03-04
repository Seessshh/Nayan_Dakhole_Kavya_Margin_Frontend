import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'
import Skeleton from '../components/Skeleton'

export default function Events(){
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(()=>{
    setLoading(true)
    axios.get('http://localhost:4000/api/events')
      .then(r=> setEvents(r.data||[]))
      .catch(()=> setEvents([]))
      .finally(()=> setLoading(false))
  },[])

  const filtered = events.filter(e=>{
    const t = `${e.type} ${e.entityType} ${e.entityId}`.toLowerCase()
    return t.includes(q.toLowerCase())
  })

  const columns = [
    { key: 'type', label: 'Type' },
    { key: 'entityType', label: 'Entity' },
    { key: 'entityId', label: 'Entity ID' },
    { key: 'timestamp', label: 'Time', render: v => new Date(v).toLocaleString() }
  ]

  return (
    <div className="content">
      <h1 className="page-title">Events</h1>
      <SearchBar value={q} onChange={setQ} placeholder="Filter by type/entity..." />
      {loading ? <Skeleton lines={6} /> : <Table columns={columns} data={filtered} initialSort={{ key:'timestamp', dir:'desc' }} />}
    </div>
  )
}
