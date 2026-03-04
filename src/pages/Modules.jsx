import React, { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'

const MODULES = [
  { slug:'organization', title:'Organization Setup', items:['Company onboarding wizard','Billing model configuration (Fixed, T&M, Retainer)','Currency settings','Department mapping'], action:'Open Wizard' },
  { slug:'employee-cost-engine', title:'Employee Cost Engine', items:['CTC breakdown management','Infra & overhead cost inclusion','Automated hourly cost calculation','Effective billable cost generation'], action:'Configure' },
  { slug:'billing-calculator-engine', title:'Billing Calculator Engine', items:['Billing rate configuration','Margin % live calculation','Scenario simulation engine','Currency conversion support'], action:'Open Calculator' },
  { slug:'real-time-margin-tracker', title:'Real-Time Margin Tracker', items:['Timesheet integration','Budget consumption tracking','Burn rate analysis','Profitability visualization dashboard'], action:'Open Dashboard' },
  { slug:'ai-margin-prediction-engine', title:'AI Margin Prediction Engine', items:['Project completion margin prediction','Over-budget risk detection','Revenue deviation analysis','Utilization-based forecasting'], action:'Run Prediction' },
  { slug:'resource-allocation-optimizer', title:'Resource Allocation Optimizer', items:['Skill mapping','Availability tracking','AI-based allocation suggestions','Utilization percentage monitoring'], action:'Optimize' },
  { slug:'bench-management-system', title:'Bench Management System', items:['Idle resource tracking','Bench cost burn analysis','Internal reallocation recommendations'], action:'Manage Bench' },
  { slug:'contract-analyzer', title:'Contract Analyzer', items:['PDF upload & OCR processing','Billing term extraction','Penalty & SLA detection','Payment clause analysis'], action:'Upload Contract' },
  { slug:'automated-invoicing-system', title:'Automated Invoicing System', items:['Auto invoice generation','GST/VAT support','Recurring invoice scheduler','Payment reminder automation'], action:'Configure Invoices' },
  { slug:'revenue-forecasting-dashboard', title:'Revenue Forecasting Dashboard', items:['MRR tracking','6-month revenue forecast','Worst-case vs best-case analysis','Margin trend visualization'], action:'View Forecasts' }
]

export default function Modules(){
  const [q, setQ] = useState('')
  const list = useMemo(()=>{
    const s = q.toLowerCase()
    return MODULES.filter(m=> (m.title+' '+m.items.join(' ')).toLowerCase().includes(s))
  },[q])

  return (
    <div className="content">
      <h1 className="page-title">Core Modules</h1>
      <SearchBar value={q} onChange={setQ} placeholder="Search modules..." />
      <div className="grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {list.map((m,i)=>(
          <div key={i} className="card">
            <div style={{fontWeight:700, marginBottom:8}}>{m.title}</div>
            <ul style={{paddingLeft:18, margin:0}}>
              {m.items.map((it,idx)=> <li key={idx} className="desc">{it}</li>)}
            </ul>
            <div style={{marginTop:12}}>
              <a href={`/modules/${m.slug}`}><button>{m.action}</button></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
