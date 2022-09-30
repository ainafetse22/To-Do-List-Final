<template>
<div class="relative w-11/12">
    <label for="search">
        <input type="text" class="w-full bg-gray-50 border border-gray-300
         text-gray-900 text-xs sm:text-sm
         rounded-lg block p-2.5" id="search"
        v-model="searchTerm" placeholder="search a task...">
    </label>
    <div class="absolute bg-orange-600 right-0 z-10 w-3/4 lg:w-1/2 origin-top-right
     rounded-md shadow-lg ring-1 ring-black ring-opacity-5
      focus:outline-none" role="menu" aria-orientation="vertical"
      aria-labelledby="menu-button" tabindex="-1">
    <!-- <div class="py-1" role="none"> -->
    <ul v-if="searchTask">
      <li class="text-white block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
      v-for="task in searchTask" :key="task.title"
      @click="selectTask(task)" @keyup="selectTask(task.title)">
          {{ task.title }}
      </li>
    </ul>
  </div>
    <!-- </div> -->
</div>
</template>

<script setup>
import {
  ref, computed, reactive, defineEmits,
} from 'vue';
import { taskStore } from '@/store/tasks';
import { userStore } from '@/store/user';

const searchTerm = ref('');
const taskInfo = reactive(taskStore());
const userInfo = userStore();
const selectedTask = ref('');

async function refreshTask() {
  try {
    await taskInfo.fetchTasks(userInfo.currentUser.id);
  } catch (e) {
    console.log(e);
  }
}
refreshTask();

const searchTask = computed(() => {
  if (searchTerm.value === '') {
    return [];
  }
  let matches = 0;
  // eslint-disable-next-line array-callback-return, consistent-return
  const filtered = taskInfo.currentTask.filter((task) => {
    if (task.title) {
      if (
        task.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      && matches < 5
      ) {
        matches += 1;
        return task;
      }
    }
  });
  return filtered;
});
const emit = defineEmits(['editTask']);
const selectTask = (task) => {
  selectedTask.value = task;
  searchTerm.value = '';
  emit('editTask', task);
  taskInfo.setSearch(task);
};

</script>

<style>

</style>
