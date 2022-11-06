<script setup>
import { ChatContext } from "@/store/chat";
import { doc, onSnapshot } from "firebase/firestore";
import { ref, watch } from "vue";
import { db } from "../firebase";
import AuthContext from "../store/index.js";
const chats = ref([]);

const { currentUser } = AuthContext();
const { dispatch } = ChatContext();

watch(() => {
  const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      chats(doc.data());
    });

    return () => {
      unsub();
    };
  };

  currentUser.uid && getChats();
}, [currentUser.uid]);

const handleSelect = (u) => {
  dispatch({ type: "CHANGE_USER", payload: u });
};
// Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (){};
</script>
<template>
  <div class="chats">
    <div
      class="userChat"
      key="{chat[0]}"
      @click="handleSelect(chat[1].userInfo)"
    >
      <img src="{chat[1].userInfo.photoURL}" alt="" />
      <div class="userChatInfo">
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessage?.text}</p>
      </div>
    </div>
  </div>
</template>
