import auth0 from "auth0-js"

const isProd = process.env.NODE_ENV === "production"

export default class Auth {
  LOGIN_KEY = "ada-7gen-fe-login"
  accessToken = null
  idToken = null
  expiresAt = null
  auth0 = new auth0.WebAuth({
    domain: "fmgordillo-auth-api.auth0.com",
    clientID: "ei0doT620yf0BiuW1zcDXSOsELzu2Qoy",
    redirectUri: `${window.location.protocol}//${window.location.hostname}:${
      isProd ? process.env.PORT || "" : process.env.PORT || 3000
    }/callback`,
    responseType: "token id_token",
    scope: "openid"
  })

  getAccessToken = () => {
    return this.accessToken
  }

  getIdToken = () => {
    return this.idToken
  }

  login = () => {
    this.auth0.authorize()
  }

  logout = () => {
    this.accessToken = null
    this.idToken = null
    this.expiresAt = null

    localStorage.removeItem(this.LOGIN_KEY)
    // TODO: Navigate to home page
  }

  renewSession = () =>
    new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, result) => {
        if (result && result.accessToken && result.idToken) {
          this.setSession(result)
          resolve()
        } else if (err) {
          console.log(err)
          this.logout()
          reject()
        }
      })
    })

  handleAuthentication = () => {
    this.auth0.parseHash((err, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result)
      } else if (err) {
        // TODO: Navigate to the home page
        console.log(err)
      }
    })
  }

  setSession = ({ expiresIn, accessToken, idToken }) => {
    localStorage.setItem(this.LOGIN_KEY, "true")
    let expiresAt = expiresIn * 1000 + new Date().getTime()
    this.accessToken = accessToken
    this.idToken = idToken
    this.expiresAt = expiresAt

    // TODO: Navigate to home route
  }

  isAuthenticated = () => {
    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt
  }
}
