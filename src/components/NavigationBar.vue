<template>
  <nav class="bg-white block w-full border-0
  border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div class="flex items-center justify-between mx-auto">
      <img src="../../assets/logo.jpeg" class="h-10 sm:h-15" alt="Doit" />
        <ul class="flex rounded-lg
        flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
        <router-link class=" invisible md:visible py-2 lg:pr-4 lg:pl-3 rounded bg-transparent
          text-blue-700"
          v-show="userInfo.currentUser" to="/" aria-current="page">Home</router-link>
        <router-link class="py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent
         md:text-blue-700 md:p-0 dark:text-white"
         v-show="!userInfo.currentUser" to="/auth">Sign Up/Login</router-link>
        <button class="block items-center px-2 py-2 pr-1 pl-1/2 text-xs md:text-sm
         text-white bg-blue-700 rounded"
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
