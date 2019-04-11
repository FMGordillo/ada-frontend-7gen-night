import React from "react"
import ReactDOM from "react-dom"
import { Router, Route } from "react-router-dom"
import { createBrowserHistory } from "history"

import Auth from "./utils/auth"
import {
  Home,
  Accounts,
  Account,
  Attendance,
  AttendanceList,
  Callback
} from "./pages"
import { Layout } from "./components"
import * as serviceWorker from "./serviceWorker"

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Layout auth={auth}>
      <Route path="/" exact component={Home} />
      <Route path="/accounts" exact component={Accounts} />
      <Route path="/accounts/:id" exact component={Account} />
      <Route path="/attendance" exact component={Attendance} />
      <Route path="/attendance/list" exact component={AttendanceList} />
      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props)
          return <Callback {...props} />
        }}
      />
    </Layout>
  </Router>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
