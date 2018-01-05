import axios from 'axios'
import config from '../config'

export default {
  request (method, uri, data, headerConfig = {withCredentials: true}) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    let url = config.serverURI + uri

    return axios({ method, url, data, ...headerConfig })
  },
  requestJava (method, uri, data, headerConfig = {headers: {'sessionid': 'hanwuqia'}}) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    let url = config.serverJavaURI + uri

    return axios({method, url, data, ...headerConfig})
  },
  requestUpload (method, uri, data, headerConfig = {withCredentials: true}) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    let url = config.uploadImage + uri

    return axios({ method, url, data, ...headerConfig })
  }
}
