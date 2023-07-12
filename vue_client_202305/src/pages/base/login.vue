<template>
  <div class="loginPage">
    <div>
      <div class="loginPanel">
        <div>
          <LoginLogo></LoginLogo>
          <h3 class="loginText">登入</h3>
          <div>
            <a-form ref="formRef" size="large" :model="formData">
              <a-form-item
                field="account"
                label=""
                hide-label
                :rules="[
                  { required: true, message: 'account is required' },
                  {
                    minLength: 5,
                    message: 'must be greater than 5 characters',
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input
                  v-model="formData.account"
                  placeholder="电子邮件或电话"
                />
              </a-form-item>
              <a-form-item
                field="password"
                label=""
                hide-label
                :rules="[
                  { required: true, message: 'password is required' },
                  {
                    minLength: 5,
                    message: 'must be greater than 5 characters',
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input v-model="formData.password" placeholder="密码" />
              </a-form-item>

              <a-form-item label="" hide-label>
                <div class="loginBtn">
                  <a-button
                    size="large"
                    type="primary"
                    long
                    @click="handleSubmit"
                    >登陆</a-button
                  >
                </div>
              </a-form-item>
            </a-form>
          </div>
          <div class="loginLinks">
            <p>
              <a>建立免费的账号</a>
            </p>
            <p><a @click="handleLoginSupport">无法登陆？</a></p>
          </div>
          <div class="thirdpartyLine">
            <span>或快速登入</span>
          </div>
          <div class="thirdpartyList">
            <ul>
              <li>
                <button style="background-color: #1877f2"><i></i></button>
              </li>
              <li>
                <button style="background-color: #fff"><i></i></button>
              </li>
              <li>
                <button style="background-color: #fff"><i></i></button>
              </li>
              <li>
                <button style="background-color: #0070cc"><i></i></button>
              </li>
              <li>
                <button style="background-color: #107c10"><i></i></button>
              </li>
              <li>
                <button style="background-color: #e60012"><i></i></button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <LoginFooter></LoginFooter>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, reactive, computed, watch } from "vue";
import LoginFooter from "./components/LoginFooter.vue";
import LoginLogo from "./components/LoginLogo.vue";

const formRef = ref();
const formData = reactive({
  account: "",
  password: "",
});

const handleSubmit = () => {
  console.log(formRef);
  formRef.value.validate().then((res) => {
    console.log(res);
  });
};

const handleReset = () => {
  formRef.value.resetFields();
};

const handleLoginSupport = () => {
  window.open("./loginSupport");
};
</script>

<style lang="less" scoped>
.loginPage {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #15171e;
  color: rgba(255, 255, 255, 0.84);
  font-family: "Object Sans", "Arial", "Helvetica", "Segoe UI Symbol",
    "Segoe MDL2 Assets", "Object Sans", "Microsoft JhengHei", "Tei TC",
    "Segoe UI Symbol", "Segoe MDL2 Assets", sans-serif;
  overflow: hidden;
  > div {
    height: 100%;
    padding-bottom: 10vh;
    position: relative;
    min-height: 100%;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    overflow: auto;
  }
}
::-webkit-scrollbar {
  width: 9px;
  background: rgba(29, 34, 44, 0.5);
  padding-right: 5px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4.5px;
}
::-webkit-scrollbar-track-piece {
  border-left: 1px solid rgba(255, 255, 255, 0.07);
}

.loginPanel {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  width: 416px;
  margin: 0 auto 25px;
  > div {
    position: relative;
    width: 100%;
    padding: 24px 0;
    background: none;
    border: none;
    box-sizing: border-box;

    :deep(.arco-form-item-message) {
      color: #ffb400;
      margin: 6px 0 6px 0;
      font-size: 14px;
      line-height: 21px;
      display: block;
    }

    :deep(.arco-input-wrapper) {
      padding-left: 0;
      padding-right: 0;
      background: #15171e;
      border: none;
      border-radius: 0;
    }
    :deep(.arco-input-wrapper input) {
      padding-left: 12px;
      padding-right: 12px;
      font-size: 16px;
      line-height: 24px;
      border: 1px solid rgba(255, 255, 255, 0.36);
      background-color: #171920;
      height: 40px;
      border-radius: 4px;
      color: rgba(255, 255, 255, 0.84);
      transition: background-position 0.2s, background-color 0.2s,
        border-color 0.2s, box-shadow 0.2s;
      font-family: "Noto Sans", "Georgia", "Times New Roman", "Times",
        "Segoe UI Symbol", "Segoe MDL2 Assets", "Noto Sans", "????????????",
        "PMingLiU", "??????", "SimSun", "Ming Light", "Segoe UI Symbol",
        "Segoe MDL2 Assets", serif;

      &:hover {
        border-color: rgba(255, 255, 255, 0.84);
        background-color: #171920;
        color: #ffffff;
        border-radius: 4px;
      }
      &:focus {
        border-color: #148eff;
        background-color: #171920;
        color: #ffffff;
        border-radius: 4px;
      }
      &:hover:focus {
        border-color: #7abfff;
        border-radius: 4px;
      }
    }
  }
}

.loginText {
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  margin: 40px 0px;
  text-align: center;
  color: #ffffff;
}
.thirdpartyLine {
  margin: 40px 0 24px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: "Noto Sans", "Object Sans", sans-serif;
  line-height: 21px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  text-transform: none;
  overflow: hidden;
  white-space: nowrap;

  span {
    position: relative;
    display: inline-block;
    font-family: "Noto Sans", "Object Sans", sans-serif;

    &::before,
    &::after {
      width: 500px;
      content: "";
      height: 1px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 50%;
    }
    &::before {
      right: 100%;
      margin-right: 20px;
      background-color: rgba(255, 255, 255, 0.18);
    }
    &::after {
      left: 100%;
      margin-left: 20px;
      background-color: rgba(255, 255, 255, 0.18);
    }
  }
}
.thirdpartyList {
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 -9px 0 -9px;
    flex-flow: row wrap;
  }
  button {
    position: relative;
    width: 48px;
    height: 48px;
    padding: 13px;
    border-radius: 4px;
    margin: 0 12px;
    border: none;
    font-size: 16px;
    line-height: 20px;
    min-height: 40px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
    color: #ffffff;
    white-space: normal;

    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      opacity: 1;
      height: 18px;
      width: 18px;
    }
  }
}
.loginBtn {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 6px;
  :deep(.arco-btn-primary) {
    // background-color: #0074e0;
    // color: #ffffff;
    // border: 2px solid transparent;
    margin: 3px 0;
    padding: 0 20px;
    font-size: 16px;
    line-height: 20px;
    min-height: 40px;
  }
}
.loginLinks {
  margin: 28px 0 0 0;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  p {
    margin-bottom: 24px;
  }
  a {
    color: #148eff;
    text-decoration: none;
    text-underline-position: under;
    &:hover {
      color: #47a6ff;
      text-decoration: underline;
    }
  }
}
</style>
