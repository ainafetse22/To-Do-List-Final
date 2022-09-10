<template>
  <div class="home">
    <h1>Task</h1>
    <button @click="addWindow">+</button>
    <label for="task-name">
      <input v-model="newTask.name" type="text" id="task-name" placeholder="Add task Name" />
    </label>
    <label for="task-description">
      <textarea v-model="newTask.description" id="task-description" placeholder="Description...">
      </textarea>
    </label>
    <label v-show="calledFrom ==='edit' " for="complete">Complete?
      <input type="checkbox" id="complete" v-model="newTask.complete">
    </label>
    <button @click="modifyTaskBtn(calledFrom)">Ok modify</button>
    <button @click="refreshTaskBtn">Refresh</button>
    <div v-for="task in taskInfo.currentTask" :key="task.id">
      <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
    </div>
    <datepicker v-model="picked" />
  </div>
</template>

<script setup>
// import { ref, watch, reactive } from 'vue';
import { ref, reactive } from 'vue';
import { taskStore } from '@/store/tasks';
import { userStore } from '@/store/user';
import TaskShow from '@/components/TaskShow.vue';
import Datepicker from 'vue3-datepicker';

const newTask = ref({});
const calledFrom = ref('add');
const defineTask = {};
const picked = ref(new Date());
// let taskIdreturn = {};
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
function addWindow() {
  calledFrom.value = 'add'; // tells the windows where is called from
  newTask.value.complete = false;
  newTask.value.name = null;
  newTask.value.description = null;
}
async function modifyTaskBtn(selectModifier) {
  defineTask.name = newTask.value.name;
  defineTask.description = newTask.value.description;
  defineTask.complete = newTask.value.complete;
  defineTask.id = newTask.value.id;
  console.log(selectModifier);
  if (selectModifier === 'add') {
    defineTask.complete = false;
    try {
      await taskInfo.addTask(userInfo.currentUser.id, defineTask);
      refreshTask();
    } catch (e) {
      console.log(e);
    }
  } else if (selectModifier === 'edit') {
    defineTask.complete = newTask.value.complete;
    console.log(defineTask);
    try {
      await taskInfo.editTask(userInfo.currentUser.id, defineTask.id, defineTask);
      refreshTask();
    } catch (e) {
      console.log(e);
    }
  }
}

function refreshTaskBtn() {
  refreshTask();
}
function editTask(task) {
  // taskIdreturn = task.id;
  newTask.value.id = task.id;
  newTask.value.name = task.title;
  newTask.value.complete = task.is_complete;
  newTask.value.description = task.description;
  calledFrom.value = 'edit'; // tells the windows where is called from
}
async function removeTask(taskId) {
  try {
    await taskInfo.removeTask(userInfo.currentUser.id, taskId);
    refreshTask();
  } catch (e) {
    console.log(e);
  }
}

// refreshTask();//  on creation

// watch(taskList, (currentValue, oldValue) => {
//   console.log('watch');
//   console.log(currentValue);
//   console.log(oldValue);
// }, { deep: true });
</script>
