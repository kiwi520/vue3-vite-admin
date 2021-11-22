<template>
  <div class="wangeditor">
    <div ref="editor" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, reactive, ref, toRefs, watch } from 'vue'
import WangEditor from 'wangeditor'

export default {
  props: {
    content: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup (props, content) {
    const editor = ref()
    const state = reactive({
      html: '',
      text: ''
    })

    let instance
    onMounted(() => {
      instance = new WangEditor(editor.value)

      Object.assign(instance.config, {
        onchange () {
          console.log('change')
          content.emit('getEditorValue', instance.txt.html())
        }
      })
      instance.create()
    })
    watch(props, (nweProps, oldProps) => {
      instance.txt.html(nweProps.content)
    })

    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })

    return {
      ...toRefs(state),
      editor
    }
  }
}
</script>

<style lang="scss">
    .wangeditor{

    }
</style>
