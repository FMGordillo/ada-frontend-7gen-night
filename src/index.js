import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { Home, Accounts, Account, Attendance } from "./pages"
import { Layout } from "./components"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <Router>
    <Layout>
      <Route path="/" exact component={Home} />
      <Route path="/accounts" exact component={Accounts} />
      <Route path="/accounts/:id" exact component={Account} />
      <Route path="/attendance" exact component={Attendance} />
    </Layout>
  </Router>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
