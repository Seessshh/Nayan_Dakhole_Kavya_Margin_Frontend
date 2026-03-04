import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="brand">Kavya Margin</div>
      <nav>
        <ul>
          <li><NavLink to="/" end>Dashboard</NavLink></li>
          <li><NavLink to="/modules">Modules</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/customers">Customers</NavLink></li>
          <li><NavLink to="/subscriptions">Subscriptions</NavLink></li>
          <li><NavLink to="/invoices">Invoices</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/reports">Reports</NavLink></li>
        </ul>
      </nav>
    </aside>
  )
}
