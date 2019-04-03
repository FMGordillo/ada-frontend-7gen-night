import React from "react"
import { NavLink } from "react-router-dom"
import "./Layout.css"

const Layout = ({ children }) => {
  // const childrens = React.Children.map(children, child =>
  //   React.cloneElement(child, { meVes: true })
  // )
  // const childrens = React.cloneElement(children, { accounts: [], meVes: null })
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/accounts">Cuentas</NavLink>|{" "}
        <NavLink to="/attendance">Tomar lista</NavLink>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default Layout
