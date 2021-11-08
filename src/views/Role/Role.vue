<template>
  <div class="role-main">
    <div class="role-query-form">
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
            v-model="state.queryForm.role_name"
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
    <div class="role-table">
      <div class="action">
        <el-button
          type="primary"
          size="small"
          @click="handleRoleFormCreate"
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
      <el-table :data="state.roleList">
        <el-table-column
          v-for="item in state.columns"
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
              size="mini"
              type="primary"
              @click="handleOpenPermission(scope.row)"
            >
              设置权限
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row._id)"
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
        :total="state.pager.total"
        :page-size="state.pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      v-model="state.roleFormShowModal"
      :title="state.action==='create'?'创建角色':'编辑角色'"
    >
      <el-form
        ref="roleForm"
        :model="state.roleFormRoleForm"
        label-width="100px"
        :rules="state.roleFormRules"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="state.roleFormRoleForm.role_name"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input
            v-model="state.roleFormRoleForm.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleRoleFormClose">取 消</el-button>
          <el-button
            type="primary"
            @click="handleRoleFormSubmit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹框-->
    <el-dialog
      v-model="state.permissionShowModal"
      :before-close="permissionCloseModal"
      title="权限设置"
    >
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ state.currentRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="permissionTree"
            :data="state.menuList"
            show-checkbox
            node-key="_id"
            default-expand-all
            :props="{ label: 'menuName' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionCloseModal">取 消</el-button>
          <el-button
            type="primary"
            @click="handlePermissionSubmit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, toRaw } from 'vue'
import moment from 'moment'

export default {
  name: 'Role',
  setup () {
    const instance = getCurrentInstance()
    const state = reactive({
      action: 'create',
      queryForm: {
        role_name: '',
        total: 0,
        page_index: 1,
        page_size: 1
      },
      roleFormShowModal: false,
      roleFormAction: 'create',
      roleFormRoleForm: {
        role_name: '',
        remark: ''
      },
      roleFormRules: {

      },
      roleList: [],
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          label: '角色名称',
          prop: 'roleName'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '权限列表',
          prop: 'permissionList',
          width: 200,
          formatter: (row) => {
            return row.menuList.map(item => item.menuName).join('、')
          }
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
      permissionShowModal: false,
      currentRoleName: '',
      currentRoleId: '',
      menuList: [],
      actionMap: []
    })

    onMounted(() => {
      // getRoleList()
      // getMenuList()
    })
    const { handleRoleFormCreate, handleRoleFormClose, handleRoleFormSubmit } = useAddRoleEffect(state, instance)
    // const { handleOpenPermission, handlePermissionSubmit, permissionCloseModal, getMenuList } = useSetPermission(state, instance)
    const { handleOpenPermission, handlePermissionSubmit, permissionCloseModal } = useSetPermission(state, instance)
    // const { handleQuery, handleReset, handleCurrentChange, getRoleList, handleEdit, handleDel } = useRoleTableEffect(state, instance)
    const { handleQuery, handleReset, handleCurrentChange, handleEdit, handleDel } = useRoleTableEffect(state, instance)

    return { state, handleQuery, handleReset, handleRoleFormCreate, handleRoleFormClose, handleRoleFormSubmit, handleCurrentChange, handleEdit, handleDel, handleOpenPermission, handlePermissionSubmit, permissionCloseModal }
  }
}

function useAddRoleEffect (state, instance) {
  const handleRoleFormCreate = () => {
    state.roleFormShowModal = true
  }

  const handleRoleFormClose = () => {
    state.roleFormShowModal = false
    handleRoleFormReset()
  }
  const handleRoleFormSubmit = async () => {
    const data = state.roleFormRoleForm
    const params = toRaw(state.roleFormRoleForm)
    params.action = state.roleFormAction
    console.log('data')
    console.log(data)
    console.log(params)
    console.log('data')

    await instance.proxy.$api.addRole(params)
    state.roleFormShowModal = false
    handleRoleFormReset()
    instance.proxy.$message.success('添加角色成功')
  }

  const handleRoleFormReset = () => {
    state.roleFormRoleForm = {
      roleName: '',
      remark: ''
    }
  }

  return { handleRoleFormCreate, handleRoleFormClose, handleRoleFormSubmit }
}

function useSetPermission (state, instance) {
  const handleOpenPermission = (row) => {
    state.permissionShowModal = true
    state.currentRoleName = row.roleName
    state.currentRoleId = row._id
    const { checkedKeys } = row.permissionList

    instance.proxy.$nextTick(() => {
      instance.proxy.$refs.permissionTree.setCheckedKeys(checkedKeys)
    })
  }

  const handlePermissionSubmit = async () => {
    const checkedKeys = instance.proxy.$refs.permissionTree.getCheckedKeys()
    console.log('checkedKeys')
    console.log(checkedKeys)
    console.log('checkedKeys')
    const nodes = instance.proxy.$refs.permissionTree.getCheckedNodes()
    const halfKeys = instance.proxy.$refs.permissionTree.getHalfCheckedKeys()
    console.log('nodes')
    console.log(nodes)
    console.log('nodes')
    console.log('halfKeys')
    console.log(halfKeys)
    console.log('halfKeys')

    // const checkedKeysList = []
    // const parentKeysList = []
    // // eslint-disable-next-line array-callback-return
    // nodes.map((node) => {
    //   if (!node.children) {
    //     checkedKeysList.push(node._id)
    //   } else {
    //     parentKeysList.push(node._id)
    //   }
    // })
    //
    // console.log(checkedKeysList)
    // console.log(parentKeysList)

    const params = {
      _id: state.currentRoleId,
      permissionList: {
        // checkedKeys: checkedKeysList,
        checkedKeys
        // halfCheckedKeys: parentKeysList.concat(halfKeys)
      }
    }
    await instance.proxy.$api.updatePermission(params)
    state.permissionShowModal = false
    instance.proxy.$message.success('设置成功')
    // this.getRoleList()
  }

  const permissionCloseModal = () => {
    state.permissionShowModal = false
  }

  const getMenuList = async () => {
    // const { data } = await instance.proxy.$api.getMenuList()
    // console.log('data')
    // console.log(data)
    // console.log('data')
    // state.menuList = data.data
  }

  return { handleOpenPermission, handlePermissionSubmit, permissionCloseModal, getMenuList }
}

function useRoleTableEffect (state, instance) {
  const handleQuery = () => {
    getRoleList()
  }

  const getRoleList = async () => {
    // const params = toRaw(state.queryForm)
    // params.pageIndex = state.pager.pageNum
    // params.pageSize = state.pager.pageSize
    // console.log('userSearch')
    // console.log(params)
    // console.log('userSearch')
    // const list = await instance.proxy.$api.getRoleList(params)
    // state.roleList = list ? list.data.data.list : []
    // getActionMap(list.data.data.list)
    // state.pager.total = list.data.data.page.total
  }

  // const getActionMap = (list) => {
  //   const actionMap = {}
  //   const deep = (arr) => {
  //     while (arr.length) {
  //       const item = arr.pop()
  //       if (item.children && item.action) {
  //         actionMap[item._id] = item.menuName
  //       }
  //       if (item.children && !item.action) {
  //         deep(item.children)
  //       }
  //     }
  //   }
  //   deep(JSON.parse(JSON.stringify(list)))
  //
  //   console.log('actionMap')
  //   console.log(actionMap)
  //   console.log('actionMap')
  //   state.actionMap = actionMap
  // }

  const handleCurrentChange = () => {
    console.log('dddd')
    console.log(state.pager)
  }

  const handleReset = () => {
    console.log('handleReset')

    state.queryForm = {
      ...state.queryForm,
      role_name: ''
    }
  }

  const handleEdit = (row) => {
    state.roleFormAction = 'edit'
    state.roleFormShowModal = true

    instance.proxy.$nextTick(() => {
      state.roleFormRoleForm = {
        _id: row._id,
        roleName: row.roleName,
        remark: row.remark
      }
    })
  }

  const handleDel = async (_id) => {
    await instance.proxy.$api.roleOperate({ _id, action: 'delete' })
    instance.proxy.$message.success('删除成功')
    getRoleList()
  }
  return { handleQuery, handleReset, handleCurrentChange, getRoleList, handleEdit, handleDel }
}
</script>

<style lang="scss">
.role-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;
    .role-query-form{
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
    .role-table{
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
