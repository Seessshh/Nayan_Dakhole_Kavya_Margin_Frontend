import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'

export default function Reports(){
  const [metrics, setMetrics] = useState(null)
  const [range, setRange] = useState('30d')

  useEffect(()=>{
    axios.get(`http://localhost:4000/api/metrics?range=${encodeURIComponent(range)}`)
      .then(r=> setMetrics(r.data))
      .catch(()=> setMetrics(null))
  },[range])

  const mrrSeries = (metrics?.mrrSeries) || [
    {day:'Week 1', mrr: 800}, {day:'Week 2', mrr: 900}, {day:'Week 3', mrr: 980}, {day:'Week 4', mrr: 1020}
  ]
  const revenueSeries = (metrics?.revenueSeries) || [{v:12},{v:18},{v:24},{v:32}]

  return (
    <div className="content">
      <h1 className="page-title">Reports</h1>
      <div className="toolbar">
        <select value={range} onChange={e=>setRange(e.target.value)}>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="card">
          <h3>MRR Trend</h3>
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrSeries}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="mrr" stroke="#22d3ee" fill="#22d3ee22" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3>Revenue Bars</h3>
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries}>
                <XAxis hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="v" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
