<template>
  <div class="task-show">
    <h2>hola</h2>
    <h2>{{props.task.title}}</h2>
    <h3>{{props.task.description}}</h3>
    <h4>{{props.task.inserted_at}}</h4>
    <h2>{{props.task.is_complete}}</h2>
    <button>Edit</button>
    <button>X</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  task: Object,
});

</script>

<style>
</style>
