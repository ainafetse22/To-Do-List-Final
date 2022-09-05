<template>
  <div>
    <SignUp/>
    <RegisterForm/>
    <button @click="callSignUp">SignUp</button>
    <button @click="callLogOut">LogOut</button>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import RegisterForm from '../components/RegisterForm.vue';
import SignUp from '../components/SignUp.vue';

const userInfo = userStore();
const router = useRouter();

function callSignUp() {
  const userData = {
    email: 'zestefania.amundaray@gmail.com',
    password: '123456',
  };
  userInfo.signUp(userData.email, userData.password);
}
function callLogOut() {
  userInfo.LogOut();
}
watch(userInfo, () => {
  console.log('watch user');
  if (userInfo.currentUser) {
    router.push({ path: '/' });
  }
});

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
  align-items: center;
  height: 100vh;
}
.signup-form {
  width: 450px;
}
</style>
