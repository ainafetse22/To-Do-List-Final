<template>
  <div class="task-show">
    <h2>{{task.title}}</h2>
    <h3>{{task.description}}</h3>
    <h4>{{task.inserted_at}}</h4>
    <h2>{{task.is_complete}}</h2>
    <button @click="editTask">Edit</button>
    <button @click="removeTask">X</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  task: Object,
});

const emit = defineEmits(['editTask', 'removeTask']);

const editTask = () => {
  emit('editTask', props.task);
};

const removeTask = () => {
  emit('removeTask', props.task.id);
};
</script>

<style>
</style>
