// /store/user.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import supabase from '../supabase/index';

// eslint-disable-next-line import/prefer-default-export
export const userStore = defineStore(
  'user',
  () => {
    const router = useRouter();
    const currentUser = ref(null);
    const setUser = (user) => {
      if (user) {
        currentUser.value = user;
        router.push({ path: '/' });
      } else {
        currentUser.value = null;
        router.push({ path: '/auth' });
      }
    };
    const fetchUser = async () => {
      const user = await supabase.auth.user();
      // if (error) throw error;
      setUser(user);
    };
    const signUp = async (email, password) => {
      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) setUser(user);
    };
    const LogInEmail = async (email, password) => {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      if (user) setUser(user);
    };
    const LogOut = async () => {
      console.log('estoy en logout');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else setUser(null);
    };
    return {
      currentUser,
      fetchUser,
      signUp,
      LogInEmail,
      LogOut,
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
