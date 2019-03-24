import React from "react"
import { Box } from "bloomer"
const Account = props => {
  const { repos } = props.location.state
  return (
    <Box>
      {(repos.length > 0 && (
        <ul>
          {repos.map((repo, k) => (
            <li key={k}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      )) || <span>No hay repositorios</span>}
    </Box>
  )
}

export default Account
