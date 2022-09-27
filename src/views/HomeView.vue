<template>
    <div class="w-full container grid grid-cols-4 items-center ">
      <button class= "btn btn-orange btn-add btn-add-right" @click="addWindow"> + </button>
      <div class="col-span-1 h-full" >
        <div class="bg-lime-500 h-full mr-6">
          <SearchBar @editTask="editTask"></SearchBar>
          <h2>Dashboards</h2>
          <ul>
          <li @click="selectList('*')" @keyup="selectList(list)">
          All</li>
          <li v-for="list in taskInfo.Dashboards" :key="list"
              @click="selectList(list)" @keyup="selectList(list)">
              {{ list }}
          </li>
          </ul>
          <!-- <button class="btn" @click="">+</button> -->
        </div>

      </div>
      <div class="col-span-3 lg:flex lg:flex-row ">
        <ModalTask  v-if="modalShow" @close="modalShow = false" @modifyTaskBtn="modifyTaskBtn"
        :task=newTask :calledFrom=calledFrom />
        <div class="rounded-2xl bg-gray-900 mr-6 lg:w-1/2">
          <h2 class="text-white text-start ml-5 lg:mb-6 text-xl lg:text-3xl">PENDING TASK</h2>
          <div class="flex flex-col mb-20 "
             v-for="task in incompleteTask" :key="task.id">
            <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
          </div>
        </div>
        <div class="rounded-2xl bg-gray-600 text-xl mr-6 lg:text-3xl lg:w-1/2">
          <h2 class="text-white text-start ml-5 lg:mb-6 text-xl lg:text-3xl">DONE TASK</h2>
          <div class="flex flex-col mb-20 "
             v-for="task in completeTask" :key="task.id">
            <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
          </div>
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
import SearchBar from '@/components/SearchBar.vue';

const newTask = ref({});
const calledFrom = ref('add');
const defineTask = {};
const modalShow = ref(false);
const taskInfo = reactive(taskStore());
const userInfo = userStore();
const filterDashboard = ref('*');
async function refreshTask() {
  try {
    await taskInfo.fetchTasks(userInfo.currentUser.id);
  } catch (e) {
    console.log(e);
  }
}
async function refreshDashboards() {
  try {
    await taskInfo.fetchDashboards(userInfo.currentUser.id);
  } catch (e) {
    console.log(e);
  }
}
refreshTask();
refreshDashboards();
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
  console.log(task);
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
function selectList(list) {
  filterDashboard.value = list;
}
// async function filterTask(userId, filterBy, filterValue) {
//   try {
//     await taskInfo.fetchTaskFilter(userId, filterBy, filterValue);
//   } catch (e) {
//     console.log(e);
//   }
// }
// watch(taskList, (currentValue, oldValue) => {
//   console.log('watch');
//   console.log(currentValue);
//   console.log(oldValue);
// }, { deep: true });

const incompleteTask = computed(() => {
  let taskArray;
  if (filterDashboard.value === '*') {
    taskArray = taskInfo.currentTask.filter((task) => task.is_complete === false);
  } else {
    taskArray = taskInfo.currentTask.filter((task) => task.is_complete === false
  && task.dashboard === filterDashboard.value);
  }
  // filterTask(userInfo.currentUser.id, 'is_complete', 'false');
  // const taskBackend = taskInfo.filterTask;
  return taskArray;
});

const completeTask = computed(() => {
  let taskArray;
  if (filterDashboard.value === '*') {
    taskArray = taskInfo.currentTask.filter((task) => task.is_complete === true);
  } else {
    taskArray = taskInfo.currentTask.filter((task) => task.is_complete === true
   && task.dashboard === filterDashboard.value);
  }
  return taskArray;
});

// refreshTask();//  on creation

// watch(taskList, (currentValue, oldValue) => {
//   console.log('watch');
//   console.log(currentValue);
//   console.log(oldValue);
// }, { deep: true });
</script>
