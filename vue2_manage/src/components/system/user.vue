<template>
    <div class="app-body">
        
        <div class="breadcrumb-container">
			<span>当前位置：</span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="app-list-container">

            <div class="app-toolbar clearfix">
                <div class="fr">
                    <el-button type="warning">添加用户</el-button>
                </div>
                <el-input v-model="searchName" placeholder="用户名"></el-input>
                <el-button type="primary">查询</el-button>
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="account" label="用户名" ></el-table-column>
                    <el-table-column prop="role" label="所属角色" ></el-table-column>
                    <el-table-column prop="nickname" label="昵称" ></el-table-column>
                    <el-table-column prop="createTime" label="注册时间"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="180"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="mobile" label="手机号码"></el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
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
