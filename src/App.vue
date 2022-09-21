<template class="container">
  <NavigationBar />
  <router-view/>
</template>

<script setup>
// import { useRouter } from 'vue-router';
import { userStore } from '@/store/user';
import NavigationBar from './components/NavigationBar.vue';
import './css/output.css'; // Here
// import { computed, ref } from 'vue';

// const router = useRouter();
const user = userStore();

async function isLog() {
  try {
    await user.fetchUser();// here we call fetch user
    // if (!user.currentUser) {
    //   // redirect them to logout if the user is not there
    //   router.push({ path: '/auth' });
    // } else {
    //   // continue to dashboard
    //   router.push({ path: '/' });
    // }
  } catch (e) {
    console.error(e);
  }
}
isLog();

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
