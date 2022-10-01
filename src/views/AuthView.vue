<template>
  <div class="heroe-img">
    <!-- <img src="../../assets/heroe.jpg" class="img-size hidden lg:visible " alt="heroe"/> -->
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
  changeForm.value = !changeForm.value;// register form
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
/* .img-size{
  margin-left: auto;
  margin-right: auto;
  height: 500px;
} */
</style>
