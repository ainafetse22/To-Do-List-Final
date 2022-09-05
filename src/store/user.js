// /store/user.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

// eslint-disable-next-line import/prefer-default-export
export const userStore = defineStore(
  'user',
  () => {
    const currentUser = ref(null);
    const fetchUser = async () => {
      const user = await supabase.auth.user();
      currentUser.value = user;
    };
    const signUp = async (email, password) => {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) currentUser.value = user;
    };
    return {
      currentUser,
      fetchUser,
      signUp,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage,
        },
      ],
    },
  },
);

//   actions: {
//     async fetchUser() {
//       const fetchUser = await supabase.auth.user();
//       console.log(fetchUser);
//       this.user = fetchUser;
//     },
//     async signUp(email, password) {
//       const { userAssign, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
//       if (error) throw error;
//       if (userAssign) this.user = userAssign;
//     },
//   },
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         key: 'user',
//         storage: localStorage,
//       },
//     ],
//   },
// });
