<template>
  <div>
    <label for="task-name">
      <input v-model="newTask.Name" type="text" id="task-name" placeholder="Add task Name" />
    </label>
    <label for="task-description">
      <textarea v-model="newTask.Description" id="task-description" placeholder="Description...">
      </textarea>
    </label>
  </div>
</template>

<script setup>
</script>

<style>

</style>
