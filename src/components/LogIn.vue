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
        <input type="text" placeholder="Email"
          autocomplete="on"
          class="form-input-login"
          v-model="input.Email"/>
        </label>
      <h4 v-if="showErrors">{{ errors.email }}</h4>
      <label for="password">
        <input type="password"
        placeholder="Password"
        class="form-input-login"
        id="password"
        v-model="input.Password"/>
        </label>
      <h4 v-if="showErrors">{{ errors.password }}</h4>
      <button class="btn-ok mt-6 mb-6" @click="callLogIn" >LogIn</button>
      <div class="flex flex-row justify-between">
        <p class="text-sm font-light text-gray-500
        dark:text-gray-400">Don't Have an account yet?</p>
        <button class="text-blue-800
       font-medium text-primary-600 hover:underline dark:text-primary-500"
      @click="registerBtn">Register</button>
      </div>
    </form>
    <AlertMessage v-if="userInfo.errorMsg" :message="userInfo.errorMsg.message" txtType="bg-red-400
    shadow-[0_0_20px_#ff444477]" />
  </div>
  </div>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import {
  defineEmits, reactive, toRaw, ref,
} from 'vue';
import useFormValidation from '../useFormValidation';
import AlertMessage from './AlertMessage.vue';

const userInfo = userStore();
const showErrors = ref(false);
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

const validateEmailInput = () => {
  validateEmailField('email', input.Email);
};
const validatePasswordInput = () => {
  validatePasswordField('password', input.Password);
};
const validateMethod = () => {
  errors.name = '';
  validateEmailInput();
  validatePasswordInput();
};
const errorsEnable = () => {
  validateMethod();

  let ifErrors = true;
  const destrucErrors = toRaw(errors);
  if (input.Email && input.Password) {
    ifErrors = false;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in destrucErrors) {
      // console.log(destrucErrors[key]);
      if (destrucErrors[key]) { ifErrors = true; }
    }
  }
  return ifErrors;
};
function hideError() {
  setTimeout(() => {
    userInfo.errorMsg = null;
  }, 5000);
}
function callLogIn() {
  showErrors.value = errorsEnable();
  if (showErrors.value === false) {
    // console.log('no errors');
    const userData = {
      email: input.Email,
      password: input.Password,
    };
    userInfo.LogInEmail(input.Email, userData.password);
    hideError();
  }
}

</script>

<style>

</style>
