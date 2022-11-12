<template>
	<div class="app-menu">
        <el-scrollbar wrapClass="scrollbar-wrapper">
            <h2 class="logo">网站后台管理系统</h2>
            <el-menu
            mode="vertical" 
            :default-active="$route.path"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            >
                
                <template v-for="item in menus">
                    <router-link :to="item.path" :key="item.id">
                        <el-menu-item v-if="!item.children" :index="item.id">
                            <i class="el-icon-menu"></i>
                            <span>{{item.text}}</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu v-if="item.children" :index="item.id">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{item.text}}</span>
                        </template>
                        <template v-for="child in item.children">
                            <router-link :to="child.path" :key="child.id">
                                <el-menu-item  :index="child.path">
                                    &ensp;&nbsp;
                                    <span>{{child.text}}</span>
                                </el-menu-item>
                            </router-link>
                        </template>
                        
                    </el-submenu>
                    
                </template>
                
            </el-menu>
        </el-scrollbar>
	</div>
</template>

<script>
export default {
	data(){
		return {
			menus: [
				{
					id: "0",
					text: "首页",
					icon: "icon-home",
					path: "/dashboard",
					children: null
				},
				{
					id: "1",
					text: "系统管理",
					icon: "icon-home",
					path: "",
					children: [
						{
							id: "11",
							text: "用户管理",
							icon: "icon-home",
							path: "/system/user"
						},
						{
							id: "12",
							text: "角色管理",
							icon: "icon-home",
							path: "/system/role"
						},
						{
							id: "13",
							text: "操作日志",
							icon: "icon-home",
							path: "/system/log"
						}
					]
				},
				{
					id: "2",
					text: "文章管理",
					icon: "icon-home",
					path: "",
					children: [
						{
							id: "21",
							text: "文章列表",
							icon: "icon-home",
							path: "/article/list"
						}
					]
				}
				
			]
		}
	},
  	components: { 
  	
  	},
  	computed: {
  
  	}
}
</script>

<style lang="scss" scoped>
.logo {
    line-height: 50px;
    color: #fff;
    background: #0099cc;
    font-size: 16px;
    text-align: center;
}
</style>