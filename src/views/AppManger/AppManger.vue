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
              label="未发版"
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
            @click="handleQuery"
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
      <el-table
        :data="stateData.SearchAppVersionList"
        row-key="id"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="item in stateData.columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
          v-bind="item"
        />
        <!--        <el-table-column-->
        <!--          label="创建时间"-->
        <!--          prop="createTime"-->
        <!--          :formatter="formatterTime"-->
        <!--        />-->
        <!--        <el-table-column-->
        <!--          label="更新时间"-->
        <!--          prop="updateTime"-->
        <!--          :formatter="formatterTime"-->
        <!--        />-->
        <el-table-column
          label="操作"
          width="300px"
        >
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDownloadApp(scope.row)"
            >
              下载应用
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.ID)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right;margin: 10px 10px 0 0"
        class="pagination"
        background
        layout="prev, pager, next"
        :total="stateData.queryForm.total"
        :page-size="stateData.queryForm.page_size"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="stateData.showModal"
      :title="stateData.action ==='create'? '新增菜单':'编辑菜单'"
      :before-close="handleClose"
    >
      <el-form
        ref="menuForm"
        :model="stateData.appForm"
        label-width="150px"
      >
        <el-form-item
          label="App版本名称"
          prop="name"
        >
          <el-input
            v-model="stateData.appForm.name"
            placeholder="请输入app版本名称"
          />
        </el-form-item>
        <el-form-item
          label="App版本"
          prop="version"
        >
          <el-input
            v-model="stateData.appForm.version"
            placeholder="请输入app版本"
          />
        </el-form-item>
        <el-form-item
          label="上传app安装包"
          prop="file_path"
        >
          <el-row>
            <el-col :span="8">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                :on-change="handleFileChange"
                :on-remove="handleFileDelete"
                :file-list="stateData.fileList"
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
                <div v-loading="stateData.percentageLoading" />
              </el-upload>
            </el-col>
            <el-col :span="16">
              <div style="width: 100%;height: 100%; padding-top: 12px">
                <el-progress
                  :percentage="stateData.percentage.toFixed(2)"
                  color="#409eff"
                />
              </div>
            </el-col>
            <el-input
              v-model="stateData.appForm.file_path"
              type="hidden"
              name="file_path"
            />
          </el-row>

          <!--          <div style="width: 300px">-->
          <!--            <el-progress-->
          <!--              :percentage="stateData.percentage.toFixed(2)"-->
          <!--              color="#409eff"-->
          <!--            />-->
          <!--          </div>-->
        </el-form-item>
        <el-form-item
          label="所属平台"
          prop="platform"
        >
          <el-select
            v-model="stateData.appForm.platform"
            placeholder="请选择"
          >
            <el-option
              :value="0"
              label="请选择"
            />
            <el-option
              :value="1"
              label="android"
            />
            <el-option
              :value="2"
              label="ios"
            />
            <el-option
              :value="3"
              label="停用"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="发版状态"
          prop="state"
        >
          <el-select
            v-model="stateData.appForm.state"
            placeholder="请选择"
          >
            <el-option
              :value="0"
              label="请选择"
            />
            <el-option
              :value="1"
              label="未发版"
            />
            <el-option
              :value="2"
              label="已发版"
            />
            <el-option
              :value="3"
              label="停用"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input
            v-model="stateData.appForm.remark"
            :rows="3"
            type="textarea"
            placeholder="请输入"
          />
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
import { getCurrentInstance, onMounted, reactive } from 'vue'
import * as SparkMD5 from 'spark-md5'
import { ElMessage } from 'element-plus'
import moment from 'moment'

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
        id: 0,
        name: '',
        file_path: '',
        version: '',
        platform: 0,
        state: 0,
        remark: ''
      },
      currentFile: '',
      percentage: 0,
      percentageLoading: false,
      percentageCount: 0,
      percentageFileChunkCount: 0,
      uploadFilePtah: '', // 上传成功后的文件地址
      SearchAppVersionList: [],
      columns: [
        {
          label: 'app名称',
          prop: 'name',
          width: 150
        },
        {
          label: '版本',
          prop: 'version'
        },
        {
          label: '平台',
          prop: 'platform',
          formatter (row, column, value) {
            return {
              1: 'android',
              2: 'ios'
            }[value]
          }
        },
        {
          label: '发布状态',
          prop: 'state',
          formatter (row, column, value) {
            return {
              1: '未发布',
              2: '已发布',
              3: '停用'
            }[value]
          }
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter (row, column, value) {
            return moment(row.createTime).format('ll')
          }
        }
      ],
      fileList: []
    })

    onMounted(() => {
      getAppVersionList()
    })

    const { handleCreate, submitUpload, handleFileChange, handleClose, handleSubmit, handleFileDelete } = addAppVersionEffect(instance, stateData, chunkSize)
    const { getAppVersionList, handleDownloadApp, handleQuery, handleReset, handleEdit, handleDelete } = AppVersionListEffect(instance, stateData, chunkSize)

    return { stateData, handleCreate, submitUpload, handleFileChange, handleFileDelete, handleClose, handleSubmit, handleDownloadApp, handleQuery, handleReset, handleEdit, handleDelete }
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
        file_hash: stateData.currentFile.fileHash
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
          stateData.appForm.file_path = data.data.file_url
          // stateData.fileList[0].name = data.data.file_url
          // stateData.fileList[0].id = 1213213213
          stateData.fileList.push({
            name: data.data.file_name,
            file_url: data.data.file_url,
            id: 1213213213,
            flag: data.data.flag,
            delete_flag: true
          })
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
    addFormReset()
  }

  const handleSubmit = async () => {
    console.log('stateData.appForm')
    console.log(stateData.appForm)
    console.log('stateData.appForm')

    if (stateData.action === 'create') {
      stateData.appForm.version = parseFloat(stateData.appForm.version)

      const res = await instance.proxy.$api.addAppVersion(stateData.appForm)

      if (res.status === 200) {
        instance.proxy.$message.success('添加成功')
        stateData.showModal = false
        addFormReset()
      }
    } else if (stateData.action === 'edit') {
      stateData.appForm.version = parseFloat(stateData.appForm.version)

      const res = await instance.proxy.$api.updateAppVersion(stateData.appForm)

      if (res.status === 200) {
        instance.proxy.$message.success('添加成功')
        stateData.showModal = false
        addFormReset()
      }
    }
  }

  const addFormReset = () => {
    stateData.appForm = {
      name: '',
      file_path: '',
      version: '',
      platform: 0,
      state: 0,
      remark: ''
    }
  }

  const handleFileDelete = async (row) => {
    console.log('handleFileDelete')
    console.log(row)
    console.log('handleFileDelete')
    console.log('stateData.fileList')
    console.log(stateData.fileList)
    console.log('stateData.fileList')
    stateData.percentage = 0
    if (row.delete_flag !== undefined) {
      console.log('是自己的')

      await instance.proxy.$api.deleteAppApk({
        flag: !!row.flag,
        id: row.flag ? row.id : 10000000,
        file_path: row.file_url
      })
    } else {
      console.log('nononon')
    }
  }
  return { handleCreate, submitUpload, handleFileChange, handleClose, handleSubmit, handleFileDelete }
}

function AppVersionListEffect (instance, stateData, chunkSize) {
  const getAppVersionList = async () => {
    const list = await instance.proxy.$api.getAppVersionList(stateData.queryForm)
    stateData.SearchAppVersionList = list.data.data.list
    stateData.queryForm.total = list.data.data.total
  }

  const handleDownloadApp = () => {

  }

  const handleQuery = async () => {
    const list = await instance.proxy.$api.getAppVersionList(stateData.queryForm)
    stateData.SearchAppVersionList = list.data.data.list
    stateData.queryForm.total = list.data.data.total
  }

  const handleReset = () => {
    stateData.queryForm = {
      ...stateData.queryForm,
      name: '',
      state: 0,
      platform: 0
    }
  }

  const handleEdit = (row) => {
    stateData.action = 'edit'
    stateData.showModal = true
    // appForm
    instance.proxy.$nextTick(() => {
      stateData.appForm = {
        ...row,
        id: row.ID
      }
      stateData.fileList = []
      stateData.fileList.push({
        name: row.file_path,
        file_url: row.file_path,
        id: row.ID,
        flag: true,
        delete_flag: true
      })
    })
  }

  const handleDelete = async (id) => {
    const res = await instance.proxy.$api.deleteAppVersion(id)
    if (res.status === 200) {
      instance.proxy.$message.success('删除成功')
      // stateData.showModal = false
      handleQuery()
    }
  }

  return { getAppVersionList, handleDownloadApp, handleQuery, handleReset, handleEdit, handleDelete }
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
