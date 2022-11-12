<template>
	<div id="header" class="app-header">
		<el-menu :default-active="activeIndex" class="el-menu-demo fr" mode="horizontal" @select="handleSelect">
	  		<el-submenu index="2">
	    		<template slot="title">管理员（wscyxyx123）</template>
	    		<el-menu-item index="2-1">
	    			<div>
	    				<span>我的信息</span>
	    			</div>
	    		</el-menu-item>
	    		<el-submenu index="2-4" popper-class="operatorInfo">
	      			<template slot="title">运维者信息</template>
	      			<el-menu-item index="2-4-1">
	      				<template slot="title">运维者信息</template>
	      			</el-menu-item>
	      			<el-menu-item index="2-4-2" class="operatorList">
	      				<div>
	      					<ul>
	      						<li>张警官</li>
	      						<li>张警官</li>
	      						<li>张警官</li>
	      						<li>张警官</li>
	      					</ul>
	      				</div>
	      			</el-menu-item>
	      			<el-menu-item index="2-4-3">
	      				<a>添加运营者信息</a>
	      			</el-menu-item>
	    		</el-submenu>
	    		<el-menu-item index="2-2">修改密码</el-menu-item>
	  		</el-submenu>
		  	<el-menu-item index="3">
		  		<a>退出</a>
		  	</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1'
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
  }
</script>

<style lang="scss">
.app-header {
	height: 50px;
	background: #fff;
	
	.el-menu--horizontal>.el-menu-item {
		height: 50px;
		line-height: 50px;
	}
	.el-menu--horizontal>.el-submenu .el-submenu__title {
		height: 50px;
		line-height: 50px;
	}
	.el-menu--horizontal>.el-menu-item, .el-menu--horizontal>.el-submenu .el-submenu__title {
		border-bottom: 0!important;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title {
        height: 50px;
        line-height: 50px;
    }
}
.operatorInfo {
	left: auto!important;
	top: 0!important;
    right: 200px!important;
}
.operatorList {
	height: 100%!important;
	color: #909399!important;
}
</style>