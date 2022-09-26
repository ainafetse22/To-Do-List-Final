<template>
<div>
    <label for="search">
        <input type="text" id="search" v-model="searchTerm" placeholder="search task...">
    </label>
    <ul v-if="searchTask">
    <li v-for="task in searchTask" :key="task.title"
    @click="selectTask(task)" @keyup="selectTask(task.title)">
        {{ task.title }}
    </li>
    </ul>
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
  console.log(searchTerm.value);
  console.log(taskInfo.currentTask);
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
  console.log(filtered);
  return filtered;
});
const emit = defineEmits(['editTask']);
const selectTask = (task) => {
  selectedTask.value = task;
  searchTerm.value = '';
  emit('editTask', task);
};

</script>

<style>

</style>
