<template>
  <footer>
    <p>Copyright &copy; 2021</p>
    <router-link to="/about">Archives</router-link>
    |
    <router-link to="/about">Docs</router-link>
    |
    <router-link to="/about">About</router-link>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
a {
  color: #333;
}

footer {
  margin-top: 30px;
  text-align: center;
  padding-bottom: 30px;
}
</style>
