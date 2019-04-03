import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import "./Layout.css"

class Layout extends Component {
  state = {
    loading: true,
    isAuthenticated: false
  }
  async componentDidMount() {
    const { LOGIN_KEY, isAuthenticated, renewSession } = this.props.auth
    try {
      if (localStorage.getItem(LOGIN_KEY) === "true") {
        await renewSession()
        this.setState({ isAuthenticated: isAuthenticated() })
      }
    } catch (error) {
      console.log("some errors", error)
    } finally {
      this.setState({ loading: false })
    }
  }
  login = () => {
    this.props.auth.login()
  }
  render() {
    return (
      <div>
        <nav>
          <NavLink to="/">Home</NavLink> |{" "}
          <NavLink to="/accounts">Cuentas</NavLink> |{" "}
          <NavLink to="/attendance">Tomar lista</NavLink> |{" "}
          {(this.state.isAuthenticated && (
            <button disabled={this.state.loading} onClick={() => this.login()}>
              Logout
            </button>
          )) || (
            <button disabled={this.state.loading} onClick={() => this.login()}>
              Login
            </button>
          )}
        </nav>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default Layout
