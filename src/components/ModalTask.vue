<template>
<div class="modal fadein modal-active">
 <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header">
        <button type="button" @click="$emit('close')" class="close"><span >&times;</span></button>
    </div>
    <div class="modal-body">
        <label for="task-name">
        <input class="modal-title" v-model="newTask.name"
         type="text" id="task-name" placeholder="Add task Name" />
        </label>
        <label for="task-description">
        <textarea v-model="newTask.description" id="task-description" placeholder="Description...">
        </textarea>
        </label>
        <label v-show="calledFrom ==='edit' " for="complete">Complete?
        <input type="checkbox" id="complete" v-model="newTask.complete">
        </label>
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
const emit = defineEmits(['modifyTaskBtn', 'close']);

const editTask = (calledFrom, task) => {
  emit('modifyTaskBtn', task, calledFrom);
};

</script>

<style>
.modal-active{
display:block;
}
</style>
