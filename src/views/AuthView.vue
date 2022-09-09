<template>
  <div>
    <RegisterForm/>
    <button @click="callSignUp">SignUp</button>
    <LogIn/>
    <button @click="callLogIn">LogIn</button>
    <br>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
// import { useRouter } from 'vue-router';
import RegisterForm from '../components/RegisterForm.vue';
import LogIn from '../components/LogIn.vue';

const userInfo = userStore();
// const = useRouter();

function callSignUp() {
  const userData = {
    email: 'zestefania.amundaray@gmail.com',
    password: '123456',
  };
  userInfo.signUp(userData.email, userData.password);
}

function callLogIn() {
  const userData = {
    email: 'zestefania.amundaray@gmail.com',
    password: '123456',
  };
  userInfo.LogInEmail(userData.email, userData.password);
}

// watch(userInfo, () => {
//   if (userInfo.currentUser) {
//     router.push({ path: '/' });
//   }
// });

// function checkEmail() {
//   const email = document.getElementById('txtEmail');
//   // eslint-disable-next-line import/prefer-default-export
//   const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//   if (!filter.test(email.value)) {
//     console.log('Please provide a valid email address');
//     return false;
//   }
// }
</script>

<style>
.signup-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
}
</style>
