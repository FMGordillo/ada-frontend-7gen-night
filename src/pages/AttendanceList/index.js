import React, { useState, useEffect } from "react";
import { GITHUB_ACCOUNTS } from "../../utils/constants";
import { getAllAssitance } from "../../utils/api";

import "./index.css";

const ListOfAttendance = () => {
  const [alumns, setAlumns] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(() => setLoading(false));
    return () => {};
  });

  async function fetchData() {
    const { data } = await getAllAssitance();
    const { docs } = data.response;

    if (Object.keys(alumns).length <= 0 && docs.length > 0) {
      const depuratedAlumns = docs.reduce((acc, curr) => {
        var key = curr["date"];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, []);
      setAlumns(depuratedAlumns);
    }
  }

  return loading ? (
    <div className="loading">
      <span>Loading, please wait...</span>
    </div>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Nombre de usuario</th>

          {Object.keys(alumns).map((i, k) => {
            return <th key={k}>{i}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {GITHUB_ACCOUNTS.map((account, i) => (
          <tr key={i}>
            <td>{account}</td>
            {Object.keys(alumns).map((date, i) => {
              const line = alumns[date].find(el => el.user === account);
              return (
                <td key={i}>{line ? (line.isPresente && "✅") || "🍺" : ""}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListOfAttendance;
