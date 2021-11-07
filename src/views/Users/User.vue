<template>
  <div class="user-main">
    <div class="user-query-form">
      <el-form
        ref="form"
        :inline="true"
        :model="UserTableState.userSearch"
        size="mini"
      >
        <el-form-item
          label="用户ID"
          prop="userId"
        >
          <el-input
            v-model="UserTableState.userSearch.userId"
            placeholder="请输入用户ID"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="用户名称"
          prop="userName"
        >
          <el-input
            v-model="UserTableState.userSearch.userName"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="state"
        >
          <el-select
            v-model="UserTableState.userSearch.state"
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
          <el-button @click="handleReset('form')">
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
        :data="UserTableState.userTableList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="item in UserTableState.userTableColumns"
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
        :total="UserTableState.pager.total"
        :page-size="UserTableState.pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="userAddState.showModal"
      title="用户新增"
    >
      <el-form
        :ref="userAddState.userAddStateRef"
        :model="userAddState.userForm"
        :rules="userAddState.rules"
        label-width="300px"
        label-position="right"
        style="display: flex;flex-flow: column nowrap; justify-content: start;align-items: start;"
      >
        <el-form-item
          label="用户名"
          prop="userName"
        >
          <el-input
            v-model="userAddState.userForm.userName"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item
          label="用户邮箱"
          prop="userEmail"
        >
          <el-input
            v-model="userAddState.userForm.userEmail"
            placeholder="请输入用户邮箱"
          />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
        >
          <el-input
            v-model="userAddState.userForm.mobile"
            placeholder="请输入用户手机号"
          />
        </el-form-item>
        <el-form-item
          label="岗位"
          prop="job"
        >
          <el-input
            v-model="userAddState.userForm.job"
            placeholder="请输入岗位名称"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="state"
        >
          <el-select v-model="userAddState.userForm.state">
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
        <el-form-item
          label="系统角色"
          prop="roleList"
        >
          <el-select
            v-model="userAddState.userForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="role in userAddState.roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门"
          prop="deptId"
        >
          <el-cascader
            v-model="userAddState.userForm.deptId"
            placeholder="请选择所属部门"
            :options="userAddState.deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
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

    const handleSelectionChange = () => {

    }

    const { userAddState, handleCreate, handleReset, handleClose, handleSubmit, handleEdit } = userAddUserEffect(instance)
    const { UserTableState, handleQuery, handleCurrentChange, handleDelete } = userUserTableList(instance)

    onMounted(() => {
      handleQuery()
    })

    return {
      UserTableState, userAddState, handleCurrentChange, handleDelete, handleCreate, handleSelectionChange, handleQuery, handleReset, handleClose, handleSubmit, handleEdit
    }
  }

}

function userAddUserEffect (instance) {
  const userAddState = reactive({
    action: '',
    showModal: false,
    userForm: {
      userName: '',
      userEmail: '',
      mobile: '',
      job: '',
      state: '',
      roleList: '',
      deptId: ''
    },
    userAddStateRef: 'userAddStateRef',
    rules: {
      userName: [
        { required: true, message: '请输入用户名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      userEmail: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
      mobile: [{ required: true, message: '请输入用户手机号', trigger: 'blur' }],
      job: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
      state: [{ required: true, message: '请选择在职状态', trigger: 'change' }],
      deptId: [{ required: true, message: '请选择所在部门', trigger: 'change' }]
      // desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
    },
    deptList: [],
    roleList: []
  })

  // handleCreate
  const handleCreate = () => {
    userAddState.action = 'create'
    userAddState.showModal = true
    // 获取部门列表
    getDeptList()
    // 获取角色列表
    getRoleAllList()
  }

  const handleReset = () => {
    userAddState.userForm = {
      userName: '',
      userEmail: '',
      mobile: '',
      job: '',
      state: '',
      roleList: '',
      deptId: ''
    }
  }

  const getDeptList = async () => {
    const list = await instance.proxy.$api.getDeptList(userAddState.action)
    // const list = await api.getDeptList(userAddState.action)
    console.log('list')
    console.log(list)
    console.log('list')
    userAddState.deptList = list.data.data
  }

  // 角色列表查询
  const getRoleAllList = async () => {
    const list = await instance.proxy.$api.getRoleAllList()
    console.log('list')
    console.log(list)
    console.log('list')
    userAddState.roleList = list.data.data
  }

  // 关闭modal
  const handleClose = () => {
    userAddState.userForm = {
      userName: '',
      userEmail: '',
      mobile: '',
      job: '',
      state: '',
      roleList: '',
      deptId: ''
    }
    userAddState.showModal = false
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
        const params = toRaw(userAddState.userForm)
        console.log('params')
        console.log(params)
        console.log('params')
        // params.userEmail += '@imooc.com'
        params.action = userAddState.action
        await instance.proxy.$api.userSubmit(params)
        userAddState.showModal = false
        instance.proxy.$message.success('用户创建成功')
        // handleReset("dialogForm");
        handleReset()
        // instance.proxy.$message.success('操作成功')
      }
    })
  }

  // 编辑用户数据
  const handleEdit = (index, row) => {
    console.log('index')
    console.log(index)
    console.log(row)
    console.log(row)
    console.log(row)
    console.log('index')
    userAddState.action = 'edit'
    userAddState.showModal = true
    // 获取部门列表
    getDeptList()
    // 获取角色列表
    getRoleAllList()
    instance.proxy.$nextTick(() => {
      Object.assign(userAddState.userForm, row)
    })
  }

  return { userAddState, handleCreate, handleReset, handleClose, handleSubmit, handleEdit }
}

function userUserTableList (instance) {
  const UserTableState = reactive({
    userSearch: {
      userId: '',
      userName: '',
      state: ''
    },
    // 用户列表
    userTableList: [
      {
        state: 1,
        role: '0',
        roleList: [
          '1',
          '2',
          '3'
        ],
        deptId: [
          '1', '2'
        ],
        userId: 1000002,
        userName: 'admin',
        userEmail: 'admin@11.com',
        createTime: '2021-01-17T13:32:06.381Z',
        lastLoginTime: '2021-01-17T13:32:06.381Z',
        __v: 0,
        // job: '前端开发',
        mobile: '1111111'
      }
    ],
    pager: {
      pageNum: 1,
      pageSize: 1,
      total: 100
    },
    // 定义动态表格-格式
    userTableColumns: [
      {
        label: '用户ID',
        prop: 'userId',
        formatter: (row) => {
          return row.userId
        }
      },
      {
        label: '用户名',
        prop: 'userName',
        formatter: (row) => {
          return row.userName
        }
      },
      {
        label: '用户邮箱',
        prop: 'userEmail',
        formatter: (row) => {
          return row.userEmail
        }
      },
      {
        label: '用户角色',
        prop: 'role',
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

  onMounted(() => {
    console.log('init....')
  })

  // 查询
  const handleQuery = () => {
    getUserList()
    // const params = toRaw(UserTableState.userSearch)
    // params.pageIndex = UserTableState.pager.pageNum
    // params.pageSize = UserTableState.pager.pageSize
    // console.log('userSearch')
    // console.log(params)
    // console.log('userSearch')
    // const list = await instance.proxy.$api.getUserList(params)
    // UserTableState.userTableList = list.data.data.list
    // UserTableState.pager.total = list.data.data.page.total
  }

  const getUserList = async () => {
    const params = toRaw(UserTableState.userSearch)
    params.pageIndex = UserTableState.pager.pageNum
    params.pageSize = UserTableState.pager.pageSize
    console.log('userSearch')
    console.log(params)
    console.log('userSearch')
    const list = await instance.proxy.$api.getUserList(params)
    UserTableState.userTableList = list.data.data.list
    UserTableState.pager.total = list.data.data.page.total
  }

  // 分页事件处理
  const handleCurrentChange = async (current) => {
    UserTableState.pager.pageNum = current

    console.log('UserTableState.pager.pageNum')
    console.log(UserTableState.pager.pageNum)
    console.log('UserTableState.pager.pageNum')

    const params = toRaw(UserTableState.userSearch)
    params.pageIndex = current
    params.pageSize = UserTableState.pager.pageSize
    console.log('userSearch')
    console.log(params)

    console.log('userSearch')
    const list = await instance.proxy.$api.getUserList(params)
    UserTableState.userTableList = list.data.data.list
    UserTableState.pager.total = list.data.data.page.total
    // getUserList()
  }

  const handleDelete = async (index, row) => {
    console.log('row')
    console.log(row)
    console.log('row')
    await instance.proxy.$api.userDel({
      userIds: [row.userId] // 可单个删除，也可批量删除
    })
    instance.proxy.$message.success('删除成功')
    getUserList()
  }

  return { UserTableState, handleQuery, handleCurrentChange, handleDelete }
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
