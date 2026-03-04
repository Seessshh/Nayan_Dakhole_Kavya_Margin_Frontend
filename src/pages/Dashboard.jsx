import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'
import Forecast from '../components/Forecast'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [metrics, setMetrics] = useState(null)

  useEffect(()=>{
    axios.get('http://localhost:4000/api/metrics')
      .then(r=> setMetrics(r.data))
      .catch(console.error)
  },[])

  const stats = metrics ? metrics.stats : {}
  const [range, setRange] = useState('30d')
  const revenueSplit = metrics?.revenueSplit || [{name:'Products', value:40},{name:'Services', value:35},{name:'Retainer', value:25}]
  const riskSplit = metrics?.riskSplit || [{name:'Low', value:60},{name:'Medium', value:30},{name:'High', value:10}]
  const COLORS = ['#22d3ee','#a78bfa','#f59e0b','#22c55e','#ef4444']
  const navigate = useNavigate()

  function onRevenueSliceClick(name){
    if(name==='Products'){ navigate('/products?q=') }
    else if(name==='Services'){ navigate('/subscriptions?q=service') }
    else if(name==='Retainer'){ navigate('/subscriptions?q=retainer') }
  }

  function downloadCsv(rows, filename){
    const headers = Object.keys(rows[0]||{name:'',value:''})
    const csv = [headers.join(','), ...rows.map(r=> headers.map(h=> r[h]).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="content">
      <h1 className="page-title">Dashboard</h1>
      <div className="toolbar">
        <select value={range} onChange={e=>setRange(e.target.value)}>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>
      <div className="grid cols-2">
        <div>
          <div className="card">
            <h3>Activations vs Net Cancellations</h3>
            <div style={{height:260}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{name:'A', activations:30, cancellations:12},{name:'B', activations:12, cancellations:20}]}> 
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="activations" stroke="#01a3d1" />
                  <Line type="monotone" dataKey="cancellations" stroke="#f29e76" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stats-grid" style={{marginTop:12}}>
            <div className="stat">
              <div>Signups</div>
              <div className="value">{stats ? stats.signups : '-'}</div>
            </div>
            <div className="stat">
              <div>Activations</div>
              <div className="value">{stats ? stats.activeSubs : '-'}</div>
            </div>
            <div className="stat">
              <div>Active Customers</div>
              <div className="value">{stats ? stats.customersCount : '-'}</div>
            </div>
          </div>

          <div className="grid" style={{gridTemplateColumns:'1fr 1fr', marginTop:12}}>
            <div className="card">
              <h3>Revenue Split</h3>
              <div className="toolbar">
                <button className="ghost" onClick={()=>downloadCsv(revenueSplit,'revenue-split.csv')}>Export CSV</button>
              </div>
              <div style={{height:240}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueSplit} dataKey="value" nameKey="name" outerRadius={90}>
                      {revenueSplit.map((e,i)=> <Cell key={i} fill={COLORS[i%COLORS.length]} onClick={()=>onRevenueSliceClick(e.name)} />)}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <h3>Risk Distribution</h3>
              <div className="toolbar">
                <button className="ghost" onClick={()=>downloadCsv(riskSplit,'risk-distribution.csv')}>Export CSV</button>
              </div>
              <div style={{height:240}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={riskSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                      {riskSplit.map((e,i)=> <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{marginBottom:12}}>
            <h4>Pending Invoices</h4>
            <div className="value">4</div>
          </div>
          <div className="card" style={{marginBottom:12}}>
            <h4>Net Revenue</h4>
            <div className="value">{stats ? `₹${stats.totalMRR}` : '-'}</div>
            <div style={{height:60}}>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={[{v:10},{v:30},{v:20}]}> <Bar dataKey="v" fill="#7ed321" /></BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="stats-grid" style={{marginBottom:12}}>
            <div className="stat">
              <div>Gross Margin</div>
              <div className="value">{stats && stats.grossMargin!=null ? `${stats.grossMargin}%` : '32%'}</div>
            </div>
            <div className="stat">
              <div>Utilization</div>
              <div className="value">{stats && stats.utilization!=null ? `${stats.utilization}%` : '76%'}</div>
            </div>
            <div className="stat">
              <div>Bench Cost</div>
              <div className="value">{stats && stats.benchCost!=null ? `₹${stats.benchCost}` : '₹24,000'}</div>
            </div>
          </div>
          <Forecast series={(metrics?.mrrSeries) || [{mrr:800},{mrr:900},{mrr:980},{mrr:1020}]} />
        </div>
      </div>
    </div>
  )
}
