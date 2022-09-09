<template>
  <div class="home">
    <h1>Task</h1>
    <button @click="addWindow">+</button>
    <label for="task-name">
      <input v-model="newTask.Name" type="text" id="task-name" placeholder="Add task Name" />
    </label>
    <label for="task-description">
      <textarea v-model="newTask.Description" id="task-description" placeholder="Description...">
      </textarea>
    </label>
    <label for="checkbox">{{ checked }}
      <input type="checkbox" id="complete" v-model="checked">
    </label>
    <button @click="modifyTaskButton(calledFrom)">Ok modify</button>
    <button @click="refreshTaskButton">Refresh</button>
    <div v-for="task in taskInfo.currentTask" :key="task.id">
      <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
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
const calledFrom = ref('add');
const defineTask = {};
let taskIdreturn = {};
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
}
async function modifyTaskButton(selectModifier) {
  defineTask.Name = newTask.value.Name;
  defineTask.Description = newTask.value.Description;
  console.log(selectModifier);
  if (selectModifier === 'add') {
    defineTask.Complete = false;
    try {
      await taskInfo.addTask(userInfo.currentUser.id, defineTask);
      refreshTask();
    } catch (e) {
      console.log(e);
    }
  } else if (selectModifier === 'edit') {
    console.log('from edit');
    defineTask.Complete = newTask.value.Complete;
    console.log(defineTask);
    try {
      await taskInfo.editTask(userInfo.currentUser.id, taskIdreturn, defineTask);
      refreshTask();
    } catch (e) {
      console.log(e);
    }
  }
}

function refreshTaskButton() {
  refreshTask();
}
function editTask(taskId) {
  taskIdreturn = taskId;
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
