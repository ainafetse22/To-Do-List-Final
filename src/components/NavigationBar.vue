<template>
  <nav class="bg-white block w-full border-0
  border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div class="flex align-center justify-between mx-auto">
      <img src="../../assets/logo.jpeg" class="h-10 sm:h-15" alt="Doit" />
      <!-- <button data-collapse-toggle="navbar-default" type="button" class="inline-flex
         items-center
      p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none
      focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700
       dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only"></span>
      <svg @click="hideMenu =!hideMenu" class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button> -->
      <!-- <div :class="{hidden:hideMenu}" class="w-full md:block md:w-auto"
         id="navbar-default"> -->
        <ul class="flex rounded-lg
        flex-row md:space-x-8 md:mt-0 mr-12 md:text-sm md:font-medium md:border-0 md:bg-white">
        <router-link class=" invisible md:visible py-2 pr-4 pl-3 rounded bg-transparent
          text-blue-700"
          v-show="userInfo.currentUser" to="/" aria-current="page">Home</router-link>
        <router-link class="py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent
         md:text-blue-700 md:p-0 dark:text-white"
         v-show="!userInfo.currentUser" to="/auth">Sign Up/Login</router-link>
        <button class="block  pr-1 pl-1/2 text-white bg-blue-700 rounded"
        v-show="userInfo.currentUser" @click='userInfo.LogOut()'>  LogOut</button>
      </ul>
      <!-- </div> -->
    </div>
  </nav>
</template>

<script setup>
import { userStore } from '@/store/user';
// import SearchBar from '@/components/SearchBar.vue';

const userInfo = userStore();
// const emit = defineEmits(['editTask']);
// function editTask(task) {
//   emit('editTask', task);
// }

</script>

<style></style>
