<template>
  <div class="field">
    <h1>Log In</h1>
    <form class="sign-form">
      <label for="email-log">
        <input type="email" name="email-log" />
        email</label>
      <h4 v-if="errors.email">{{ errors.email }}</h4>
      <label for="password">
        <input type="password" id="password" name="password" />
        Password</label>
      <h4 v-if="errors.password">{{ errors.password }}</h4>
      <button @click="callLogIn" :diable="isLogInButtonDisabled">LogIn</button>
      <h3>Don't Have an account?</h3>
      <button @click="registerBtn">Register</button>
    </form>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import {
  defineEmits, reactive, computed, toRaw,
} from 'vue';
import useFormValidation from '../useFormValidation';

const userInfo = userStore();
const emit = defineEmits(['registerBtn']);
const input = reactive({
  Email: '',
  Password: '',
});
const {
  validateEmailField,
  validatePasswordField,
  errors,
} = useFormValidation();
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
const validateEmailInput = () => {
  validateEmailField('email', input.Email);
};
const validatePasswordInput = () => {
  validatePasswordField('password', input.Password);
};
const validateMethod = () => {
  validateEmailInput();
  validatePasswordInput();
};
const isLogInButtonDisabled = computed(() => {
  validateMethod();

  let disabled = true;
  const destrucErrors = toRaw(errors);
  if (input.Name && input.Email && input.Password && input.ConfirmPass) {
    disabled = false;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in destrucErrors) {
      console.log(destrucErrors[key]);
      if (destrucErrors[key]) { disabled = true; }
    }
    console.log(disabled);
  }
  return disabled;
});
</script>

<style>

</style>
