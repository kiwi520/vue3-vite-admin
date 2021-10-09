import { post } from '../utils/request'

export default {
  login (params) {
    return post('/users/login', params)
  }
}
