
import config from '../config/index'

export default {
  setItem (key, val) {
    const storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(config.storageNamespace, JSON.stringify(storage))
  },
  getItem (key) {
    return this.getStorage()[key]
  },
  clearItem (key) {
    const storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.storageNamespace, JSON.stringify(storage))
  },
  clearAll () {
    window.localStorage.clear()
  },
  getStorage () {
    return JSON.parse(window.localStorage.getItem(config.storageNamespace) || '{}')
  }
}
