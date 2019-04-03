import React from "react"

const Account = props => {
  const { repos } = props.location.state
  return (
    <>
      {(repos.length > 0 && (
        <ul>
          {repos.map((repo, k) => (
            <li key={k}>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      )) || <span>No hay repositorios</span>}
    </>
  )
}

export default Account
