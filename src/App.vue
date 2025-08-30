<template>
  <div id="app">
    <!-- 项目显示组件，仅在开发环境显示 -->
    <div v-if="isDevelopment" class="project-indicator">
      <span class="project-name">{{ currentProject }}</span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isDevelopment() {
      return process.env.NODE_ENV === 'development'
    },
    currentProject() {
      const projectName = process.env.VUE_APP_PROJECT || 'project-a'
      return `当前项目: ${projectName}`
    },
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // min-height: 100vh;
  height: 100%;
}

/* 项目指示器样式 */
.project-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  .project-name {
    display: inline-block;
    letter-spacing: 0.5px;
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .project-indicator {
    top: 10px;
    right: 10px;
    font-size: 12px;
    padding: 6px 12px;
  }
}
body {
  margin: 0;
}
nav {
  padding: 60px 30px; /* 使用px单位，会被自动转换为rem */
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 32px; /* 使用px单位，会被自动转换为rem */
    margin: 0 20px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #e9ecef;
    }

    &.router-link-exact-active {
      color: #42b983;
      background-color: #e8f5e8;
    }
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  nav {
    padding: 40px 20px;

    a {
      font-size: 28px;
      margin: 0 10px;
      padding: 8px 16px;
    }
  }
}
</style>
