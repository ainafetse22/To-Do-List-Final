<template>
  <div tabindex="-1" class="overflow-y-auto
 overflow-x-hidden fixed z-50 h-full w-full inset-0">
    <div class="opacity-90 fixed bg-gray-500 w-full h-full"></div>
    <div class="relative modal-position p-4 w-3/4 max-w-2xl h-1/2">
      <!-- Modal content -->
      <div class="absolute w-full h-3/4 bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-around items-start p-4 rounded-t">
          <label for="task-name" class="flex w-full items-start">
            <input class="text-xl w-9/12 font-semibold text-gray-900
            dark:text-white" v-model="newTask.name" type="text"
             id="task-name" placeholder="Add task Name" />
          </label>
          <button type="button" @click="$emit('close')" class="close hover:bg-gray-200
           hover:text-gray-900"><span>&times;</span>
          </button>
        </div>
        <div class="flex flex-col p-4 space-y-6 border-t border-orange-500">
          <label for="task-description">
            <textarea class=" w-full" v-model="newTask.description"
            id="task-description" placeholder="Description...">
          </textarea>
          </label>
          <label for="dueDate">Due Date :
            <input id="dueDate" v-model="newTask.date" class="form-control" type="date">
          </label>
          <label for="dashboard">Dashboard :
            <input id="dashboard" v-model="newTask.dashboard" class="form-control" type="text">
          </label>
          <label v-show="calledFrom ==='edit' " for="complete">Complete?
            <input type="checkbox" id="complete" v-model="newTask.complete">
          </label>
        </div>
        <div class="flex items-center p-2 space-x-2 rounded-b border-t
     border-gray-200 dark:border-gray-600">
          <button stype="button" class="btn-ok" @click="editTask(calledFrom, newTask)">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  task: Object,
  calledFrom: String,
});
// eslint-disable-next-line vue/no-setup-props-destructure
const newTask = props.task;
// console.log(props.task.date);
const emit = defineEmits(['modifyTaskBtn', 'close']);

const editTask = (calledFrom, task) => {
  console.log(task);
  emit('modifyTaskBtn', task, calledFrom);
};

</script>

<style>
.modal-active {
  display: block;
}
</style>
