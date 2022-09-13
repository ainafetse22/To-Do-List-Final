<template>
  <div class="field">
    <h1>Register</h1>
    <!-- <div class="ui left icon input big">
      <i class="user icon"></i>
      <input type="text" placeholder="Full Name" autocomplete="off" />
    </div> -->
    <form class="sign-form">
      <label for="FullName">
        <input type="text" placeholder="Full Name" autocomplete="off"
              v-model="inputName" @keyup="validateNameInput" @blur="validateNameInput"/>
      </label>
        <h4 v-if="errors.name">{{errors.name}}</h4>
      <label for="email">
        <input type="email" placeholder="Email" autocomplete="on"
               v-model="inputEmail" @keyup="validateEmailInput" @blur="validateEmailInput"/>
      </label>
        <h4 v-if="errors.email">{{errors.email}}</h4>

      <label for="password">
        <input type="password" placeholder="New Password" id="register-password"
              v-model="inputPassword" @keyup="validatePasswordInput" @blur="validatePasswordInput"/>
      </label>
        <h4 v-if="errors.password">{{errors.password}}</h4>

      <label for="passwordConfirmation">
        <input type="password" id="password-Confirm" placeholder="Confirm your Password"
              v-model="inputConfirmPass" @keyup="validatePassConfirm" @blur="validatePassConfirm"/>
      </label>
      <h4 v-if="errors.passwordConfirm">{{errors.passwordConfirm}}</h4>

      <button @click="callSignUp">SignUp</button>
      <h3>Already Register?</h3>
      <button @click="loginBtn">Log in</button>
    </form>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import { ref, defineEmits } from 'vue';
import useFormValidation from '../useFormValidation';

const userInfo = userStore();
const emit = defineEmits(['loginBtn']);
const inputName = ref('');
const inputEmail = ref('');
const inputPassword = ref('');
const inputConfirmPass = ref('');
const {
  validateNameField,
  validateEmailField,
  validatePasswordField,
  confirmPasswordField,
  errors,
} = useFormValidation();

const validateNameInput = () => {
  validateNameField('name', inputName.value);
};
const validateEmailInput = () => {
  validateEmailField('email', inputEmail.value);
};
const validatePasswordInput = () => {
  validatePasswordField('password', inputPassword.value);
};
const validatePassConfirm = () => {
  console.log(inputConfirmPass.value);
  console.log(inputPassword.value);
  confirmPasswordField('passwordConfirm', inputConfirmPass.value, inputPassword.value);
};

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
