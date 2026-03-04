import React from 'react'

export default function Stepper({ steps, current, onPrev, onNext, onFinish }){
  return (
    <div className="card">
      <div style={{display:'grid',gridTemplateColumns:`repeat(${steps.length},1fr)`,gap:8,marginBottom:12}}>
        {steps.map((s,i)=>(
          <div key={i} style={{textAlign:'center'}}>
            <div style={{width:28,height:28,margin:'0 auto',borderRadius:'50%',display:'grid',placeItems:'center',background:i<=current?'linear-gradient(90deg,#22d3ee,#a78bfa)':'var(--surface)',color:i<=current?'#061318':'var(--muted)',fontWeight:700}}>{i+1}</div>
            <div className="desc">{s}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <button className="ghost" onClick={onPrev} disabled={current===0}>Back</button>
        {current===steps.length-1
          ? <button onClick={onFinish}>Finish</button>
          : <button onClick={onNext}>Next</button>}
      </div>
    </div>
  )
}
