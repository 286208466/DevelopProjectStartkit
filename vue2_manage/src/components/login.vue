<template>
    
    <div>
        <div class="loginPanel">
            <h2>登录</h2>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="" label-width="0" prop="account">
                        <el-input v-model="ruleForm.account" placeholder="账号" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="" label-width="0" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="密码" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="" label-width="0">
                        <el-button type="primary" @click="submitForm('ruleForm')" size="medium">登 录</el-button>
                    </el-form-item>
                    <el-form-item label="" label-width="0">
                        <div class="clearfix">
                            <a class="fl">注册</a>
                            <a class="fr">忘记密码？</a>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="copyright">
            <p>&copy; 2018 FuHai All rights reserved.</p>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            ruleForm: {
                account: '',
                password: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        token: function(){
            return this.$store.state.user.token
        }
    },
    mounted(){

    },
    methods: {
        submitForm(formName){
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$router.push({
                        path: '/dashboard'
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
   
}
</script>

<style lang="scss" scoped>
.loginPanel {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;

    h2 {
        font-size: 24px;
        text-align: center;
        margin-bottom: 30px;
        font-weight: normal;
    }
    button {
        width: 100%;
        padding: 15px 20px;
    }
    a {
        color: #009de7;
    }
}
.copyright {
    text-align: center;
    position: absolute;
    bottom: 0;
    line-height: 40px;
    width: 100%;
}
</style>
