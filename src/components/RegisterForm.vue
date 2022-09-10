<template>
  <div class="field">
    <h1>Register</h1>
    <!-- <div class="ui left icon input big">
      <i class="user icon"></i>
      <input type="text" placeholder="Full Name" autocomplete="off" />
    </div> -->
    <form class="sign-form">
      <label for="email">
        <input type="email" id="register-email" name="email" required  />
        email</label
      >
      <label for="password">
        <input type="password" id="register-password" required name="password" />
        Password</label
      >
      <label for="passwordConfirmation">
        <input type="password" id="password-Confirm" required name="passwordConfirm" />
        Password Confirmation</label
      >
      <button @click="callSignUp">SignUp</button>
      <h3>Already Register?</h3>
      <button @click="loginBtn">Log in</button>
    </form>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import { defineEmits } from 'vue';

const userInfo = userStore();
const emit = defineEmits(['loginBtn']);
const loginBtn = () => {
  emit('loginBtn');
};
function callSignUp() {
  const userData = {
    email: 'zestefania.amundaray@gmail.com',
    password: '123456',
  };
  userInfo.signUp(userData.email, userData.password);
}
</script>
