import { create } from "axios"
const GITHUB_API = create({
  baseURL: "https://api.github.com"
})

/**
 * @param {String} user Github ID
 */
export const getRepositories = user => GITHUB_API.get(`/users/${user}/repos`)
