<template>
  <div class="home">
    <h1>Esta es la vista de Home</h1>
  </div>
</template>

<script>
import { taskStore } from '@/store/tasks';

const taskInfo = taskStore();

async function refreshTask() {
  try {
    await taskInfo.fetchTasks();
    console.log(taskInfo.currentTask);
  } catch (e) {
    console.log(e);
  }
}
refreshTask();

export default {
  name: 'HomeView',
  components: {
  },
};
</script>
