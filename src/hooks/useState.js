import { useMapper } from './useMapper'
import { createNamespacedHelpers, mapState } from 'vuex'

export function useState (mapper, moduleName) {
  let mapperFn = mapState

  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  }
  return useMapper(mapper, mapperFn)
}
