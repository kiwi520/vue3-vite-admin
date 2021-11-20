import { computed } from 'vue'
import { useStore } from 'vuex'

export function useMapper (mapper, mapFn) {
  const storeMapperFns = mapFn(mapper)

  const store = useStore()
  const storeMapper = {}

  Object.keys(storeMapperFns).forEach(fnKey => {
    const fn = storeMapperFns[fnKey].bind({ $store: store })
    storeMapper[fnKey] = computed(fn)
  })

  return storeMapper
}
