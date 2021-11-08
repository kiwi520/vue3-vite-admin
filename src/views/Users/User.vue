<template>
  <div class="user-main">
    <div class="user-query-form">
      <el-form
        ref="form"
        :inline="true"
        :model="stateData.userSearch"
        size="mini"
      >
        <el-form-item
          label="用户ID"
          prop="id"
        >
          <el-input
            v-model="stateData.userSearch.id"
            type="number"
            placeholder="请输入用户ID"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="用户名称"
          prop="userName"
        >
          <el-input
            v-model="stateData.userSearch.name"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="state"
        >
          <el-select
            v-model="stateData.userSearch.state"
            placeholder="请选择"
          >
            <el-option
              :value="0"
              label="所有"
            />
            <el-option
              :value="1"
              label="在职"
            />
            <el-option
              :value="2"
              label="离职"
            />
            <el-option
              :value="3"
              label="试用期"
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
    <div class="user-table">
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
        :data="stateData.userTableList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="item in stateData.userTableColumns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
        :total="stateData.userSearch.total"
        :page-size="stateData.userSearch.page_size"
        :current-page="stateData.userSearch.page_index"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="stateData.showModal"
      :before-close="handleClose"
      :title="stateData.action==='create'?'创建部门':'编辑部门'"
    >
      <el-form
        :ref="stateData.userAddStateRef"
        :model="stateData.userForm"
        :rules="stateData.rules"
        label-width="300px"
        label-position="right"
        style="display: flex;flex-flow: column nowrap; justify-content: start;align-items: start;"
      >
        <el-form-item
          label="用户名"
          prop="userName"
        >
          <el-input
            v-model="stateData.userForm.name"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item
          label="用户邮箱"
          prop="userEmail"
        >
          <el-input
            v-model="stateData.userForm.email"
            placeholder="请输入用户邮箱"
          />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
        >
          <el-input
            v-model="stateData.userForm.mobile"
            placeholder="请输入用户手机号"
          />
        </el-form-item>
        <el-form-item
          label="岗位"
          prop="job"
        >
          <el-input
            v-model="stateData.userForm.job"
            placeholder="请输入岗位名称"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="state"
        >
          <el-select v-model="stateData.userForm.state">
            <el-option
              :value="1"
              label="在职"
            />
            <el-option
              :value="2"
              label="离职"
            />
            <el-option
              :value="3"
              label="试用期"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item-->
        <!--          label="系统角色"-->
        <!--          prop="roleList"-->
        <!--        >-->
        <!--          <el-select-->
        <!--            v-model="stateData.userForm.role_id"-->
        <!--            placeholder="请选择用户系统角色"-->
        <!--            multiple-->
        <!--            style="width: 100%"-->
        <!--          >-->
        <!--            <el-option-->
        <!--              v-for="role in userAddstateData.roleList"-->
        <!--              :key="role._id"-->
        <!--              :label="role.roleName"-->
        <!--              :value="role._id"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item
          label="部门"
          prop="department_id"
        >
          <el-cascader
            v-model="stateData.userForm.department_id"
            placeholder="请选择所属部门"
            :options="stateData.deptList"
            :props="{ checkStrictly: true,emitPath:false, value: 'id', label: 'department_name' }"
            clearable
            style="width: 100%"
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
import { getCurrentInstance, onMounted, reactive, toRaw } from 'vue'
import moment from 'moment'

export default {
  name: 'User',
  setup () {
    //   获取Composition API 上下文对象
    const instance = getCurrentInstance()

    const stateData = reactive({
      action: 'create',
      showModal: false,
      userForm: {
        name: '',
        email: '',
        mobile: '',
        job: '',
        state: '',
        role_id: '',
        department_id: '',
        remark: '',
        password: '123456'
      },
      userAddStateRef: 'userAddStateRef',
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入用户手机号', trigger: 'blur' }],
        job: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
        state: [{ required: true, message: '请选择在职状态', trigger: 'change' }]
        // deptId: [{ required: true, message: '请选择所在部门', trigger: 'change' }]
        // desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      deptList: [],
      roleList: [],
      userSearch: {
        id: 0,
        name: '',
        state: 0,
        total: 0,
        page_index: 1,
        page_size: 1
      },
      // 用户列表
      userTableList: [
        {
          state: 1,
          role: '0',
          role_id: 1,
          department_id: 11,
          id: 1000002,
          name: 'admin',
          email: 'admin@11.com',
          createTime: '2021-01-17T13:32:06.381Z',
          lastLoginTime: '2021-01-17T13:32:06.381Z',
          __v: 0,
          // job: '前端开发',
          mobile: '1111111'
        }
      ],
      // 定义动态表格-格式
      userTableColumns: [
        {
          label: '用户ID',
          prop: 'id',
          formatter: (row) => {
            return row.ID
          }
        },
        {
          label: '用户名',
          prop: 'name',
          formatter: (row) => {
            return row.name
          }
        },
        {
          label: '用户邮箱',
          prop: 'email',
          formatter: (row) => {
            return row.email
          }
        },
        {
          label: '用户角色',
          prop: 'role_id',
          formatter (row, column, value) {
            return {
              0: '管理员',
              1: '普通用户'
            }[value]
          }
        },
        {
          label: '用户状态',
          prop: 'state',
          formatter (row, column, value) {
            return {
              1: '在职',
              2: '离职',
              3: '试用期'
            }[value]
          }
        },
        {
          label: '注册时间',
          prop: 'createTime',
          width: 180,
          formatter: (row) => {
            return moment(row.createTime).format('ll')
          }
        },
        {
          label: '最后登录时间',
          prop: 'lastLoginTime',
          width: 180,
          formatter: (row) => {
            return moment(row.lastLoginTime).format('ll')
          }
        }
      ]
    })

    const handleSelectionChange = () => {

    }

    const { handleCreate, handleReset, handleClose, handleSubmit, handleEdit } = userAddUserEffect(instance, stateData)
    const { handleQuery, handleCurrentChange, handleDelete } = userUserTableList(instance, stateData)

    onMounted(() => {
      handleQuery()
    })

    return {
      stateData, handleCurrentChange, handleDelete, handleCreate, handleSelectionChange, handleQuery, handleReset, handleClose, handleSubmit, handleEdit
    }
  }

}

function userAddUserEffect (instance, stateData) {
  // handleCreate
  const handleCreate = () => {
    stateData.action = 'create'
    stateData.showModal = true
    // 获取部门列表
    getDeptList()
    // 获取角色列表
    getRoleAllList()
  }

  const handleReset = () => {
    stateData.userSearch = {
      ...stateData.userSearch,
      id: '',
      name: '',
      state: ''
    }
  }

  const getDeptList = async () => {
    const list = await instance.proxy.$api.getDeptTreeList(0)
    stateData.deptList = list.data.data
  }

  // 角色列表查询
  const getRoleAllList = async () => {
    // const list = await instance.proxy.$api.getRoleAllList()
    // console.log('list')
    // console.log(list)
    // console.log('list')
    // stateData.roleList = list.data.data
  }

  // 关闭modal
  const handleClose = () => {
    stateData.userForm = {
      userName: '',
      userEmail: '',
      mobile: '',
      job: '',
      state: '',
      role_id: 0,
      department_id: 0,
      remark: ''
    }
    stateData.showModal = false
  }

  // 提交代码
  const handleSubmit = () => {
    instance.proxy.$refs.userAddStateRef.validate(async valid => {
      console.log(valid)
      if (!valid) {
        // ElMessage.error('资料不完整，请先填写完整再提交')
        instance.proxy.$message.error('资料不完整，请先填写完整再提交')
        return false
      } else {
        const params = toRaw(stateData.userForm)
        // params.userEmail += '@imooc.com'
        params.gender = params.gender || 1
        params.role_id = params.role_id || 1
        params.password = params.password || '123456'

        if (stateData.action === 'create') {
          await instance.proxy.$api.userSubmit(params)
          stateData.showModal = false
          handleReset()
          instance.proxy.$message.success('用户创建成功')
        } else if (stateData.action === 'edit') {
          params.id = params.ID
          params.remark = params.remark || ''
          await instance.proxy.$api.adminUserUpdate(params)
          stateData.showModal = false
          handleReset()
          instance.proxy.$message.success('用户修改成功')
        }
      }
    })
  }

  // 编辑用户数据
  const handleEdit = (index, row) => {
    stateData.action = 'edit'
    stateData.showModal = true
    // 获取部门列表
    getDeptList()
    // 获取角色列表
    getRoleAllList()
    instance.proxy.$nextTick(() => {
      Object.assign(stateData.userForm, row)
    })
  }

  return { handleCreate, handleReset, handleClose, handleSubmit, handleEdit }
}

function userUserTableList (instance, stateData) {
  // 查询
  const handleQuery = () => {
    getUserList()
  }

  const getUserList = async () => {
    const params = toRaw(stateData.userSearch)
    const list = await instance.proxy.$api.getAdminUserList(params)
    stateData.userTableList = list.data.data.list
    stateData.userSearch.total = list.data.data.total
  }

  // 分页事件处理
  const handleCurrentChange = async (current) => {
    stateData.userSearch.page_index = current
    getUserList()
  }

  const handleDelete = async (index, row) => {
    await instance.proxy.$api.adminDel(row.ID)
    instance.proxy.$message.success('删除成功')
    getUserList()
  }

  return { handleQuery, handleCurrentChange, handleDelete }
}
</script>

<style lang="scss">

.user-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;
    .user-query-form{
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
    .user-table{
        height: 100%;
        width: 100%;
        background-color: white;
        border: 1px saddlebrown solid;
        .action {
            border-radius: 5px;
            background: #ffffff;
            padding: 10px;
            border-bottom: 1px solid #ece8e8;
        }
    }
}
</style>
