<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.navigation {
  margin-top: 40px;
  padding: 20px;
}

.navigation h3 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

.nav-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
}

.link-card {
  background: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.link-card:hover {
  border-color: #3498db;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.2);
  transform: translateY(-2px);
}

.link-card h4 {
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
}

.link-card p {
  color: #7f8c8d;
  margin: 0;
  line-height: 1.5;
  font-size: 14px;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    align-items: center;
  }

  .nav-link {
    width: 100%;
    max-width: 400px;
  }
}
</style>
