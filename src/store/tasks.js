// /store/task.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

// eslint-disable-next-line import/prefer-default-export
export const taskStore = defineStore(
  'tasks',
  () => {
    const currentTask = ref([]);
    //   {
    //     tasks: null,
    //  },
    const fetchTasks = async () => {
      const { data: tasks } = await supabase.from('tasks').select('*').order('id', { ascending: false });
      if (tasks) currentTask.value = tasks;
    };
    return {
      currentTask,
      fetchTasks,
    };
  },
);
