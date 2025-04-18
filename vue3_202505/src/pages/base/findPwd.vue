<template>
  <div class="findPwdPage">
    <div>
      <div class="findPwdPanel">
        <div>
          <LoginLogo></LoginLogo>
          <h3 class="findPwdText">辨識你的帳號</h3>
          <p class="findPwdTip">您無法登入哪一個 Battle.net 帳號？</p>
          <div class="findPwdForm">
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

              <a-form-item label="" hide-label>
                <div class="submitBtn">
                  <a-button
                    size="large"
                    type="primary"
                    long
                    @click="handleSubmit"
                    >继续</a-button
                  >
                </div>
              </a-form-item>
            </a-form>
            <div>
              <a class="backBtn" @click="back">回到上一頁</a>
            </div>
          </div>
        </div>
      </div>
      <LoginFooter></LoginFooter>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, computed, watch } from "vue";
import LoginLogo from "./components/LoginLogo.vue";
import LoginFooter from "./components/LoginFooter.vue";

const formData = reactive({
  account: "",
});

const handleSubmit = () => {};

const back = () => {
  window.history.go(-1);
};
</script>

<style lang="less" scoped>
.findPwdPage {
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

.findPwdPanel {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  margin: 0 auto 25px;
  padding-bottom: 125px;
  max-width: 776px;
  width: 100%;
  font-size: 16px;
  > div {
    position: relative;
    width: 100%;
    padding: 24px 0;
    background: none;
    border: none;
    box-sizing: border-box;
  }
}
.findPwdText {
  font-size: 32px;
  line-height: 36px;
  color: #ffffff;
  margin-bottom: 16px;
}
.findPwdTip {
  margin-bottom: 1.625rem;
  margin: 0 0 39.6px 0;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.84);
}
.findPwdForm {
  width: 416px;
  margin: 0 auto 25px;

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
.submitBtn {
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
.backBtn {
  color: #148eff;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 3px 0;
  font-size: 16px;
  line-height: 20px;
  min-height: 40px;
  display: inline-block;
  text-decoration: none;
  text-underline-position: under;
  &:hover {
    color: #47a6ff;
    text-decoration: underline;
  }
}
</style>
