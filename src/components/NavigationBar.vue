<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/auth">Sign Up/Login</router-link>
    <button @click='userInfo.LogOut()'>LogOut</button>
  </nav>
</template>

<script setup>
import { userStore } from '@/store/user';

const userInfo = userStore();
</script>

<style></style>
