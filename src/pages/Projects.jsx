import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'
import { useLocation } from 'react-router-dom'

export default function Projects(){

  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [budget, setBudget] = useState(0)
  const [q, setQ] = useState('')
  const location = useLocation()

  useEffect(() => { fetchProjects() }, [])

  function fetchProjects(){
    axios
      .get('http://localhost:5000/api/projects')
      .then(r => setProjects(r.data))
      .catch(console.error)
  }

  async function add(e){
    e.preventDefault()
    const project = { name, budget: Number(budget) }

    const res = await axios.post(
      'http://localhost:5000/api/projects',
      project
    )

    setProjects(prev => [res.data, ...prev])
    setName('')
    setBudget(0)
  }

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const qp = params.get('q')
    if(qp != null) setQ(qp)
  },[location.search])

  const filtered = projects.filter(p =>
    (`${p.name} ${p.budget}`)
      .toLowerCase()
      .includes(q.toLowerCase())
  )

  const columns = [
    { key:'name', label:'Project Name' },
    { key:'budget', label:'Budget' },
    {
      key:'createdAt',
      label:'Created',
      render:v=> v ? new Date(v).toLocaleDateString() : ''
    }
  ]

  return (
    <div className="content">
      <h1 className="page-title">Projects</h1>

      <form onSubmit={add} className="toolbar">
        <input
          placeholder="Project Name"
          value={name}
          onChange={e=>setName(e.target.value)}
          required
        />
        <input
          placeholder="Budget"
          type="number"
          value={budget}
          onChange={e=>setBudget(e.target.value)}
        />
        <button type="submit">Add Project</button>
      </form>

      <SearchBar
        value={q}
        onChange={setQ}
        placeholder="Search projects..."
      />

      <Table
        columns={columns}
        data={filtered}
        initialSort={{ key:'name', dir:'asc' }}
      />
    </div>
  )
}