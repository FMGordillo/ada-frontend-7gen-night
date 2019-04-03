import React, { Component } from "react"
import { format, isTuesday, isThursday, isSaturday } from "date-fns"
import es from "date-fns/locale/es"

import { getAssistance, uploadAssistance } from "../../utils/api"
import { GITHUB_ACCOUNTS } from "../../utils/constants"

import "./index.css"

class Attendance extends Component {
  state = {
    accounts: [],
    isEditable: false,
    loading: true,
    currentDay: null
  }

  /**
   * Si no estás en día de clase,
   * no podés editar la lista
   */
  async componentDidMount() {
    try {
      const {
        data: {
          response: { docs: data }
        }
      } = await getAssistance({
        selector: {
          _id: {
            $gt: 0
          }
        }
      })
      console.log(data)

      const currentDate = new Date()
      if (
        isTuesday(currentDate) ||
        isThursday(currentDate) ||
        isSaturday(currentDate)
      ) {
        this.setState({
          accounts: data,
          isEditable: true,
          currentDay: format(currentDate, "dddd, MMMM d - HH:mm", {
            locale: es
          })
        })
      }
    } catch (e) {
      throw e
    }

    this.setState({ loading: false })
  }

  /**
   * Enviar datos
   */
  handleSubmit = async (e, user) => {
    const currentDate = format(new Date(), "MM/DD/YYYY")
    const _id = `${user}-${format(new Date(), "MM/DD/YYYY")}`
    const isPresente = e.target.value === "true"

    const doc = {
      _id,
      user,
      date: currentDate,
      isPresente,
      comentarios: ""
    }

    try {
      const {
        data: { response }
      } = await uploadAssistance(doc)
      if (!response.ok) {
        throw response
      }
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const { accounts, isEditable, currentDay, loading } = this.state
    return (
      <>
        <h2>Lista de asistentes</h2>
        <p>Dia de hoy: {currentDay || "N/A"}</p>
        {(loading && <p>Cargando...</p>) ||
          ((isEditable && <p>se puede editar.</p>) || (
            <p>No se puede editar, perdon</p>
          ))}
        {/* TODO: Terminar con "Comentarios" */}
        <table>
          <thead>
            <tr>
              <td>Username</td>
              <td>Presente</td>
              <td>Ausente</td>
              <td>Comentarios</td>
            </tr>
          </thead>
          <tbody>
            {GITHUB_ACCOUNTS.map((account, k) => {
              const user =
                accounts.length > 0
                  ? JSON.parse(
                      JSON.stringify(
                        accounts.find(ac => account === ac.user) || {}
                      )
                    )
                  : {}
              return (
                <tr key={k}>
                  <td>{account}</td>
                  <td>
                    {/* TODO: Puedo esconder de una mejor forma esto? */}
                    <input
                      type="text"
                      name="_id"
                      readOnly
                      hidden
                      value={
                        (user && user._id) ||
                        `${account}-${format(new Date(), "MM/DD/YYYY")}`
                      }
                    />
                    <input
                      type="text"
                      name="_rev"
                      readOnly
                      hidden
                      value={(user && user._rev) || ""}
                    />
                    <label className="container" htmlFor={`${k}-isPresent`}>
                      <input
                        type="radio"
                        name={`${k}-isPresent`}
                        value="true"
                        // TODO: Fix
                        checked={user.isPresente}
                        disabled={!isEditable}
                        onChange={e => this.handleSubmit(e, account)}
                      />
                    </label>
                  </td>
                  <td>
                    <label className="container" htmlFor={`${k}-isPresent`}>
                      <input
                        type="radio"
                        name={`${k}-isPresent`}
                        value="false"
                        // TODO: Fix
                        checked={user.isPresente == false || null}
                        disabled={!isEditable}
                        onChange={e => this.handleSubmit(e, account)}
                      />
                    </label>
                  </td>
                  <td>
                    <input type="text" disabled={!isEditable} />
                    {/* <input type="button" value=">" onClick={() => }/> */}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}

export default Attendance
