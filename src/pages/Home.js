import React, { Component } from "react"
import { Title } from "bloomer"
import { getRepositories } from "../utils/api"

class Home extends Component {
  async componentDidMount() {
    getRepositories("FMGordillo")
  }
  render() {
    return (
      <div>
        <Title>Bienvenida</Title>
        <p>
          ¡Hola! Acá tenés la lista de alumnas de{" "}
          <b>Frontend Turno Noche (Mar, Jue, Sab)</b>
        </p>
      </div>
    )
  }
}
export default Home
