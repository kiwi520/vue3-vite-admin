<template>
  <div class="department-main">
    <div class="department-query-form">
      <el-form
        ref="queryForm"
        :inline="true"
        :model="state.queryForm"
        size="mini"
      >
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="state.queryForm.department_name"
            placeholder="请输入部门名称"
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
    <div class="department-table">
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
        :data="state.SearchDeptList"
        row-key="_id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="item in state.columns"
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
        <el-table-column label="操作">
          <template #default="scope">
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
        :page-size="state.queryForm.page_size"
        :current-page="state.queryForm.page_index"
        style="text-align: right;margin: 10px 10px 0 0"
        class="pagination"
        background
        layout="prev, pager, next"
        :total="state.queryForm.total"
        @current-change="handlePageChange"
      />
    </div>

    <el-dialog
      v-model="state.showModal"
      :title="state.action==='create'?'创建部门':'编辑部门'"
      :before-close="handleClose"
    >
      <el-form
        ref="deptForm"
        :model="state.deptForm"
        rules="rules"
        label-width="100px"
        label-position="right"
        style="display: flex;flex-flow: column nowrap; justify-content: start;align-items: center;"
      >
        <el-form-item
          label="上级部门"
          prop="parentId"
        >
          <el-cascader
            ref="parentIdCascader"
            v-model="state.deptForm.parentId"
            placeholder="请选择上级部门"
            :props="{checkStrictly: true,value:'id',label:'department_name'}"
            clearable
            :show-all-levels="true"
            :options="state.departmentList"
          />
        </el-form-item>
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="state.deptForm.deptName"
            style="width: 220px"
            placeholder="请输入部门名称"
          />
        </el-form-item>
        <el-form-item
          label="部门负责人"
          prop="deptLeader"
        >
          <el-select
            v-model="state.deptForm.deptLeaderName"
            placeholder="请选择部门负责人"
            @change="changeEmail"
          >
            <el-option
              v-for="item in state.userList"
              :key="item.ID"
              :label="item.name"
              :value="`${item.ID}/${item.name}/${item.email}`"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="负责人邮箱"
          prop="leaderEmail"
        >
          <el-input
            v-model="state.deptLeaderEmail"
            style="width: 220px"
            placeholder="请输入负责人邮箱"
            disabled
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive } from 'vue'
import moment from 'moment'

moment.locale()

export default {
  name: 'Department',
  setup () {
    const instance = getCurrentInstance()

    const state = reactive({
      queryForm: {
        department_name: '',
        total: 0,
        page_index: 1,
        page_size: 5
      },
      action: 'create',
      showModal: false,
      columns: [
        {
          label: '部门名称',
          prop: 'department_name',
          formatter: ''
        },
        {
          label: '部门负责人',
          prop: 'leader_name',
          formatter: ''
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
      ],
      SearchDeptList: [],
      userList: [],
      deptForm: {
        parentId: 0,
        deptName: '',
        deptLeaderCode: '',
        deptLeaderName: ''
      },
      deptLeaderEmail: '',
      updateDepartmentId: 0
    })

    onMounted(() => {
      getUserList()
      getDepartmentList()
      handleQuery()
    })

    const {
      handleQuery,
      handleReset,
      handleEdit,
      handleDelete,
      handlePageChange
    } = useDepartmentTableList(instance, state)

    const {
      handleCreate,
      handleClose,
      handleSubmit,
      changeEmail,
      getUserList,
      getDepartmentList
    } = useAddDepartmentEffect(instance, state, handleQuery)

    return {
      state,
      handleQuery,
      handleReset,
      handleCreate,
      handleEdit,
      handleDelete,
      handlePageChange,
      handleClose,
      handleSubmit,
      changeEmail
    }
  }
}

function useAddDepartmentEffect (instance, state, handleQuery) {
  const handleCreate = () => {
    console.log('ddd')
    state.action = 'create'
    state.showModal = true
  }

  const handleClose = () => {
    console.log('handleClose')
    state.deptForm = {}
    state.showModal = false
    state.deptLeaderEmail = ''
  }

  const handleSubmit = async () => {
    console.log('handleSubmit')
    console.log(state.deptForm)
    console.log('handleSubmit')

    if (state.action === 'create') {
      const { status } = await instance.proxy.$api.addDepartment({
        department_name: state.deptForm.deptName,
        department_leader_id: parseInt(state.deptForm.deptLeaderCode),
        parent_id: parseInt(state.deptForm.parentId)
      })

      if (status === 200) {
        instance.proxy.$message.success('添加成功')
        handleClose()
        handleQuery()
      }
    }
    if (state.action === 'edit') {
      const { status } = await instance.proxy.$api.departmentUpdate({
        department_name: state.deptForm.deptName,
        department_leader_id: parseInt(state.deptForm.deptLeaderCode),
        parent_id: parseInt(state.deptForm.parentId),
        id: parseInt(state.updateDepartmentId)
      })

      if (status === 200) {
        instance.proxy.$message.success('修改成功')
        handleClose()
        handleQuery()
      }
    }
  }
  const changeEmail = (v) => {
    console.log('handleClose')
    console.log(v)

    const arr = v.split('/')
    console.log(arr)

    state.deptForm.deptLeaderCode = arr[0] || ''
    state.deptForm.deptLeaderName = arr[1] || ''
    state.deptLeaderEmail = arr[2] || ''
    console.log('handleClose')
  }

  // 获取用户列表
  const getUserList = async () => {
    try {
      const list = await instance.proxy.$api.getUserList()
      state.userList = list.data.data
    } catch (e) {
      throw new Error(e)
    }
  }

  // 获取部门列表
  const getDepartmentList = async () => {
    try {
      const list = await instance.proxy.$api.getDeptTreeList(0)
      state.departmentList = list.data.data

      console.log('state.departmentList')
      console.log(state.departmentList)
      console.log('state.departmentList')
    } catch (e) {
      throw new Error(e)
    }
  }

  return {
    handleCreate,
    handleClose,
    handleSubmit,
    changeEmail,
    getUserList,
    getDepartmentList
  }
}

function useDepartmentTableList (instance, state) {
  const handleQuery = async () => {
    console.log('dddd')

    const list = await instance.proxy.$api.getDeptList(state.queryForm)
    // state.departmentList = list.data.data
    if (list.status === 200) {
      state.SearchDeptList = list.data.data.list
      state.queryForm.total = list.data.data.total
    }
  }

  const handleReset = () => {
    state.queryForm = {
      department_name: ''
    }
  }

  const handleEdit = async (row) => {
    state.action = 'edit'
    state.showModal = true

    console.log('row')
    console.log(row)
    console.log('row')

    instance.proxy.$nextTick(() => {
      state.deptForm = {
        parentId: row.parent_id,
        deptName: row.department_name,
        deptLeaderCode: row.department_leader_id,
        ID: row.ID,
        deptLeaderName: row.leader_name
      }
      state.deptLeaderEmail = row.leader_email
      state.updateDepartmentId = row.ID
    })
  }
  const handleDelete = async (id) => {
    console.log('row')
    console.log(id)
    console.log('row')

    const { status } = await instance.proxy.$api.deleteDepartment(id)
    // state.departmentList = list.data.data
    if (status === 200) {
      instance.proxy.$message.success('删除成功')
      handleQuery()
    }
    // deleteDepartment
  }

  const handlePageChange = (index) => {
    state.queryForm.page_index = index
    handleQuery()
  }

  return {
    handleQuery,
    handleReset,
    handleEdit,
    handleDelete,
    handlePageChange
  }
}
</script>

<style lang="scss">
.department-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;

    .department-query-form {
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

    .department-table {
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
