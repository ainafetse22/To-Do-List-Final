<!-- eslint-disable vue/no-mutating-props -->
<template>
  <article class="w-5/6 fit-content h-50 m-5 transform flex flex-col items-center">
    <section class="w-5/6 mb:w-3/5 rotate-3  rounded-2xl
     bg-gray-100 p-6  duration-300 hover:rotate-0">
      <!-- <div class="flex justify-end">
        <div class="pin-img h-20"></div>
      </div> -->
      <div class="pin-img h-10 md:h-20">
      </div>
      <h3 class="text-center text-sm md:text-xl
      font-extrabold text-gray-600">{{ task.due_date }}</h3>
      <h2 class="text-center text-m md:text-2xl lg:text-2xl
      font-extrabold text-gray-900">{{ task.title }}</h2>
      <p class="fit-content w-full text-center  truncate text-sm md:text-m lg:text-xl
       font-extrabold text-[#FE5401]">
        {{ task.description }}</p>
      <footer class="sm:mb-10 flex-column space-between justify-center">
        <div class="flex justify-center">
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition
           duration-5000 ease-in">
            <label class="toggle-label block overflow-hidden h-6 rounded-full
            bg-gray-300 cursor-pointer"
              for="complete">
              <input class="toggle-checkbox absolute block w-6 h-6 rounded-full
                 bg-gray-800 border-4 appearance-none cursor-pointer" type="checkbox"
                  v-model="task.is_complete" />
            </label>
            <h3 class="text-sm md:text-m">Done</h3>
          </div>
        </div>
        <h4 class="text-xs md:text-sm">Created at {{ formatTime }}</h4>
      </footer>
      <div>
        <ul class="sm:mt-6 text-end">
          <li><button class="text-sm md:text-m lg:text-l hover:text-3xl hover:text-orange-600"
            @click="editTask">Edit</button></li>
          <li><button class="text-sm md:text-m lg:text-l hover:text-3xl hover:text-orange-600"
            @click="removeTask">Remove</button></li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  task: Object,
});

const emit = defineEmits(['editTask', 'removeTask']);

const editTask = () => {
  emit('editTask', props.task);
};

const formatTime = computed(() => {
  const timeStamp = props.task.inserted_at.split('T');
  const date = timeStamp[0];
  return date;
});

const removeTask = () => {
  emit('removeTask', props.task.id);
};
</script>

<style>

</style>
