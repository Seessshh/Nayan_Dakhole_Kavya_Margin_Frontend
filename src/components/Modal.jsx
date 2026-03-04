import React from 'react'

export default function Modal({ open, title, children, onClose, onConfirm, confirmText='Confirm' }){
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>{title}</h3>
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button className="ghost" onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
