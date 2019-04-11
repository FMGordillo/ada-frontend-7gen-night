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
      } = await getAssistance()
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
  handleSubmit = async (e, user, list_id) => {
    e.preventDefault()
    const [_id, _rev, isPresent, isAbsent, comments] = Object.values(e.target)
    const currentDate = format(new Date(), "MM/DD/YYYY")
    const isPresente = isPresent.checked

    let doc = {
      _id: _id.value,
      user,
      date: currentDate,
      isPresente,
      comentarios: comments.value
    }

    if (_rev.value) {
      doc = Object.assign(doc, { _rev })
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
        <div className="table">
          <div className="thead">
            <div className="tr">
              <div className="th">Username</div>
              <div className="th">Presente</div>
              <div className="th">Ausente</div>
              <div className="th">Comentarios</div>
            </div>
          </div>
          <div className="tbody">
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
                <form
                  className="tr"
                  onSubmit={e => this.handleSubmit(e, account, k)}
                  key={k}
                >
                  <div className="td">{account}</div>
                  <div className="td">
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
                        checked={!!user.isPresente || null}
                        disabled={!isEditable}
                        required
                      />
                    </label>
                  </div>
                  <div className="td">
                    <label className="container" htmlFor={`${k}-isPresent`}>
                      <input
                        type="radio"
                        name={`${k}-isPresent`}
                        value="false"
                        checked={!!user.isPresente || null}
                        disabled={!isEditable}
                        required
                      />
                    </label>
                  </div>
                  <div className="td">
                    <input
                      type="text"
                      name="comentarios"
                      disabled={!isEditable}
                    />
                    <input type="submit" value=">" disabled={!isEditable} />
                  </div>
                </form>
              )
            })}
          </div>
        </div>
        <button type="submit">Enviar test</button>
      </>
    )
  }
}

export default Attendance
