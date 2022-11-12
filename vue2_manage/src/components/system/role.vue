<template>
    <div class="app-body">
        
        <div class="breadcrumb-container">
			<span>当前位置：</span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="app-list-container">

            <div class="app-toolbar">
                <div class="fr">
                    <el-button type="warning">添加角色</el-button>
                </div>
                <el-input v-model="searchName" placeholder="角色名"></el-input>
                <el-button type="primary">查询</el-button>
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="roleName" label="角色名称" ></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                    <el-table-column prop="createName" label="创建人" ></el-table-column>
                    <el-table-column prop="remark" label="备注" ></el-table-column>
                    <el-table-column prop="menu" label="菜单权限"></el-table-column>
                </el-table>
            </div>

            <br>
            <div>
                <el-pagination background 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            searchName: "",

            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            var self = this;
            self.pageSize = val;
            self.render();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            var self = this;
            self.currentPage = val;
            self.render();
        },
        render(){
            var self = this;
            self.$utils.ajax({
                url: "",
                data: {},
                success: function(data){
                    self.tableData = self.tableData.splice(self.tableData.length);
                    self.tableData = data.rows;
                }
            })
            
        }
        
    }
}
</script>

<style lang="scss" scoped>
.el-input {
    width: 200px;
}
</style>
