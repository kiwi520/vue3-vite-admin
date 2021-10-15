<template>
  <div class="menu-main">
    <div class="menu-query-form">
      <el-form
        ref="queryForm"
        :inline="true"
        :model="state.queryForm"
        size="mini"
      >
        <el-form-item
          label="菜单名称"
          prop="deptName"
        >
          <el-input
            v-model="state.queryForm.menuName"
            placeholder="请输入菜单名称"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="state"
        >
          <el-select
            v-model="state.queryForm.menuState"
            placeholder="请选择"
          >
            <el-option
              :value="1"
              label="正常"
            />
            <el-option
              :value="2"
              label="停用"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleQueryMenu"
            >
              查询
            </el-button>
            <el-button @click="handleReset">
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="menu-table">
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
        :data="state.menuList"
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
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleAdd(scope.row)"
            >
              新增子菜单/按钮
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
              @click="handleDelete(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="state.showModal"
      title="用户新增"
      :before-close="handleClose"
    >
      <el-form
        ref="menuForm"
        :model="state.menuForm"
        label-width="100px"
        :rules="state.addMenuRules"
      >
        <el-form-item
          label="父级菜单"
          prop="parentId"
        >
          <el-cascader
            v-model="state.menuForm.parentId"
            :options="state.menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item
          label="菜单类型"
          prop="menuType"
        >
          <el-radio-group v-model="state.menuForm.menuType">
            <el-radio :label="1">
              菜单
            </el-radio>
            <el-radio :label="2">
              按钮
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="菜单名称"
          prop="menuName"
        >
          <el-input
            v-model="state.menuForm.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          v-show="state.menuForm.menuType == 1"
          label="菜单图标"
          prop="icon"
        >
          <el-input
            v-model="state.menuForm.icon"
            placeholder="请输入岗位"
          />
        </el-form-item>
        <el-form-item
          v-show="state.menuForm.menuType == 1"
          label="路由地址"
          prop="path"
        >
          <el-input
            v-model="state.menuForm.path"
            placeholder="请输入路由地址"
          />
        </el-form-item>
        <el-form-item
          v-show="state.menuForm.menuType == 2"
          label="权限标识"
          prop="menuCode"
        >
          <el-input
            v-model="state.menuForm.menuCode"
            placeholder="请输入权限标识"
          />
        </el-form-item>
        <el-form-item
          v-show="state.menuForm.menuType == 1"
          label="组件路径"
          prop="component"
        >
          <el-input
            v-model="state.menuForm.component"
            placeholder="请输入组件路径"
          />
        </el-form-item>
        <el-form-item
          v-show="state.menuForm.menuType == 1"
          label="菜单状态"
          prop="menuState"
        >
          <el-radio-group v-model="state.menuForm.menuState">
            <el-radio :label="1">
              正常
            </el-radio>
            <el-radio :label="2">
              停用
            </el-radio>
          </el-radio-group>
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
import { getCurrentInstance, onMounted, reactive, toRaw } from 'vue'
import moment from 'moment'

export default {
  name: 'Menu',
  setup () {
    const instance = getCurrentInstance()
    const state = reactive({
      queryForm: {
        menuName: '',
        menuState: ''
      },
      SearchMenuList: [],
      columns: [
        {
          label: '菜单名称',
          prop: 'menuName',
          width: 150
        },
        {
          label: '图标',
          prop: 'icon'
        },
        {
          label: '菜单类型',
          prop: 'menuType',
          formatter (row, column, value) {
            return {
              1: '菜单',
              2: '按钮'
            }[value]
          }
        },
        {
          label: '权限标识',
          prop: 'menuCode'
        },
        {
          label: '路由地址',
          prop: 'path'
        },
        {
          label: '组件路径',
          prop: 'component'
        },
        {
          label: '菜单状态',
          prop: 'menuState',
          width: 90,
          formatter (row, column, value) {
            return {
              1: '正常',
              2: '停用'
            }[value]
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
      menuForm: {
        parentId: [null],
        menuName: '',
        menuType: 1,
        menuState: 1,
        icon: '',
        path: '',
        menuCode: '',
        component: ''
      },
      showModal: false,
      addMenuRules: {
        menuName: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在2-8个字符',
            trigger: 'blur'
          }
        ]
      },
      menuList: []
    })

    const { handleQueryMenu, handleReset, handleSelectionChange, handleDelete, getMenuList } = useMenuTableList(state, instance)
    const { handleClose, handleSubmit, handleCreate, handleEdit, handleAdd } = useAddMenu(state, instance)

    onMounted(() => {
      getMenuList()
    })
    return { state, handleSelectionChange, handleDelete, handleQueryMenu, handleReset, handleClose, handleSubmit, handleCreate, handleEdit, handleAdd }
  }

}

function useAddMenu (state, instance) {
  const handleCreate = async () => {
    state.showModal = true
    state.action = 'create'

    const list = await instance.proxy.$api.getMenuList(state.queryForm)
    state.menuList = list.data.data
  }
  const handleSubmit = () => {
    console.log('state.menuForm')
    console.log(state.menuForm)
    console.log('state.menuForm')
    instance.proxy.$refs.menuForm.validate(async (valid) => {
      if (valid) {
        const params = toRaw(state.menuForm)
        params.action = state.action
        await instance.proxy.$api.menuSubmit(params)
        state.showModal = false
        instance.proxy.$message.success('操作成功')
        state.menuForm = {
          parentId: [null],
          menuName: '',
          menuType: 1,
          menuState: 1,
          icon: '',
          path: '',
          menuCode: '',
          component: ''
        }
        // this.getMenuList()
      }
    })
  }

  const handleClose = () => {
    state.showModal = false
    state.action = false
    state.menuForm = {
      parentId: [null],
      menuName: '',
      menuType: 1,
      menuState: 1,
      icon: '',
      path: '',
      menuCode: '',
      component: ''
    }
  }

  const handleAdd = (row) => {
    state.showModal = true
    state.action = 'create'
    state.menuForm.parentId = [...row.parentId, row._id].filter(
      (item) => item
    )
    // state.showModal = true
    // state.action = 'edit'
    // instance.proxy.$nextTick(() => {
    //   Object.assign(state.menuForm, row)
    // })
  }
  const handleEdit = (row) => {
    state.showModal = true
    state.action = 'edit'
    instance.proxy.$nextTick(() => {
      Object.assign(state.menuForm, row)
    })
  }

  return { handleClose, handleSubmit, handleCreate, handleEdit, handleAdd }
}

function useMenuTableList (state, instance) {
  const handleSelectionChange = () => {

  }

  const handleQueryMenu = () => {
    getMenuList()
  }
  const handleDelete = async (_id) => {
    await instance.proxy.$api.menuSubmit({ _id, action: 'delete' })
    instance.proxy.$message.success('删除成功')
    getMenuList()
  }

  const handleReset = () => {
    state.queryForm = {
      menuName: '',
      state: ''
    }
  }

  // 菜单列表初始化
  const getMenuList = async () => {
    try {
      const list = await instance.proxy.$api.getMenuList(state.queryForm)
      state.menuList = list.data.data
    } catch (e) {
      throw new Error(e)
    }
  }

  return { handleQueryMenu, handleReset, handleSelectionChange, handleDelete, getMenuList }
}
</script>

<style lang="scss">
.menu-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;
    .menu-query-form{
        width: 100%;
        height: 41px;
        background-color: white;
        margin-bottom: 20px;
        //border: 1px solid red;
        padding: 5px;
    }

    .menu-table{
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
