<template>
  <div  class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border
    md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl text-start flex font-bold leading-tight
              tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an Account
              </h1>
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
          class="form-input-login"
          v-model="input.Name"
          @keyup="validateNameInput"
          @blur="validateNameInput"
        />
      </label>
      <h4 v-if="showErrors">{{ errors.name }}</h4>
      <label for="email">
        <input
          type="email"
          placeholder="Email"
          autocomplete="on"
          class="form-input-login"
          v-model="input.Email"
          @keyup="validateEmailInput"
          @blur="validateEmailInput"
        />
      </label>
      <h4 v-if="showErrors">{{ errors.email }}</h4>

      <label for="password">
        <input
          type="password"
          placeholder="New Password"
          id="register-password"
          class="form-input-login"
          v-model="input.Password"
          @keyup="validatePasswordInput"
          @blur="validatePasswordInput"
        />
      </label>
      <h4 v-if="showErrors">{{ errors.password }}</h4>

      <label for="passwordConfirmation">
        <input
          type="password"
          id="password-Confirm"
          class="form-input-login"
          placeholder="Confirm your Password"
          v-model="input.ConfirmPass"
          @keyup="validatePassConfirm"
          @blur="validatePassConfirm"
        />
      </label>
      <h4 v-if="showErrors">{{ errors.passwordConfirm }}</h4>

      <button class="btn-ok mt-6" @click="callSignUp" >SignUp</button>
      <h2 :disabled="isSignupButtonDisabled">-</h2>
      <div class="flex flex-row justify-between">
        <p class="text-sm font-light text-gray-500
        dark:text-gray-400">Already Register?</p>
        <button class="text-blue-800
       font-medium text-primary-600 hover:underline dark:text-primary-500"
        @click="loginBtn">Log in</button>
      </div>
    </form>
  </div>
  <AlertMessage v-if="userInfo.errorMsg" :message="userInfo.errorMsg.message" txtType="bg-red-400
    shadow-[0_0_20px_#ff444477]" />
  </div>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import {
  defineEmits, reactive, toRaw, ref,
} from 'vue';
import useFormValidation from '../useFormValidation';

const userInfo = userStore();
const showErrors = ref(false);
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

const errorsEnable = () => {
  validateMethod();
  let ifErrors = true;
  const destrucErrors = toRaw(errors);
  if (input.Name && input.Email && input.Password && input.ConfirmPass) {
    ifErrors = false;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in destrucErrors) {
      // console.log(destrucErrors[key]);
      if (destrucErrors[key]) { ifErrors = true; }
    }
    // console.log(disabled);
  }
  return ifErrors;
};
function hideError() {
  setTimeout(() => {
    userInfo.errorMsg = null;
  }, 5000);
}
async function callSignUp() {
  showErrors.value = errorsEnable();
  if (showErrors.value === false) {
    const userData = {
      email: input.Email,
      password: input.Password,
    };
    try {
      await userInfo.signUp(userData.email, userData.password);
      userInfo.fetchUser();
      hideError();
    // if (!userInfo.currentUser()) {
    //   console.log('error');
    //   console.log('fuera');
    // }
    } catch (e) {
      alertMessage.value = (e.message);
    }
  }
}

// computed(() =>
// const isSignupButtonDisabled = computed(() => {
// const validateMethod = () => { // document.activeElement

//   let disabled = true;
//   const destrucErrors = toRaw(errors);
//   if (input.Name && input.Email && input.Password && input.ConfirmPass) {
//     disabled = false;
//     // eslint-disable-next-line no-restricted-syntax, guard-for-in
//     for (const key in destrucErrors) {
//       console.log(destrucErrors[key]);
//       if (destrucErrors[key]) { disabled = true; }
//     }
//     console.log(disabled);
//   }
//   return disabled;
// }
// );
</script>
