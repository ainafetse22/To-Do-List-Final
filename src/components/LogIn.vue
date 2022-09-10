<template>
  <div class="field">
    <h1>Log In</h1>
    <form class="sign-form">
      <label for="email">
        <input type="email" id="email" name="email" required />
        email</label
      >
      <label for="password">
        <input type="password" id="password" required name="password" />
        Password</label
      >
      <button @click="callLogIn">LogIn</button>
      <h3>Don't Have an account?</h3>
      <button @click="registerBtn">Register</button>
    </form>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import { defineEmits } from 'vue';

const userInfo = userStore();
const emit = defineEmits(['registerBtn']);
const registerBtn = () => {
  emit('registerBtn');
};
function callLogIn() {
  const userData = {
    email: 'zestefania.amundaray@gmail.com',
    password: '123456',
  };
  userInfo.LogInEmail(userData.email, userData.password);
}
</script>

<style>

</style>
