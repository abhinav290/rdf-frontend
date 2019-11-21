import api from '../api'
import {API_URL} from './../consts'

/**
 * Service to abstract api calls to one file - to be used in middleware
 */
class ApiSerice {
  constructor() {
      this.api_url = API_URL
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

  async executeQuery(params) {
    console.log('Executing query :- '+ JSON.stringify(params))
    const res = await this.apiCall(api.execute, 'POST', params)
    const ok =res.ok
    const data= res.body
    return {ok, data}
  }
}

export default new ApiSerice()