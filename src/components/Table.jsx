import React, { useMemo, useState } from 'react'

export default function Table({ columns, data, initialSort, pageSize = 10 }){
  const [sort, setSort] = useState(initialSort || { key: columns[0]?.key, dir: 'asc' })
  const [page, setPage] = useState(1)

  const rows = useMemo(()=>{
    const sorted = [...(data||[])].sort((a,b)=>{
      const va = a[sort.key]; const vb = b[sort.key]
      if(va===vb) return 0
      if(va==null) return 1
      if(vb==null) return -1
      return (va>vb ? 1 : -1) * (sort.dir==='asc'?1:-1)
    })
    const start = (page-1)*pageSize
    return { pageRows: sorted.slice(start, start+pageSize), total: sorted.length }
  },[data, sort, page, pageSize])

  function onSort(key){
    setSort(prev => prev.key===key ? { key, dir: prev.dir==='asc'?'desc':'asc' } : { key, dir:'asc' })
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(rows.total / pageSize))

  return (
    <div className="table">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map(col=>(
                <th key={col.key} onClick={()=>onSort(col.key)}>
                  <span>{col.label}</span>
                  {sort.key===col.key ? <span className="sort">{sort.dir==='asc'?'↑':'↓'}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.pageRows.length===0 ? (
              <tr><td colSpan={columns.length} className="empty">No data</td></tr>
            ) : rows.pageRows.map((row,i)=>(
              <tr key={i}>
                {columns.map(col=>(
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <div>Rows: {rows.total}</div>
        <div className="pager">
          <button className="ghost" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
          <span>{page} / {totalPages}</span>
          <button className="ghost" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
        </div>
      </div>
    </div>
  )
}
