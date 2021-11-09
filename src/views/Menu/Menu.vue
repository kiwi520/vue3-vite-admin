<template>
  <div class="menu-main">
    <div class="menu-query-form">
      <el-form
        ref="queryForm"
        :inline="true"
        :model="stateData.queryForm"
        size="mini"
      >
        <el-form-item
          label="菜单名称"
          prop="menuName"
        >
          <el-input
            v-model="stateData.queryForm.name"
            placeholder="请输入菜单名称"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="state"
        >
          <el-select
            v-model="stateData.queryForm.state"
            placeholder="请选择"
          >
            <el-option
              :value="0"
              label="请选择"
            />
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
        :data="stateData.menuList"
        row-key="_id"
        @selection-change="handleSelectionChange"
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
        :model="stateData.menuForm"
        label-width="100px"
        :rules="stateData.addMenuRules"
      >
        <!--        <el-form-item-->
        <!--          label="父级菜单"-->
        <!--          prop="parent_id"-->
        <!--        >-->
        <!--          <el-cascader-->
        <!--            v-model="stateData.menuForm.parent_id"-->
        <!--            :options="stateData.menuList"-->
        <!--            :props="{ checkStrictly: true, value: 'id', label: 'name' }"-->
        <!--            clearable-->
        <!--          />-->
        <!--          <span>不选，则直接创建一级菜单</span>-->
        <!--        </el-form-item>-->
        <el-form-item
          label="菜单类型"
          prop="menuType"
        >
          <el-radio-group v-model="stateData.menuForm.type">
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
            v-model="stateData.menuForm.name"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          v-show="stateData.menuForm.type == 1"
          label="菜单图标"
          prop="icon"
        >
          <el-input
            v-model="stateData.menuForm.icon"
            placeholder="请输入岗位"
          />
        </el-form-item>
        <el-form-item
          v-show="stateData.menuForm.type == 1"
          label="路由地址"
          prop="path"
        >
          <el-input
            v-model="stateData.menuForm.path"
            placeholder="请输入路由地址"
          />
        </el-form-item>
        <el-form-item
          v-show="stateData.menuForm.type == 2"
          label="权限标识"
          prop="menuCode"
        >
          <el-input
            v-model="stateData.menuForm.code"
            placeholder="请输入权限标识"
          />
        </el-form-item>
        <el-form-item
          v-show="stateData.menuForm.type == 1"
          label="组件路径"
          prop="component"
        >
          <el-input
            v-model="stateData.menuForm.component"
            placeholder="请输入组件路径"
          />
        </el-form-item>
        <el-form-item
          v-show="stateData.menuForm.type == 1"
          label="菜单状态"
          prop="menuState"
        >
          <el-radio-group v-model="stateData.menuForm.state">
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
    const stateData = reactive({
      action: 'create',
      queryForm: {
        name: '',
        state: 0,
        total: 0,
        page_index: 1,
        page_size: 1
      },
      SearchMenuList: [],
      columns: [
        {
          label: '菜单名称',
          prop: 'name',
          width: 150
        },
        {
          label: '图标',
          prop: 'icon'
        },
        {
          label: '菜单类型',
          prop: 'type',
          formatter (row, column, value) {
            return {
              1: '菜单',
              2: '按钮'
            }[value]
          }
        },
        {
          label: '权限标识',
          prop: 'code'
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
          prop: 'state',
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
        parent_id: 0,
        name: '',
        type: 1,
        state: 1,
        icon: '',
        path: '',
        code: '',
        component: ''
      },
      showModal: false,
      addMenuRules: {
        name: [
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

    const {
      handleCurrentChange,
      handleQueryMenu,
      handleReset,
      handleSelectionChange,
      handleDelete,
      getMenuList
    } = useMenuTableList(stateData, instance)
    const {
      handleClose,
      handleSubmit,
      handleCreate,
      handleEdit,
      handleAdd
    } = useAddMenu(stateData, instance)

    onMounted(() => {
      getMenuList()
    })
    return {
      stateData,
      handleSelectionChange,
      handleDelete,
      handleQueryMenu,
      handleCurrentChange,
      handleReset,
      handleClose,
      handleSubmit,
      handleCreate,
      handleEdit,
      handleAdd
    }
  }

}

function useAddMenu (stateData, instance) {
  const handleCreate = async () => {
    stateData.showModal = true
    stateData.action = 'create'
    console.log('stateData.showModal')
    //
    // const list = await instance.proxy.$api.getMenuList(stateData.queryForm)
    // stateData.menuList = list.data.data
  }
  const handleSubmit = () => {
    console.log('stateData.menuForm')
    console.log(stateData.menuForm)
    console.log('stateData.menuForm')
    instance.proxy.$refs.menuForm.validate(async (valid) => {
      if (valid) {
        const params = toRaw(stateData.menuForm)
        params.action = stateData.action

        if (stateData.action === 'create') {
          await instance.proxy.$api.addMenu(params)
          stateData.showModal = false
          instance.proxy.$message.success('操作成功')
          stateData.menuForm = {
            parent_id: 0,
            name: '',
            type: 1,
            state: 1,
            icon: '',
            path: '',
            code: '',
            component: ''
          }
          // this.getMenuList()
        } else if (stateData.action === 'edit') {
          await instance.proxy.$api.updateMenu(params)
          stateData.showModal = false
          instance.proxy.$message.success('操作成功')
          stateData.menuForm = {
            parent_id: 0,
            name: '',
            type: 1,
            state: 1,
            icon: '',
            path: '',
            code: '',
            component: ''
          }
          // this.getMenuList()
        }
      }
    })
  }

  const handleClose = () => {
    stateData.showModal = false
    stateData.action = false
    stateData.menuForm = {
      parent_id: 0,
      name: '',
      type: 1,
      state: 1,
      icon: '',
      path: '',
      code: '',
      component: ''
    }
  }

  const handleAdd = (row) => {
    stateData.showModal = true
    stateData.action = 'create'
    stateData.menuForm = {
      ...stateData.menuForm,
      parent_id: row.ID
    }
  }
  const handleEdit = (row) => {
    stateData.showModal = true
    stateData.action = 'edit'
    instance.proxy.$nextTick(() => {
      Object.assign(stateData.menuForm, row, {
        id: row.ID
      })
    })
  }

  return {
    handleClose,
    handleSubmit,
    handleCreate,
    handleEdit,
    handleAdd
  }
}

function useMenuTableList (stateData, instance) {
  const handleSelectionChange = () => {

  }

  const handleQueryMenu = () => {
    getMenuList()
  }
  const handleDelete = async (id) => {
    await instance.proxy.$api.deleteMenu(id)
    instance.proxy.$message.success('删除成功')
    getMenuList()
  }

  const handleCurrentChange = (current) => {
    stateData.queryForm.page_index = current
    getMenuList()
  }

  const handleReset = () => {
    stateData.queryForm = {
      ...stateData.queryForm,
      name: '',
      state: 0
    }
  }

  // 菜单列表初始化
  const getMenuList = async () => {
    try {
      const list = await instance.proxy.$api.getMenuList(stateData.queryForm)
      stateData.menuList = list.data.data.list
      stateData.queryForm.total = list.data.data.total
    } catch (e) {
      throw new Error(e)
    }
  }

  return {
    handleCurrentChange,
    handleQueryMenu,
    handleReset,
    handleSelectionChange,
    handleDelete,
    getMenuList
  }
}
</script>

<style lang="scss">

.menu-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;

    .menu-query-form {
        width: 100%;
        height: 41px;
        background-color: white;
        margin-bottom: 20px;
        //border: 1px solid red;
        padding: 5px;

        ::v-deep(.el-input__inner) {
            color: rebeccapurple;
        }
    }

    .menu-table {
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
