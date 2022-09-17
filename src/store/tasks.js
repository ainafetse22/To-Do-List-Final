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
      const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId).order('id', { ascending: false });
      // console.log(`fetch ${data}`);
      if (data) currentTask.value = data;
      if (error) throw error;
    };
    const addTask = async (userId, taskInfo) => {
      const { error } = await supabase
        .from('tasks').insert([{
          user_id: userId,
          title: taskInfo.name,
          description: taskInfo.description,
          is_complete: taskInfo.complete,
        }]);
      if (error) throw error;
    };
    const removeTask = async (userId, taskId) => {
      const { error } = await supabase
        .from('tasks').delete().eq('user_id', userId).match({ id: taskId });
      if (error) throw error;
    };
    const editTask = async (userId, taskId, taskInfo) => {
      console.log('inside store');
      console.log(userId);
      console.log(taskId);
      console.log(taskInfo);
      const { error } = await supabase
        .from('tasks').update({
          title: taskInfo.name,
          description: taskInfo.description,
          is_complete: taskInfo.complete,
        })
        .match({ id: taskId });
      if (error) throw error;
    };
    return {
      currentTask,
      fetchTasks,
      addTask,
      removeTask,
      editTask,
    };
  },
);
