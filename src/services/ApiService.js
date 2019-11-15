import api from '../api'


/**
 * Service to abstract api calls to one file - to be used in middleware
 */
class ApiSerice {
  constructor() {
      this.api_url = 'https://opendata-backend.herokuapp.com'
  }

   async apiCall(url, method = 'GET', params = null) {
      let payload = {
          method,
          mode: 'cors',
          headers: this.buildHeaders(),
      }
      if (params) {
          payload.body = JSON.stringify(params)
      }
      const res = await fetch(`${this.api_url}${url}`, payload)
      const status = res.status
      const ok = res.ok
      const body = await res.json()
      return { ok, status, body }
  }

   buildHeaders() {
      let headers = new Headers()
      headers.append('Content-type', 'application/json')
      return headers
  }

  async sample_output() { //Sample output
    const res = await this.apiCall(api.sample, 'GET')
    return res.body
  }
  async executeQuery(params) { //Sample output
    const res = await this.apiCall(api.execute, 'POST', params)
    const ok =res.ok
    const data= res.body
    return {ok, data}
  }

  async edit_user(id = 0, token = false, params) { //edit user by id/params
      const res = await this.apiCall(
          `${api.user}/${id}/`,
          'PUT',
          token,
          params
      )
      return res
  }

}

export default new ApiSerice()