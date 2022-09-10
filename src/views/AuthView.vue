<template>
  <div>
    <RegisterForm v-show="changeForm" @loginBtn="selectForm"/>
    <LogIn v-show="!changeForm" @registerBtn="selectForm"/>
    <br>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RegisterForm from '../components/RegisterForm.vue';
import LogIn from '../components/LogIn.vue';

const changeForm = ref(false);
function selectForm() {
  console.log('emit');
  changeForm.value = !changeForm.value;// register form
  console.log(changeForm.value);
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

</style>
