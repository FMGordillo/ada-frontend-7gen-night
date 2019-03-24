import React, { Component } from "react"
import { Link } from "react-router-dom"
import { GITHUB_ACCOUNTS } from "../utils/constants"
import { getRepositories } from "../utils/api"

class Accounts extends Component {
  state = {
    loading: true,
    error: false,
    accounts: []
  }

  /**
   * Get profiles
   */
  async componentDidMount() {
    console.log("executing")
    try {
      const accounts = await Promise.all(
        GITHUB_ACCOUNTS.map(id =>
          getRepositories(id).then(response => {
            if (response.status === 200) return { id, repos: response.data }
            else throw response
          })
        )
      )
      this.setState({ loading: false, error: false, accounts })
    } catch (error) {
      console.error("componentDidMount()", error)
      this.setState({ loading: false, error: true, accounts: [] })
    }
  }
  render() {
    const { loading, error, accounts } = this.state
    return (
      <div>
        <p>Current students: {GITHUB_ACCOUNTS.length}</p>
        <p>Last update: {new Date().toString()}</p>
        {error && <span>Error: {error}</span>}
        <ul>
          {(loading && <span>Loading...</span>) ||
            accounts.map((account, k) => (
              <li key={k}>
                <Link
                  to={{
                    pathname: `/accounts/${account.id}`,
                    state: account
                  }}
                >
                  {account.id} (
                  {accounts.find(i => i.id === account.id).repos.length})
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

export default Accounts
