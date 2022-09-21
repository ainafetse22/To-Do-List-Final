<template>
  <nav class="container">
    <router-link v-show="userInfo.currentUser" to="/">Home</router-link>  |
    <router-link v-show="!userInfo.currentUser" to="/auth">Sign Up/Login</router-link>
    <button v-show="userInfo.currentUser" @click='userInfo.LogOut()'>  LogOut</button>
  </nav>
</template>

<script setup>
import { userStore } from '@/store/user';

const userInfo = userStore();

</script>

<style></style>
