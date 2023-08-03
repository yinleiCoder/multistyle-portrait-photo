<script setup></script>

<template>
  <div class="loginContainer">
    <el-form class="loginForm">
      <h3>用户登录</h3>
      <el-form-item>
        <span class="svgContainer">
          <el-icon><User /></el-icon>
        </span>
        <el-input placeholder="用户名" name="username" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svgContainer">
          <el-icon><Lock /></el-icon>
        </span>
        <el-input placeholder="密码" name="password" type="password"></el-input>
        <span class="showPwd">
          <el-icon><View /></el-icon>
        </span>
      </el-form-item>
      <el-button type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<style scoped>
.loginContainer {
    min-height: 100vh;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loginForm {
    position: relative;
    width: 520px;
    max-width: 100%;
    overflow: hidden;
}

.loginForm :deep(.el-form-item){
    border: 1px solid #000;
    border-radius: 6px;
    padding: 0 10px;
}

.loginForm :deep(.el-input){
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
}

.loginForm :deep(.el-input .el-input__wrapper){
    box-shadow: none;
}

.loginForm :deep(.el-button) {
    width: 100%;
}
</style>
