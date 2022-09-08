// /store/task.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

// eslint-disable-next-line import/prefer-default-export
export const taskStore = defineStore(
  'tasks',
  () => {
    const currentTask = ref([]);
    const fetchTasks = async (userId) => {
      const { data, error } = await supabase.from('tasks').select('*').filter('user_id', 'in', userId).order('id', { ascending: false });
      // console.log(`fetch ${data}`);
      if (data) currentTask.value = data;
      if (error) throw error;
    };
    const addTask = async (userId, title, description) => {
      const { error } = await supabase
        .from('tasks').insert([{
          user_id: userId,
          title,
          description,
          // is_complete: isComplete,
        }]);
      if (error) throw error;
    };
    return {
      currentTask,
      fetchTasks,
      addTask,
    };
  },
);
