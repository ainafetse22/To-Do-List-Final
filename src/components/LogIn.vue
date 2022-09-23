<template>
  <div  class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border
    md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="flex text-start text-xl font-bold leading-tight
              tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
    <form @submit.prevent class="sign-form">
      <label for="email-log">
        <input type="email" placeholder="Email"
          autocomplete="on"
          class="form-input-login"
          v-model="input.Email"
          @keyup="validateEmailInput"
          @blur="validateEmailInput"/>
        </label>
      <h4 v-if="errors.email">{{ errors.email }}</h4>
      <label for="password">
        <input type="password"
        placeholder="Password"
        class="form-input-login"
        id="password"
        v-model="input.Password"
        @keyup="validatePasswordInput"
        @blur="validatePasswordInput"
        />
        </label>
      <h4 v-if="errors.password">{{ errors.password }}</h4>
      <button class="btn-ok mt-6" @click="callLogIn" >LogIn</button>
      <h5 :disabled="isLogInButtonDisabled">-</h5>
      <div class="flex flex-row justify-between">
        <p class="text-sm font-light text-gray-500
        dark:text-gray-400">Don't Have an account yet?</p>
        <button class="text-blue-800
       font-medium text-primary-600 hover:underline dark:text-primary-500"
      @click="registerBtn">Register</button>
      </div>
    </form>
  </div>
  </div>
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
  if (input.Email && input.Password) {
    disabled = false;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in destrucErrors) {
      // console.log(destrucErrors[key]);
      if (destrucErrors[key]) { disabled = true; }
    }
    console.log('disable value');
    console.log(disabled);
  }
  return disabled;
});
</script>

<style>

</style>
