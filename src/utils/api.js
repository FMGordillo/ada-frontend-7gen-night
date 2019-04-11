import { create } from "axios"
import { format } from "date-fns"
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

require("dotenv").config()

const cloudant = create({
  baseURL:
    "https://72b656e0.us-south.apiconnect.appdomain.cloud/ada-7gen-management",
  data: {
    dbname: "ada_7gen_fe",
    host: process.env.REACT_APP_CLOUDANT_HOST || process.env.CLOUDANT_HOST,
    username:
      process.env.REACT_APP_CLOUDANT_USERNAME || process.env.CLOUDANT_USERNAME,
    password:
      process.env.REACT_APP_CLOUDANT_PASSWORD || process.env.CLOUDANT_PASSWORD
  },
  headers: {
    "X-Debug-Mode": true
  }
})

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN ||
      process.env.GITHUB_TOKEN}`
  },
  onError: function onError(params) {
    console.error("Error connecting", params)
  }
})

/**
 * @param {String} user Github ID
 */
export const getRepositories = user =>
  client.query({
    query: gql`
    { 
      user(login:"${user}") { 
        name,
        login,
        repositories(last:10) {
          totalCount
          nodes {
            url,
            name
          }
        }
      }
    }
  `
  })

export const uploadAssistance = doc =>
  cloudant.post("create-document?blocking=true&result=true", {
    doc
  })

export const getAssistance = () =>
  cloudant.post("exec-query-find?blocking=true&result=true", {
    query: {
      selector: {
        date: format(new Date(), "MM/DD/YYYY")
      }
    }
  })

export const getAllAssitance = () =>
  cloudant.post("exec-query-find?blocking=true&result=true", {
    query: {
      selector: {
        _id: {
          $gt: "0"
        }
      },
      sort: [
        {
          _id: "asc"
        }
      ]
    }
  })
