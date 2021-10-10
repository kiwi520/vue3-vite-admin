<template>
  <div class="user-main">
    <div class="user-query-form">
      <el-form
        ref="form"
        :inline="true"
        :model="user"
        size="mini"
      >
        <el-form-item
          label="用户ID"
          prop="userId"
        >
          <el-input
            v-model="user.userId"
            placeholder="请输入用户ID"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="用户名称"
          prop="userName"
        >
          <el-input
            v-model="user.userName"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="state"
        >
          <el-select
            v-model="user.state"
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
        <el-button
          type="danger"
          size="small"
          @click="handlePatchDel"
        >
          批量删除
        </el-button>
      </div>
      <el-table
        :data="userList"
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
    </div>
      <el-dialog>
          <el-form :model="userForm">
              <el-form-item label="用户名" prop="userName">
                  <el-input v-model="userForm.userName" placeholder="请输入用户名称"></el-input>
              </el-form-item>
              <el-form-item label="用户邮箱" prop="userEmail">
                  <el-input v-model="userForm.userEmail" placeholder="请输入用户邮箱"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="userForm.mobile" placeholder="请输入用户手机号"></el-input>
              </el-form-item>
              <el-form-item label="岗位" prop="mobile">
                  <el-input v-model="userForm.userName" placeholder="请输入岗位名称"></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                  <el-select v-model="userForm.state">
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
              <el-form-item label="系统角色" prop="role">
                  <el-cascader
                          :options="options"
                          :props="{ checkStrictly: true }"
                          clearable
                  />
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="userForm.userName" placeholder="请输入用户名称"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="userForm.userName" placeholder="请输入用户名称"></el-input>
              </el-form-item>
          </el-form>
      </el-dialog>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'

export default {
  name: 'User',
  setup () {
    const user = ref({})
    const userList = ref([
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
    ])
    // 定义动态表格-格式
    const columns = reactive([
      {
        label: '用户ID',
        prop: 'userId'
      },
      {
        label: '用户名',
        prop: 'userName'
      },
      {
        label: '用户邮箱',
        prop: 'userEmail'
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
        formatter: (row, column, value) => {
          // return utils.formateDate(new Date(value))
        }
      },
      {
        label: '最后登录时间',
        prop: 'lastLoginTime',
        width: 180,
        formatter: (row, column, value) => {
          // return utils.formateDate(new Date(value))
        }
      }
    ])
    onMounted(() => {
      console.log('init....')
    })
    return {
      user, userList, columns
    }
  }
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
