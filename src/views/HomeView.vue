<template>
    <div class="w-full grid grid-cols-4">
      <button class= "btn z-20 btn-orange btn-add btn-add-right" @click="addWindow"> + </button>
      <button data-collapse-toggle="navbar-default" type="button" class="relative inline-flex
           items-center col-span-1 ml-3 text-sm text-gray-500 rounded-lg lg:hidden
            hover:bg-gray-100 focus:outline-none
            focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only"></span>
            <svg @click="hideMenu" class="w-4 h-4 md:w-6 md:h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <div class="col-span-3 lg:col-start-2 lg:flex lg:flex-row ">
          <SearchBar v-show="userInfo.currentUser" @editTask="editTask"></SearchBar>
      </div>
      <div class="col-span-5 w-full flex flex-col items-center lg:flex-row">
          <div :class="menuState" class="lg:w-72
          lg:h-full lg:mt-10 w-3/4 mt-1 bg-cyan-800 text-start"
           id="navbar-default">
            <h3 class="text-white pl-2 underline">Dashboards</h3>
            <ul class="flex flex-col p-4 mt-4 h-200
              md:text-sm md:font-medium">
              <!-- class="text-white block px-4 py-2 text-sm" role="menuitem" tabindex="-1" -->
              <li  class="block py-2 pr-4 pl-3
              text-white md:bg-transparent lg:p-0 "
                @click="selectList('*')" @keyup="selectList(list)">
                All task</li>
              <li  class="block py-2 pr-4 pl-3 text-white lg:bg-transparent
                lg:p-0"
                v-for="list in listingDashboard" :key="list"
                @click="selectList(list)" @keyup="selectList(list)">
                {{ list }}
              </li>
            </ul>
          </div>
        <ModalTask  v-if="modalShow" @close="modalShow = false" @modifyTaskBtn="modifyTaskBtn"
        :task=newTask :calledFrom=calledFrom />
        <section class="w-3/4 flex flex-col lg:flex-row mx-6">
        <div class="flex flex-col mt-2 md:mt-6 items-center
        rounded-2xl w-full bg-gray-900 lg:w-1/2 mb-6 mr-3">
          <h2 class="text-white text-start ml-5 lg:mb-6 text-xl lg:text-3xl">PENDING TASK</h2>
          <div class="flex w-11/12 flex-col sm:mb-20 "
             v-for="task in incompleteTask" :key="task.id">
            <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
          </div>
        </div>
        <div class="flex flex-col items-center mt-2 md:mt-6
        rounded-2xl bg-gray-600 lg:w-1/2 mb-6 ml-3">
          <h2 class="text-white text-start ml-5 lg:mb-6 text-xl lg:text-3xl">DONE TASK</h2>
          <div class="flex w-11/12 flex-col sm:mb-20"
             v-for="task in completeTask" :key="task.id">
            <TaskShow :task="task"  @editTask="editTask" @removeTask="removeTask"></TaskShow>
          </div>
        </div>
      </section>
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
const menuState = ref('no-show');

// watch(taskInfo.searchTask, (currentValue, oldValue) => {
//   console.log('watch');
//   console.log(currentValue);
//   console.log(oldValue);
// }, { deep: true });

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
  modalShow.value = true;
  calledFrom.value = 'add'; // tells the windows where is called from
  newTask.value.complete = false;
  newTask.value.name = null;
  newTask.value.description = null;
  newTask.value.date = null;
  newTask.value.dashboard = null;
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
function hideMenu() {
  if (menuState.value === 'show-modal') {
    menuState.value = 'no-show';
  } else {
    menuState.value = 'show-modal';
  }
}

function editTask(task) {
  // taskIdreturn = task.id;
  newTask.value.id = task.id;
  newTask.value.name = task.title;
  newTask.value.complete = task.is_complete;
  newTask.value.description = task.description;
  newTask.value.date = task.due_date;
  newTask.value.dashboard = task.dashboard;
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
  hideMenu();
  filterDashboard.value = list;
}

const listingDashboard = computed(() => {
  refreshDashboards();
  return taskInfo.Dashboards;
});

// eslint-disable-next-line no-unused-vars
const search = computed(() => {
  console.log('computed');
  const task = taskInfo.getSearch;
  editTask(task);
  console.log(task);
  return null;
});
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
