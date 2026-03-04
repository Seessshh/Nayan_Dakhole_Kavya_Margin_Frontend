import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'
import Stepper from '../components/Stepper'

const defs = {
  organization: {
    title: 'Organization Setup',
    sections: ['Company Info','Billing Models','Currency Settings','Departments'],
    render: () => <OrgWizard />
  },
  employee_cost: {
    title: 'Employee Cost Engine',
    render: () => (
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="card">
          <div style={{fontWeight:700,marginBottom:8}}>CTC Breakdown</div>
          <form style={{display:'grid',gap:8}}>
            <input placeholder="Base Salary" />
            <input placeholder="Allowances" />
            <input placeholder="Benefits" />
            <input placeholder="Infra & Overheads" />
          </form>
        </div>
        <div className="card">
          <div style={{fontWeight:700,marginBottom:8}}>Calculated Hourly Cost</div>
          <div className="value">₹820</div>
          <div className="desc">Effective billable cost generation based on inputs</div>
        </div>
      </div>
    )
  },
  billing_calc: {
    title: 'Billing Calculator Engine',
    render: () => <BillingCalc />
  },
  margin_tracker: {
    title: 'Real-Time Margin Tracker',
    render: () => (
      <div className="grid" style={{gridTemplateColumns:'2fr 1fr'}}>
        <div className="card">
          <h3>Budget vs Actual</h3>
          <div style={{height:240}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{m:'W1', b:100, a:60},{m:'W2', b:100, a:78},{m:'W3', b:100, a:85},{m:'W4', b:100, a:92}]}>
                <XAxis dataKey="m" /><YAxis /><Tooltip />
                <Area type="monotone" dataKey="b" stroke="#94a3b8" fill="#94a3b822" />
                <Area type="monotone" dataKey="a" stroke="#22d3ee" fill="#22d3ee22" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="value">Burn Rate: 92%</div>
          <div className="desc">Timesheet integration and profitability visualization</div>
        </div>
      </div>
    )
  },
  ai_prediction: {
    title: 'AI Margin Prediction Engine',
    render: () => (
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="card">
          <div style={{fontWeight:700,marginBottom:8}}>Inputs</div>
          <form style={{display:'grid',gap:8}}>
            <input placeholder="Projected Hours" />
            <input placeholder="Avg Billing Rate" />
            <input placeholder="Avg Cost Rate" />
            <select><option>Risk: Low</option><option>Risk: Medium</option><option>Risk: High</option></select>
          </form>
        </div>
        <div className="card">
          <div className="value">Completion Margin: 34%</div>
          <div className="desc">Over-budget risk: Medium • Revenue deviation: 6%</div>
        </div>
      </div>
    )
  },
  allocation: {
    title: 'Resource Allocation Optimizer',
    render: () => (
      <div className="card">
        <div style={{fontWeight:700,marginBottom:8}}>Suggestions</div>
        <Table
          columns={[{key:'name',label:'Resource'},{key:'skill',label:'Skill'},{key:'avail',label:'Availability%'},{key:'suggest',label:'Suggested Project'}]}
          data={[{name:'Amit',skill:'React',avail:40,suggest:'KM-Frontend'},{name:'Neha',skill:'Node',avail:30,suggest:'KM-API'}]}
          initialSort={{key:'avail',dir:'desc'}}
        />
      </div>
    )
  },
  bench: {
    title: 'Bench Management System',
    render: () => (
      <div className="card">
        <Table
          columns={[{key:'name',label:'Resource'},{key:'days',label:'Idle Days'},{key:'burn',label:'Bench Cost'}]}
          data={[{name:'Ravi',days:12,burn:'₹18,000'},{name:'Priya',days:8,burn:'₹12,400'}]}
          initialSort={{key:'days',dir:'desc'}}
        />
      </div>
    )
  },
  contract: {
    title: 'Contract Analyzer',
    render: () => <ContractAnalyzer />
  },
  invoicing: {
    title: 'Automated Invoicing System',
    render: () => (
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="card">
          <div style={{fontWeight:700,marginBottom:8}}>Recurring Scheduler</div>
          <form style={{display:'grid',gap:8}}>
            <select><option>Monthly</option><option>Quarterly</option><option>Yearly</option></select>
            <input placeholder="Day of month" type="number" />
            <select><option>GST</option><option>VAT</option></select>
          </form>
        </div>
        <div className="card">
          <div className="value">Next Invoice: 15 Mar</div>
          <div className="desc">Payment reminders: Enabled</div>
        </div>
      </div>
    )
  },
  revenue_forecast: {
    title: 'Revenue Forecasting Dashboard',
    render: () => (
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="card">
          <h3>MRR Trend</h3>
          <div style={{height:240}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{d:'M1',mrr:900},{d:'M2',mrr:940},{d:'M3',mrr:980},{d:'M4',mrr:1010},{d:'M5',mrr:1050},{d:'M6',mrr:1090}]}>
                <XAxis dataKey="d" /><YAxis /><Tooltip />
                <Area type="monotone" dataKey="mrr" stroke="#22d3ee" fill="#22d3ee22" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3>Best vs Worst</h3>
          <div style={{height:240}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{b:1200,w:900},{b:1300,w:950},{b:1350,w:980}]}>
                <XAxis hide /><YAxis /><Tooltip />
                <Bar dataKey="b" fill="#22c55e" />
                <Bar dataKey="w" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

function slugToKey(slug){
  return {
    organization: 'organization',
    'employee-cost-engine': 'employee_cost',
    'billing-calculator-engine': 'billing_calc',
    'real-time-margin-tracker': 'margin_tracker',
    'ai-margin-prediction-engine': 'ai_prediction',
    'resource-allocation-optimizer': 'allocation',
    'bench-management-system': 'bench',
    'contract-analyzer': 'contract',
    'automated-invoicing-system': 'invoicing',
    'revenue-forecasting-dashboard': 'revenue_forecast'
  }[slug] || 'organization'
}

export default function ModuleDetail(){
  const { slug } = useParams()
  const key = slugToKey(slug)
  const def = defs[key]
  return (
    <div className="content">
      <h1 className="page-title">{def.title}</h1>
      {def.render()}
    </div>
  )
}

function OrgWizard(){
  const [step, setStep] = useState(0)
  const steps = ['Company Info','Billing Models','Currency Settings','Departments']
  return (
    <div className="grid" style={{gridTemplateColumns:'2fr 1fr'}}>
      <div>
        <Stepper
          steps={steps}
          current={step}
          onPrev={()=>setStep(s=>Math.max(0,s-1))}
          onNext={()=>setStep(s=>Math.min(steps.length-1,s+1))}
          onFinish={()=>setStep(0)}
        />
        <div className="card" style={{marginTop:12}}>
          {step===0 && (
            <form style={{display:'grid',gap:8}}>
              <input placeholder="Company Name" />
              <input placeholder="Domain" />
              <input placeholder="Contact Email" />
            </form>
          )}
          {step===1 && (
            <form style={{display:'grid',gap:8}}>
              <select><option>Fixed</option><option>T&M</option><option>Retainer</option></select>
              <input placeholder="Default Billing Rate" type="number" />
            </form>
          )}
          {step===2 && (
            <form style={{display:'grid',gap:8}}>
              <select><option>INR</option><option>USD</option><option>EUR</option></select>
              <input placeholder="Conversion Source" />
            </form>
          )}
          {step===3 && (
            <form style={{display:'grid',gap:8}}>
              <input placeholder="Add Department" />
              <button>Add</button>
            </form>
          )}
        </div>
      </div>
      <div>
        <div className="card">
          <div className="value">Setup Status</div>
          <div className="desc">Complete these steps to finish onboarding</div>
        </div>
      </div>
    </div>
  )
}

function BillingCalc(){
  const [rate, setRate] = useState(1200)
  const [cost, setCost] = useState(820)
  const [margin, setMargin] = useState(()=> Math.round(((rate - cost)/rate)*100))
  function recompute(r,c){ setMargin(Math.round(((r - c)/r)*100)) }
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div className="card">
        <div style={{fontWeight:700,marginBottom:8}}>Rates</div>
        <div className="toolbar">
          <input placeholder="Billing Rate" type="number" value={rate} onChange={e=>{const v=Number(e.target.value||0); setRate(v); recompute(v,cost)}} />
          <input placeholder="Cost Rate" type="number" value={cost} onChange={e=>{const v=Number(e.target.value||0); setCost(v); recompute(rate,v)}} />
        </div>
        <div className="desc">Currency conversion supported</div>
      </div>
      <div className="card">
        <div className="value">Margin: {margin}%</div>
        <div className="desc">Scenario simulation: try different rates</div>
      </div>
    </div>
  )
}

function ContractAnalyzer(){
  const [q,setQ] = useState('')
  const [rows,setRows] = useState([{term:'Payment due in 30 days',type:'Payment'},{term:'SLA uptime 99.9%',type:'SLA'},{term:'Late delivery penalty 2%',type:'Penalty'}])
  const columns = [{key:'term',label:'Extracted Term'},{key:'type',label:'Type'}]
  const filtered = useMemo(()=> rows.filter(r=> (r.term+' '+r.type).toLowerCase().includes(q.toLowerCase())),[q,rows])
  return (
    <>
      <div className="card">
        <div style={{fontWeight:700,marginBottom:8}}>Upload Contract PDF</div>
        <input type="file" />
      </div>
      <div className="card" style={{marginTop:12}}>
        <SearchBar value={q} onChange={setQ} placeholder="Filter extracted terms..." />
        <Table columns={columns} data={filtered} initialSort={{key:'type',dir:'asc'}} />
      </div>
    </>
  )
}
