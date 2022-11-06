import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const AuthContext = defineStore();

export const AuthContextProvider = ({ children }) => {
  const currentUser = ref({});

  watchEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      currentUser.value(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
