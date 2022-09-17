<template>
<div class="modal fadein modal-active">
 <div class="modal-dialog modal-dialog-start modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header justify-content-between">
        <label for="task-name">
        <input class="modal-title" v-model="newTask.name"
         type="text" id="task-name" placeholder="Add task Name" />
        </label>
        <button type="button" @click="$emit('close')" class="close"><span >&times;</span></button>
    </div>
    <div class="modal-body">
        <label for="task-description">
        <textarea class="h-300" v-model="newTask.description"
        id="task-description" placeholder="Description...">
        </textarea>
        </label>
        <label v-show="calledFrom ==='edit' " for="complete">Complete?
        <input type="checkbox" id="complete" v-model="newTask.complete">
        </label>
        <label for="dueDate">
            <input id="dueDate" v-model="newTask.date" class="form-control" type="date">
        Date</label>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary"
         @click="editTask(calledFrom, newTask)">Ok</button>
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
.modal-active{
display:block;
}
</style>
