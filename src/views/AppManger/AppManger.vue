<template>
  <div class="app-manger-main">
    <div class="app-manger-form">
      <el-form
        :inline="true"
        :model="stateData.queryForm"
        class="demo-form-inline"
        size="mini"
      >
        <el-form-item
          label="App版本名称"
          prop="name"
        >
          <el-input
            v-model="stateData.queryForm.name"
            placeholder="请输入app版本名称"
          />
        </el-form-item>
        <el-form-item label="平台">
          <el-select
            v-model="stateData.queryForm.platform"
            placeholder="请选择平台"
          >
            <el-option
              label="请选择"
              :value="0"
            />
            <el-option
              label="android"
              :value="1"
            />
            <el-option
              label="iso"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发版状态">
          <el-select
            v-model="stateData.queryForm.state"
            placeholder="请选择发版状态"
          >
            <el-option
              label="请选择"
              :value="0"
            />
            <el-option
              label="为发版"
              :value="1"
            />
            <el-option
              label="已发版"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            查询
          </el-button>
          <el-button @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-manger-table">
      <div class="action">
        <el-button
          type="primary"
          size="small"
          @click="handleCreate"
        >
          新增
        </el-button>
        <!--        <el-button-->
        <!--          type="danger"-->
        <!--          size="small"-->
        <!--          @click="handlePatchDel"-->
        <!--        >-->
        <!--          批量删除-->
        <!--        </el-button>-->
      </div>
    </div>
    <el-dialog
      v-model="stateData.showModal"
      :title="stateData.action ==='create'? '新增菜单':'编辑菜单'"
      :before-close="handleClose"
    >
      <el-form
        ref="menuForm"
        :model="stateData.appForm"
        label-width="100px"
      >
        <el-form-item>
          <el-row>
            <el-col :span="8">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                :on-change="handleFileChange"
              >
                <template #trigger>
                  <el-button
                    size="small"
                    type="primary"
                  >
                    选择文件
                  </el-button>
                </template>
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="submitUpload"
                >
                  保存的服务器
                </el-button>
              </el-upload>
              <div v-loading="stateData.percentageLoading" />
            </el-col>
            <el-col :span="16">
              <div style="width: 100%;height: 100%; padding-top: 12px">
                <el-progress
                  :percentage="stateData.percentage.toFixed(2)"
                  color="#409eff"
                />
              </div>
            </el-col>
          </el-row>

          <!--          <div style="width: 300px">-->
          <!--            <el-progress-->
          <!--              :percentage="stateData.percentage.toFixed(2)"-->
          <!--              color="#409eff"-->
          <!--            />-->
          <!--          </div>-->
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import * as SparkMD5 from 'spark-md5'
import { ElMessage } from 'element-plus'

export default {
  name: 'AppManger',
  setup () {
    const instance = getCurrentInstance()

    const chunkSize = 5 * 1024 * 1024
    const stateData = reactive({
      action: 'create',
      showModal: false,
      queryForm: {
        name: '',
        state: 0,
        platform: 0,
        total: 0,
        page_index: 1,
        page_size: 10
      },
      appForm: {

      },
      currentFile: '',
      percentage: 0,
      percentageLoading: false,
      percentageCount: 0,
      percentageFileChunkCount: 0,
      uploadFilePtah: '' // 上传成功后的文件地址
    })

    const { handleCreate, submitUpload, handleFileChange, handleClose, handleSubmit } = addAppVersionEffect(instance, stateData, chunkSize)

    return { stateData, handleCreate, submitUpload, handleFileChange, handleClose, handleSubmit }
  }
}

function addAppVersionEffect (instance, stateData, chunkSize) {
  const handleCreate = () => {
    stateData.action = 'create'
    stateData.showModal = true
  }

  const handleFileChange = (file) => {
    console.log('file')
    console.log(file)
    console.log('file')
    stateData.currentFile = file
  }

  const submitUpload = async () => {
    if (!stateData.currentFile) {
      ElMessage.warning('请选择文件')
      return
    }
    stateData.percentageLoading = true
    // 文件分片
    const fileChunkList = createChunkList(stateData.currentFile.raw, chunkSize)
    console.log('fileChunkList')
    console.log(fileChunkList)
    console.log('fileChunkList')
    stateData.percentageFileChunkCount = fileChunkList.length || 0
    const fileHash = await createMD5(fileChunkList, chunkSize)
    console.log('fileHash')
    console.log(fileHash)
    console.log('fileHash')
    const chunkList = fileChunkList.map((file, index) => {
      return {
        file: file,
        chunkHash: fileHash + '-' + index,
        fileHash: fileHash
      }
    })
    const chunkFormData = chunkList.map((chunk, index) => {
      stateData.currentFile.fileHash = chunk.fileHash
      const formData = new FormData()
      formData.append('chunkNumber', index)
      formData.append('chunk', chunk.file)
      formData.append('chunkHash', chunk.chunkHash)
      formData.append('fileHash', chunk.fileHash)
      // return {
      //   formData: axios.post('/api/appVersion/uploadChunk', formData, {
      //     headers: { 'Content-Type': 'multipart/form-data' }
      //   }).then(res => {
      //     console.log(res)
      //   })
      // }
      return {
        formData: instance.proxy.$api.uploadAppVersion(formData)
      }
    })

    Promise.all(
      chunkFormData.map((data) => {
        return new Promise((resolve, reject) => {
          data.formData.then(res => {
            console.log(res.data.data)
            chunkFormData.splice(res.data.data.chunk_number, 1)
            console.log('chunkFormData.length')
            console.log(chunkFormData.length)
            console.log(chunkFormData.toString())
            console.log('chunkFormData.length')
            stateData.percentageCount += 1
            console.log('stateData.percentageCount')
            console.log(stateData.percentageCount)
            console.log('stateData.percentageCount')
            console.log('stateData.percentageFileChunkCount')
            console.log(stateData.percentageFileChunkCount)
            console.log('stateData.percentageFileChunkCount')
            stateData.percentage = (parseInt(stateData.percentageCount) / parseInt(stateData.percentageFileChunkCount)) * 100

            console.log('stateData.percentage')
            console.log(stateData.percentage)
            console.log('stateData.percentage')
            return resolve('ok')
          }).catch(err => {
            return reject(err)
          })
          // postUploadFile(data.formData)
          //   .then((data) => {
          //     resolve(data)
          //   })
          //   .catch((err) => {
          //     reject(err)
          //   })
        })
      })
    ).then(res => {
      console.log('done')
      console.log(res)
      console.log(stateData.currentFile.name)
      console.log(stateData.currentFile.fileHash)
      console.log('done')
      const params = {
        file_name: stateData.currentFile.name,
        file_hash: stateData.currentFile.fileHash,
        abc: 'aaaa'
      }
      instance.proxy.$api.mergeChunkAppVersion(params).then(res => {
        console.log('res')
        console.log(res)
        console.log(res)
        console.log('res')
        const { data } = res
        if (data.status === 200) {
          console.log('data.status')
          console.log(data.status)
          console.log('data.status')
          stateData.percentageLoading = false
          stateData.uploadFilePtah = data.data.file_url
        }
      }).catch(err => {
        console.log('nodone err')
        console.log(err)
        console.log('nodone err')
      })
    }).catch(err => {
      console.log('nodone err')
      console.log(err)
      console.log('nodone err')
    })
  }

  const createChunkList = (file, chunkSize) => {
    const fileChunkList = []
    let cur = 0
    while (cur < file.size) {
      fileChunkList.push(file.slice(cur, cur + chunkSize))
      cur += chunkSize
    }
    return fileChunkList
  }

  const createMD5 = (fileChunkList, chunkSize) => {
    return new Promise((resolve, reject) => {
      // const slice =
      //             File.prototype.slice ||
      //             File.prototype.mozSlice ||
      //             File.prototype.webkitSlice
      const chunks = fileChunkList.length
      let currentChunk = 0
      const spark = new SparkMD5.ArrayBuffer()
      const fileReader = new FileReader()
      // 读取文件切片
      fileReader.onload = function (e) {
        spark.append(e.target.result)
        currentChunk++
        if (currentChunk < chunks) {
          loadChunk()
        } else {
          // 读取切片，返回最终文件的Hash值
          resolve(spark.end())
        }
      }

      fileReader.onerror = function (e) {
        reject(e)
      }

      function loadChunk () {
        fileReader.readAsArrayBuffer(fileChunkList[currentChunk])
      }

      loadChunk()
    })
    // md5 对应文件唯一标识
    // size 默认视频前5M作为此视频唯一标识，理论上MD5可加密任意字符，但是你要相信对于js来说一定有性能瓶颈，所以不 建议过大，如果需求需要，也尽量建议不要超过30m
  }

  const handleClose = () => {
    stateData.showModal = false
  }

  const handleSubmit = () => {

  }
  return { handleCreate, submitUpload, handleFileChange, handleClose, handleSubmit }
}
</script>

<style lang="scss">
.app-manger-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;

    .app-manger-form {
        width: 100%;
        height: 50px;
        background-color: white;
        line-height: 50px;
        padding-left: 10px;
    }

    .app-manger-table {
        width: 100%;
        height: 100%;
        padding-top: 10px;
    }

}

.upload-container{
    width: 80%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-content: center;
}
</style>
