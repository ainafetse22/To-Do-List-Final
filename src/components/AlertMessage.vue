<template>
    <div class='flex flex-row bg-gray-900 h-10 w-90 rounded-[30px]'>
        <div class='flex flex-col justify-center
         text-white font-bold grow-[1] max-w-[90%] text-center'>{{message}}</div>
        <div class='w-[10%] rounded-r-2xl' :class="txtType"></div>
    </div>
    <!-- <hr class='my-3'>
    <div class='flex flex-row bg-gray-900 h-10 w-[400px] rounded-[30px]'>
        <div class='flex flex-col justify-center
         text-white font-bold grow-[1] max-w-[90%] text-center'>Your request
            has been denied</div>
        <div class='w-[10%] bg-red-400 rounded-r-2xl shadow-[0_0_20px_#ff444477]'></div>
    </div>
    <hr class='my-3'>
    <div class='flex flex-row bg-gray-900 h-10 w-[400px] rounded-[30px]'>
        <div class='flex flex-col justify-center
         text-white font-bold grow-[1] max-w-[90%] text-center'>Missing
            information</div>
        <div class='w-[10%] bg-yellow-400 rounded-r-2xl shadow-[0_0_20px_#ffbb3377]'></div>
    </div> -->
</template>

<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: String,
  txtType: String,
});
// bg-green-400
</script>

<style>

</style>
