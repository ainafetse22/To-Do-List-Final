<template>
  <h1>Singup View</h1>
  <button @click="callSignUp">SignUp</button>
</template>

<script setup>
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

const userInfo = userStore();
const router = useRouter();

function callSignUp() {
  const userData = {
    email: 'aina@gmail.com',
    password: '123456',
  };
  userInfo.signUp(userData.email, userData.password);
}
watch(userInfo, () => {
  console.log('aqui');
  if (userInfo.currentUser) {
    router.push({ path: '/' });
  }
});
</script>

<style>

</style>
