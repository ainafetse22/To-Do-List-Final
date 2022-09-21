<template>
  <div class="field">
    <h1>Register</h1>
    <!-- <div class="ui left icon input big">
      <i class="user icon"></i>
      <input type="text" placeholder="Full Name" autocomplete="off" />
    </div> -->
    <div >{{alertMessage}}</div>
    <form @submit.prevent class="sign-form">
      <label for="FullName">
        <input
          type="text"
          placeholder="Full Name"
          autocomplete="off"
          v-model="input.Name"
          @keyup="validateNameInput"
          @blur="validateNameInput"
        />
      </label>
      <h4 v-if="errors.name">{{ errors.name }}</h4>
      <label for="email">
        <input
          type="email"
          placeholder="Email"
          autocomplete="on"
          v-model="input.Email"
          @keyup="validateEmailInput"
          @blur="validateEmailInput"
        />
      </label>
      <h4 v-if="errors.email">{{ errors.email }}</h4>

      <label for="password">
        <input
          type="password"
          placeholder="New Password"
          id="register-password"
          v-model="input.Password"
          @keyup="validatePasswordInput"
          @blur="validatePasswordInput"
        />
      </label>
      <h4 v-if="errors.password">{{ errors.password }}</h4>

      <label for="passwordConfirmation">
        <input
          type="password"
          id="password-Confirm"
          placeholder="Confirm your Password"
          v-model="input.ConfirmPass"
          @keyup="validatePassConfirm"
          @blur="validatePassConfirm"
        />
      </label>
      <h4 v-if="errors.passwordConfirm">{{ errors.passwordConfirm }}</h4>

      <button @click="callSignUp" >SignUp</button>
      <h2 :disabled="isSignupButtonDisabled">-</h2>
      <h3>Already Register?</h3>
      <button @click="loginBtn">Log in</button>
    </form>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import {
  defineEmits, computed, reactive, toRaw, ref,
} from 'vue';
import useFormValidation from '../useFormValidation';

const userInfo = userStore();
const emit = defineEmits(['loginBtn']);
const alertMessage = ref('');
const input = reactive({
  Name: '',
  Email: '',
  Password: '',
  ConfirmPass: '',
});
const {
  validateNameField,
  validateEmailField,
  validatePasswordField,
  confirmPasswordField,
  errors,
} = useFormValidation();

const validateNameInput = () => {
  validateNameField('name', input.Name);
};
const validateEmailInput = () => {
  validateEmailField('email', input.Email);
};
const validatePasswordInput = () => {
  validatePasswordField('password', input.Password);
};
const validatePassConfirm = () => {
  confirmPasswordField('passwordConfirm', input.ConfirmPass, input.Password);
};

const validateMethod = () => {
  validateNameInput(); // ajustar
  validateEmailInput();
  validatePasswordInput();
  validatePassConfirm();
};

const loginBtn = () => {
  emit('loginBtn');
};
async function callSignUp() {
  const userData = {
    email: 'zestefania.amundaray@gmail.com',
    password: '123456',
  };
  try {
    await userInfo.signUp(userData.email, userData.password);
    userInfo.fetchUser();
  // if (!userInfo.currentUser()) {
  //   console.log('error');
  //   console.log('fuera');
  // }
  } catch (e) {
    alertMessage.value = (e.message);
  }
}
// computed(() =>
const isSignupButtonDisabled = computed(() => {
  validateMethod(); // document.activeElement

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
