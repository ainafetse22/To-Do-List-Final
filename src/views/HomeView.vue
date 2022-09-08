<template>
  <div class="home">
    <h1>Task</h1>
    <button>+</button>
    <label for="task-name">
      <input v-model="newTask.Name" type="text" id="task-name" placeholder="Add task Name" />
    </label>
    <label for="task-description">
      <textarea v-model="newTask.Description" id="task-description" placeholder="Description...">
      </textarea>
    </label>
    <button @click="AddTaskButton">ADD</button>
    <button @click="RefreshTaskButton">Refresh</button>
    <div v-for="task in taskInfo.currentTask" :key="task.id">
      <TaskShow :task="task"></TaskShow>
  </div>
  </div>
</template>

<script setup>
// import { ref, watch, reactive } from 'vue';
import { ref, reactive } from 'vue';
import { taskStore } from '@/store/tasks';
import { userStore } from '@/store/user';
import TaskShow from '@/components/TaskShow.vue';

const newTask = ref({});
const taskInfo = reactive(taskStore());
const userInfo = userStore();
async function refreshTask() {
  try {
    await taskInfo.fetchTasks(userInfo.currentUser.id);
    console.log(taskInfo.currentTask);
  } catch (e) {
    console.log(e);
  }
}
async function AddTaskButton() {
  try {
    // console.log(userInfo.currentUser);

    await taskInfo.addTask(userInfo.currentUser.id, newTask.value.Name, newTask.value.Description);
    refreshTask();
    // console.log(taskInfo.currentTask);
  } catch (e) {
    console.log(e);
  }
}
function RefreshTaskButton() {
  refreshTask();
}

// refreshTask();//  on creation

// watch(taskList, (currentValue, oldValue) => {
//   console.log('watch');
//   console.log(currentValue);
//   console.log(oldValue);
// }, { deep: true });
</script>
