<template>
  <div class="article-main">
    <div class="article-query-form">
      <el-form
        ref="queryForm"
        :inline="true"
        :model="stateData.queryForm"
        size="mini"
      >
        <el-form-item
          label="文章标题"
          prop="title"
        >
          <el-input
            v-model="stateData.queryForm.title"
            placeholder="请输入菜单名称"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="所属分类"
          prop="category_id"
        >
          <el-select
            v-model="stateData.queryForm.category_id"
            placeholder="请选择或输入搜索"
            filterable
            remote
            :remote-method="searchCategory"
          >
            <el-option
              :value="0"
              label="请选择或输入搜索"
            />
            <el-option
              v-for="item in stateData.searchCategoryList"
              :key="item.ID"
              :value="item.ID"
              :label="item.name"
            />
            <!--            <el-option-->
            <!--              :value="2"-->
            <!--              label="停用"-->
            <!--            />-->
          </el-select>
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
      </el-form>
    </div>
    <div class="article-table">
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
      <el-table :data="stateData.articleSearchList">
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
        ref="articleForm"
        :model="stateData.postForm"
        label-width="100px"
      >
        <el-form-item
          label="文章标题"
          prop="title"
        >
          <el-input
            v-model="stateData.postForm.title"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item
          label="是否为推荐"
          prop="recommend"
        >
          <el-switch
            v-model="stateData.postForm.recommend"
            inline-prompt
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item
          label=" 上传封面图"
          prop="file_path"
        >
          <el-upload
            class="avatar-uploader"
            action="/api/article/saveImg"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{ Authorization: stateData._token }"
          >
            <img
              v-if="stateData.postForm.img_path"
              :src="stateData.postForm.img_path"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
          <el-input
            v-model="stateData.postForm.img_path"
            type="hidden"
            name="file_path"
          />
        </el-form-item>
        <el-form-item
          label="父级菜单"
          prop="category_id"
        >
          <el-cascader
            v-model="stateData.postForm.category_id"
            :options="stateData.categoryTreeList"
            :props="{ checkStrictly: true,emitPath:false, value: 'id', label: 'name' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item
          label="文章内容"
          prop="content"
        >
          <WangEditor
            :content="stateData.postForm.content"
            @get-editor-value="getEditorValue"
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
import WangEditor from '../../components/WangEditor.vue'
import storage from '../../utils/storage'
export default {
  name: 'Article',
  components: {
    WangEditor
  },
  setup () {
    const instance = getCurrentInstance()
    const stateData = reactive({
      action: 'create',
      _token: storage.getItem('_token'),
      showModal: false,
      queryForm: {
        title: '',
        category_id: 0,
        total: 0,
        page_index: 1,
        page_size: 10
      },
      searchCategoryName: '',
      searchCategoryList: [],
      categoryTreeList: [],
      postForm: {
        title: '',
        category_id: 0,
        recommend: 0,
        img_path: '',
        content: ''
      },
      articleSearchList: [],
      columns: [
        {
          label: '文章名称',
          prop: 'title'
        },
        {
          label: '所属分类',
          prop: 'category_id'
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

    const handleQuery = () => {
      getArticleList()
    }

    const handleReset = () => {
      stateData.queryForm = {
        ...stateData.queryForm,
        title: '',
        category_id: 0
      }
      categoryList()
      getArticleList()
    }

    const getEditorValue = (content) => {
      stateData.postForm.content = content
    }

    // 下拉框框搜索
    const searchCategory = (query) => {
      stateData.searchCategoryName = query
      categoryList()
    }

    const handleCreate = () => {
      stateData.action = 'create'
      stateData.showModal = true
    }

    const handleFormClose = () => {
      stateData.showModal = false
      stateData.postForm = {
        title: '',
        category_id: 0,
        recommend: 0,
        img_path: '',
        content: ''
      }
    }

    const handleFormSubmit = async () => {
      instance.proxy.$refs.articleForm.validate(async (valid) => {
        if (valid) {
          if (stateData.action === 'create') {
            const res = await instance.proxy.$api.addArticle(stateData.postForm)
            if (res.status === 200) {
              instance.proxy.$message.success('添加成功')
              handleFormClose()
              getArticleList()
              stateData.showModal = false
            }
          } else if (stateData.action === 'edit') {
            const res = await instance.proxy.$api.updateArticle(stateData.postForm)
            if (res.status === 200) {
              instance.proxy.$message.success('修改成功')
              handleFormClose()
              getArticleList()
              stateData.showModal = false
            }
          }
        }
      })
    }

    const categoryList = async () => {
      const cateSearchList = await instance.proxy.$api.searchCategoryList({
        name: stateData.searchCategoryName,
        page_index: 1,
        page_size: 100
      })
      if (cateSearchList.status === 200) {
        stateData.searchCategoryList = cateSearchList.data.data.list
        // stateData.queryForm.total = cateSearchList.data.data.total
      }
    }

    const getCategoryTree = async () => {
      const treeList = await instance.proxy.$api.getCategoryTree(0)
      if (treeList.status === 200) {
        stateData.categoryTreeList = treeList.data.data
      }
    }

    const beforeAvatarUpload = (file) => {
      //   const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2

      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      if (!isLt2M) {
        instance.proxy.$message.error('上传头像图片大小不能超过 2MB!')
      }
      //   return isJPG && isLt2M;
      return isLt2M
    }

    const handleAvatarSuccess = (res, file) => {
      if (res.status === 200) {
        stateData.postForm.img_path = res.data.img_path
      }
    }

    const handleEdit = (row) => {
      stateData.action = 'edit'
      stateData.showModal = true

      nextTick(() => {
        stateData.postForm = {
          ...row,
          id: row.ID
        }
      })
    }
    const handleDel = async (id) => {
      const res = await instance.proxy.$api.deleteArticle(id)
      if (res.status === 200) {
        instance.proxy.$message.success('删除成功')
        getArticleList()
      }
    }

    const getArticleList = async () => {
      const cateSearchList = await instance.proxy.$api.searchArticleList(stateData.queryForm)
      if (cateSearchList.status === 200) {
        stateData.articleSearchList = cateSearchList.data.data.list
        stateData.queryForm.total = cateSearchList.data.data.total
      }
    }

    onMounted(() => {
      categoryList()
      getCategoryTree()
      getArticleList()
    })

    return {
      stateData,
      handleQuery,
      handleReset,
      searchCategory,
      handleCreate,
      handleFormClose,
      handleFormSubmit,
      getEditorValue,
      beforeAvatarUpload,
      handleAvatarSuccess,
      handleEdit,
      handleDel
    }
  }
}
</script>

<style lang="scss">
.article-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    background-color: #eef0f3;
    .article-query-form{
        width: 100%;
        height: 41px;
        line-height: 41px;
        background-color: white;
        margin-bottom: 20px;
        padding-left: 10px;
    }
    .article-table{
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
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
