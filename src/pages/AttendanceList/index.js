import React, { useState, useEffect } from "react"
import { GITHUB_ACCOUNTS } from "../../utils/constants"
import { getAllAssitance } from "../../utils/api"

import './index.css'

const ListOfAttendance = () => {
  const [alumns, setAlumns] = useState({})
  useEffect(() => {
    async function fetchData() {
      const { data } = await getAllAssitance()

      if (Object.keys(alumns).length <= 0 && data.response.docs.length > 0) {
        const depuratedAlumns = data.response.docs.reduce(
          (acc, curr) => {
            var key = curr["date"]
            if (!acc[key]) {
              acc[key] = []
            }
            acc[key].push(curr)
            return acc
          },
          []
        )
        setAlumns(depuratedAlumns)
      }
    }
    fetchData()
    return () => {
    }
  })

  console.log(alumns)

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre de usuario</th>

          {Object.keys(alumns).map((i, k) => {
            return <th key={k}>{i}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {GITHUB_ACCOUNTS.map((account, i) => (
          <tr key={i}>
            <td>{account}</td>
            {Object.keys(alumns).map((date, i) => {
              const line = alumns[date].find(el => el.user === account)
              return <td key={i}>{line ? (line.isPresente && "✅" || "🍺") : ""}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListOfAttendance
