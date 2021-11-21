<template>
  <div class="cate-main">
    <div class="cate-query-form">
      <el-form
        ref="queryForm"
        :inline="true"
        :model="stateData.queryForm"
        size="mini"
      >
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="stateData.queryForm.name"
            placeholder="请输入分类名称"
            size="mini"
          />
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
    <div class="cate-table">
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
      <el-table :data="stateData.cateSearchList">
        <el-table-column
          v-for="item in stateData.columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        />
        <el-table-column
          label="操作"
          width="260"
        >
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row.ID)"
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
      />
    </div>

    <el-dialog
      v-model="stateData.showModal"
      :before-close="handleFormClose"
      :title="stateData.action==='create'?'创建分类':'编辑分类'"
    >
      <el-form
        ref="cateForm"
        :model="stateData.postForm"
        label-width="100px"
        :rules="stateData.cateFormRules"
      >
        <el-form-item
          label="分类名称"
          prop="name"
        >
          <el-input
            v-model="stateData.postForm.name"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item
          label="父级菜单"
          prop="parent_id"
        >
          <el-cascader
            v-model="stateData.postForm.parent_id"
            :options="stateData.cateTreeList"
            :props="{ checkStrictly: true,emitPath:false, value: 'id', label: 'name' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input
            v-model="stateData.postForm.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleFormClose">取 消</el-button>
          <el-button
            type="primary"
            @click="handleFormSubmit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, nextTick, onMounted, reactive } from 'vue'
import moment from 'moment'

export default {
  name: 'Category',
  setup () {
    const instance = getCurrentInstance()
    const stateData = reactive({
      queryForm: {
        name: '',
        total: 0,
        page_index: 1,
        page_size: 10
      },
      showModal: false,
      action: 'create',
      postForm: {
        name: '',
        parent_id: 0,
        remark: ''
      },
      cateFormRules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
            validate: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入用户名'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      cateTreeList: [],
      cateSearchList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          formatter (row, column, value) {
            return moment(row.updateTime).format('ll')
          }
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter (row, column, value) {
            return moment(row.createTime).format('ll')
          }
        }
      ]
    })

    const handleQuery = async () => {
      getCategoryList()
    }
    const handleReset = () => {
      stateData.queryForm = {
        ...stateData.queryForm,
        name: ''
      }
    }
    const handleCreate = () => {
      stateData.action = 'create'
      stateData.showModal = true
    }
    const handleFormSubmit = () => {
      console.log('stateData.postForm')
      console.log(stateData.postForm)
      console.log('stateData.postForm')
      instance.proxy.$refs.cateForm.validate(async (valid) => {
        if (valid) {
          if (stateData.action === 'create') {
            const res = await instance.proxy.$api.addCategory(stateData.postForm)
            if (res.status === 200) {
              instance.proxy.$message.success('添加成功')
              handleFormClose()
              getCategoryList()
              stateData.showModal = false
            }
          } else if (stateData.action === 'edit') {
            const res = await instance.proxy.$api.updateCategory(stateData.postForm)
            if (res.status === 200) {
              instance.proxy.$message.success('修改成功')
              handleFormClose()
              getCategoryList()
              stateData.showModal = false
            }
          }
        }
      })
    }
    const handleFormClose = () => {
      stateData.postForm = {
        name: '',
        parent_id: 0,
        remark: ''
      }
      stateData.showModal = false
    }

    const handleEdit = (row) => {
      stateData.action = 'edit'
      stateData.showModal = true

      nextTick(() => {
        console.log('row')
        console.log(row)
        console.log('row')
        stateData.postForm = {
          ...row,
          id: row.ID
        }
      })
    }
    const handleDel = async (id) => {
      console.log(id)
      console.log(id)
      console.log(id)
      const res = await instance.proxy.$api.deleteCategory(id)
      if (res.status === 200) {
        instance.proxy.$message.success('删除成功')
        getCategoryList()
      }
    }

    const getCategoryList = async () => {
      const cateSearchList = await instance.proxy.$api.searchCategoryList(stateData.queryForm)
      if (cateSearchList.status === 200) {
        stateData.cateSearchList = cateSearchList.data.data.list
        stateData.queryForm.total = cateSearchList.data.data.total
      }
    }
    const getCategoryTree = async () => {
      const treeList = await instance.proxy.$api.getCategoryTree(0)
      if (treeList.status === 200) {
        console.log('treeList')
        console.log(treeList)
        console.log('treeList')
        stateData.cateTreeList = treeList.data.data
      }
    }

    onMounted(() => {
      getCategoryTree()
      getCategoryList()
    })
    return {
      stateData,
      handleQuery,
      handleReset,
      handleCreate,
      handleFormSubmit,
      handleFormClose,
      handleEdit,
      handleDel
    }
  }
}
</script>

<style lang="scss">
.cate-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;
    .cate-query-form{
        width: 100%;
        height: 41px;
        background-color: white;
        margin-bottom: 20px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: start;
        align-items: center;
        //border: 1px solid red;
        padding: 20px 20px 0;
    }
    .cate-table{
        height: 100%;
        width: 100%;
        background-color: white;
        //border: 1px saddlebrown solid;
        .action {
            border-radius: 5px;
            background: #ffffff;
            padding: 10px;
            border-bottom: 1px solid #ece8e8;
        }
    }
}
</style>
