import { useMapper } from './useMapper'
import { createNamespacedHelpers, mapGetters } from 'vuex'

export function useGetters (mapper, moduleName) {
  let mapperFn = mapGetters

  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  }
  return useMapper(mapper, mapperFn)
}
