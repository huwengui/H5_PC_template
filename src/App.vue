<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
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
