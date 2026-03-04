import React, { useMemo } from 'react'

export default function Forecast({ series }){
  const forecast = useMemo(()=>{
    const data = Array.isArray(series) && series.length>=3 ? series.map(d=> Number(d.mrr || d.v || 0)) : [800,900,980,1020]
    const n = data.length
    if(n<2) return { next: data[n-1] || 0, growth: 0 }
    const last = data[n-1]; const prev = data[n-2]
    const growth = prev===0 ? 0 : (last - prev) / prev
    const next = Math.round(last * (1 + growth))
    return { next, growth }
  },[series])

  return (
    <div className="card">
      <h4>AI Revenue Forecast</h4>
      <div className="value">₹{forecast.next}</div>
      <div className="desc">{forecast.growth>=0 ? 'Projected growth' : 'Projected decline'}: {(forecast.growth*100).toFixed(1)}%</div>
    </div>
  )
}
