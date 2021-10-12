<template>
  <div class="dept-main">
    <div class="dept-query-form">
      <el-form
        ref="queryForm"
        :inline="true"
        :model="queryForm"
        size="mini"
      >
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="queryForm.deptName"
            placeholder="请输入部门名称"
            size="mini"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleQueryDept"
          >
            查询
          </el-button>
          <el-button @click="handleReset('queryForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dept-table">
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
        :data="SearchDeptList"
        row-key="_id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="item in columns"
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
              @click="handleDelete(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="showModal"
      :title="action==='create'?'创建部门':'编辑部门'"
    >
      <el-form
        ref="deptForm"
        :model="deptForm"
        :rules="rules"
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
            v-model="deptForm.parentId"
            placeholder="请选择上级部门"
            :props="{checkStrictly: true,value:'_id',label:'deptName'}"
            clearable
            :show-all-levels="true"
            :options="deptList"
          />
        </el-form-item>
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="deptForm.deptName"
            style="width: 220px"
            placeholder="请输入部门名称"
          />
        </el-form-item>
        <el-form-item
          label="部门负责人"
          prop="deptLeader"
        >
          <el-select
            v-model="deptForm.deptLeader"
            placeholder="请选择部门负责人"
            @change="changeEmail"
          >
            <el-option
              v-for="item in deptLeaderList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="负责人邮箱"
          prop="leaderEmail"
        >
          <el-input
            v-model="deptForm.deptLeaderEmail"
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
import moment from 'moment'
export default {
  name: 'Dept',
  data () {
    return {
      queryForm: {
        deptName: ''
      },
      columns: [
        {
          label: '部门名称',
          prop: 'deptName',
          formatter: ''
        },
        {
          label: '部门负责人',
          prop: 'deptLeaderName',
          formatter: ''
        },

        {
          label: '更新时间',
          prop: 'updateTime',
          formatter: this.formatterTime
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter: this.formatterTime
        }
      ],
      deptList: [],
      SearchDeptList: [],
      pager: {
        pageNum: 1,
        pageSize: 10
      },
      action: '',
      showModal: false,
      deptLeaderList: [],
      deptForm: {
        parentId: [null]
      },
      rules: {
        parentId: [
          {
            required: true,
            message: '请选择上级部门',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {

  },
  mounted () {
    this.getDeptList('search')
    this.getDeptLeaderList()
  },
  methods: {
    handleQueryDept () {
      console.log('handleQueryDept')
      this.getDeptList('search')
    },
    handleReset (form) {
      console.log('handleReset')
      this.$refs[form].resetFields()
    },
    handleCreate () {
      this.action = 'create'
      this.showModal = true
      this.getDeptList(this.action)
    },
    handleEdit (row) {
      this.action = 'edit'
      this.showModal = true
      this.$nextTick(() => {
        console.log('row')
        console.log(row)
        console.log('row')
        Object.assign(this.deptForm, row, {
          deptLeader: `${row.deptLeaderId}/${row.deptLeaderName}/${row.deptLeaderEmail}`,
          parentId: row.parentId
        })
        this.getDeptList(this.action)
      })
    },
    async handleDelete (id) {
      this.action = 'delete'
      const params = { _id: id, action: this.action }
      const res = await this.$api.deptOperate(params)
      if (res) {
        this.$message.success('删除成功')
        this.getDeptList('search')
      }
    },
    // 关闭modal
    handleClose () {
      this.$refs.deptForm.resetFields()
      this.showModal = false
    },
    handleSubmit () {
      console.log(this.deptForm)
      this.$refs.deptForm.validate(async (valid) => {
        if (valid) {
          if (this.deptForm.deptName && this.deptForm.deptLeaderId && this.deptForm.deptLeaderName && this.deptForm.deptLeaderEmail) {
            const params = { ...this.deptForm, action: this.action }
            const res = await this.$api.deptOperate(params)
            if (res) {
              this.$message.success('操作成功')
              this.handleClose()
              this.getDeptList('search')
              this.deptForm = {}
            }
          } else {
            this.$message.error('资料不完整，请先填写完整再提交')
          }
        }
      })
    },
    changeDeptParaentId () {
      this.$refs.parentIdCascader.dropDownVisible = false
    },
    formatterTime (row, column, cellValue, index) {
      const dateFF = row[column.property]
      if (dateFF != null) {
        return moment(dateFF).format('ll')
      } else {
        return ''
      }
    },
    changeEmail (val) {
      console.log('=>', val)
      const [userId, userName, userEmail] = val.split('/')
      // const data = JSON.stringify(this.deptForm)
      //
      // // data.deptLeaderId = userId
      // // data.deptLeaderName = userName
      // // data.deptLeaderEmail = userEmail
      // console.log(data)
      console.log(userName)
      // console.log(data)
      Object.assign(this.deptForm, { deptLeaderId: userId, deptLeaderName: userName, deptLeaderEmail: userEmail })

      console.log('this.deptForm')
      console.log(this.deptForm)
      console.log('this.deptForm')
    },
    async getDeptLeaderList () {
      const { data: { data } } = await this.$api.getDeptLeaderList()
      this.deptLeaderList = data
    },
    async getDeptList (action) {
      const { data: { data } } = await this.$api.getDeptList(Object.assign(this.queryForm, { action: action }))
      if (action === 'search') {
        this.SearchDeptList = data || []
      } else {
        this.deptList = data || []
      }
    }
  }

}
</script>

<style lang="scss">

.dept-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;
    .dept-query-form{
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
    .dept-table{
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
