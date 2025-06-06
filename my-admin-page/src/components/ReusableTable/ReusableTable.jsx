import React from 'react'

const ReusableTable = ({ columns, data }) => (
  <table className="reusable-table">
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col.key || col.dataIndex}>{col.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={row.id || idx}>
          {columns.map(col => (
            <td key={col.key || col.dataIndex}>
              {col.render ? col.render(row[col.dataIndex], row) : row[col.dataIndex]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default ReusableTable