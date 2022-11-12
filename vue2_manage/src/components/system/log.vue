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
                <el-date-picker
                    v-model="dateTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="account" label="操作人" ></el-table-column>
                    <el-table-column prop="createTime" label="操作时间" ></el-table-column>
                    <el-table-column prop="url" label="请求链接" ></el-table-column>
                    <el-table-column prop="remark" label="说明" ></el-table-column>
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
            dateTime: null,

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
