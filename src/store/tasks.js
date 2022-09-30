// /store/task.js
import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

// eslint-disable-next-line import/prefer-default-export
export const taskStore = defineStore(
  'tasks',
  () => {
    const searchTask = reactive({});
    const currentTask = ref([]);
    const filterTask = ref([]);
    const Dashboards = ref([]);
    const setSearch = (value) => {
      searchTask.value = value;
    };
    const getSearch = () => searchTask;
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
    const fetchDashboards = async (userId) => {
      const { data, error } = await supabase.from('tasks').select('dashboard').eq('user_id', userId)
        .order('id', { ascending: false });
      if (error) throw error;
      if (data) {
        // eslint-disable-next-line max-len
        const dashboardList = ref([]);
        data.forEach((task) => {
          dashboardList.value.push(task.dashboard);
          return dashboardList;
        });
        Dashboards.value = [...new Set(dashboardList.value)];
      }
    };
    const addTask = async (userId, taskInfo) => {
      const { error } = await supabase
        .from('tasks').insert([{
          user_id: userId,
          title: taskInfo.name,
          description: taskInfo.description,
          is_complete: taskInfo.complete,
          due_date: taskInfo.date,
          dashboard: taskInfo.dashboard,
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
          dashboard: taskInfo.dashboard,
        })
        .match({ id: taskId });
      if (error) throw error;
    };
    return {
      setSearch,
      getSearch,
      searchTask,
      Dashboards,
      fetchDashboards,
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
