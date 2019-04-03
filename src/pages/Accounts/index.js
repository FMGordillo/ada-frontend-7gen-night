import React, { Component } from "react"
import { Link } from "react-router-dom"
import { getRepositories } from "../../utils/api"
import { GITHUB_ACCOUNTS } from "../../utils/constants"

class Accounts extends Component {
  state = {
    accounts: [],
    loading: true,
    error: false
  }
  async componentDidMount() {
    try {
      const accounts = await Promise.all(
        GITHUB_ACCOUNTS.map(id =>
          getRepositories(id)
            .then(({ data: { user } }) => ({ ...user }))
            .catch(err => {
              throw err
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
    const { accounts, loading } = this.state
    return (
      <div>
        <p>Current students: {GITHUB_ACCOUNTS.length}</p>
        <p>Last update: {new Date().toString()}</p>
        {(loading && <p>Please wait...</p>) || (
          <ul>
            {accounts.map((account, k) => (
              <li key={k}>
                <Link
                  to={{
                    pathname: `/accounts/${account.login}`,
                    state: { repos: account.repositories.nodes }
                  }}
                >
                  {account.login} ({account.repositories.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Accounts
