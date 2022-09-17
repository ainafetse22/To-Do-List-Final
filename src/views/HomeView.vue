<template>
  <div class="container d-flex align-content-center justify-content-center">
    <div class="col-12 ">
      <h1>Task</h1>
      <button @click="addWindow">ADD</button>
      <ModalTask  v-if="modalShow" @close="modalShow = false" @modifyTaskBtn="modifyTaskBtn"
      :task=newTask :calledFrom=calledFrom />
      <h2>Pending</h2>
      <div v-for="task in incompleteTask" :key="task.id">
        <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
      </div>
      <h2>Done</h2>
      <div v-for="task in completeTask" :key="task.id">
        <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, watch, reactive } from 'vue';
import {
  ref, reactive, toRaw, computed,
} from 'vue';
import { taskStore } from '@/store/tasks';
import { userStore } from '@/store/user';
import TaskShow from '@/components/TaskShow.vue';
import ModalTask from '@/components/ModalTask.vue';

const newTask = ref({});
const calledFrom = ref('add');
const defineTask = {};
const modalShow = ref(false);
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
refreshTask();
function addWindow() {
  console.log('ADD WINDOW ');
  modalShow.value = true;
  console.log(modalShow.value);
  calledFrom.value = 'add'; // tells the windows where is called from
  newTask.value.complete = false;
  newTask.value.name = null;
  newTask.value.description = null;
  newTask.value.date = null;
}
async function modifyTaskBtn(task, selectModifier) {
  defineTask.value = toRaw(task);
  if (selectModifier === 'add') {
    defineTask.value.complete = false;
    try {
      await taskInfo.addTask(userInfo.currentUser.id, defineTask.value);
      refreshTask();
    } catch (e) {
      console.log(e);
    }
  } else if (selectModifier === 'edit') {
    defineTask.value.complete = newTask.value.complete;
    try {
      await taskInfo.editTask(userInfo.currentUser.id, defineTask.value.id, defineTask.value);
      refreshTask();
    } catch (e) {
      console.log(e);
    }
  }
  modalShow.value = false;
}

function editTask(task) {
  // taskIdreturn = task.id;
  newTask.value.id = task.id;
  newTask.value.name = task.title;
  newTask.value.complete = task.is_complete;
  newTask.value.description = task.description;
  newTask.value.date = task.due_date;
  modalShow.value = true;
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
const incompleteTask = computed(() => {
  const taskArray = taskInfo.currentTask.filter((task) => task.is_complete === false);
  return taskArray;
});
const completeTask = computed(() => {
  const taskArray = taskInfo.currentTask.filter((task) => task.is_complete === true);
  return taskArray;
});
// refreshTask();//  on creation

// watch(taskList, (currentValue, oldValue) => {
//   console.log('watch');
//   console.log(currentValue);
//   console.log(oldValue);
// }, { deep: true });
</script>
