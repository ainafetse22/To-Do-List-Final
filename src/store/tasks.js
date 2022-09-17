// /store/task.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

// eslint-disable-next-line import/prefer-default-export
export const taskStore = defineStore(
  'tasks',
  () => {
    const currentTask = ref([]);
    const filterTask = ref([]);
    const fetchTasks = async (userId) => {
      const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId).order('id', { ascending: false });
      // console.log(`fetch ${data}`);
      if (data) currentTask.value = data;
      if (error) throw error;
    };
    const fetchTaskFilter = async (userId, filterBy, filterValue) => {
      const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId).eq(filterBy, filterValue)
        .order('id', { ascending: false });
      // console.log(`fetch ${data}`);
      if (data) filterTask.value = data;
      if (error) throw error;
    };
    const addTask = async (userId, taskInfo) => {
      const { error } = await supabase
        .from('tasks').insert([{
          user_id: userId,
          title: taskInfo.name,
          description: taskInfo.description,
          is_complete: taskInfo.complete,
          due_date: taskInfo.date,
        }]);
      if (error) throw error;
    };
    const removeTask = async (userId, taskId) => {
      const { error } = await supabase
        .from('tasks').delete().eq('user_id', userId).match({ id: taskId });
      if (error) throw error;
    };
    const editTask = async (userId, taskId, taskInfo) => {
      const { error } = await supabase
        .from('tasks').update({
          title: taskInfo.name,
          description: taskInfo.description,
          is_complete: taskInfo.complete,
          due_date: taskInfo.date,
        })
        .match({ id: taskId });
      if (error) throw error;
    };
    return {
      currentTask,
      filterTask,
      fetchTasks,
      addTask,
      removeTask,
      editTask,
      fetchTaskFilter,
    };
  },
);
