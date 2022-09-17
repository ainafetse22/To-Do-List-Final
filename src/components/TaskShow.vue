<template>
  <article class="card h-100 mb-5">
    <div class="card-header d-flex justify-content-between">
      <h2 class="text-start">{{task.title}}</h2>
      <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
         aria-expanded="false"></button>
        <ul class="dropdown-menu text-end">
          <li><button class="no-style" @click="editTask">Edit</button></li>
          <li><button class="no-style" @click="removeTask">Remove</button></li>
        </ul>
      </div>
      </div>
    <div class="card-body">
      <h3>{{task.description}}</h3>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <h4>Created</h4>
      <h4>{{formatTime}}</h4>
      <h2>{{task.is_complete}}</h2>
      <h2>{{task.due_date}}</h2>
    </div>
  </article>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  task: Object,
});

const emit = defineEmits(['editTask', 'removeTask']);

const editTask = () => {
  emit('editTask', props.task);
};

const formatTime = computed(() => {
  const timeStamp = props.task.inserted_at.split('T');
  const date = timeStamp[0];
  return date;
});

const removeTask = () => {
  emit('removeTask', props.task.id);
};
</script>

<style>
.no-style {
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
}
</style>
