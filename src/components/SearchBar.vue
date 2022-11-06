<template>
  <div class></div>
  <div class="search">
    <div class="searchForm">
      <input
        type="text"
        placeholder="Find a user"
        value="username"
        @keyDown="handleKey"
        @change="change"
      />
    </div>
    <div v-if="user" class="userChat" @Click="handleSelect">
      <img src="{user.photoURL}" alt="" />
      <div class="userChatInfo">
        <span>{user.displayName}</span>
      </div>
    </div>
    )}
  </div>
</template>
<script setup>
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "../firebase";
import useStore from "../store/index";
const username = ref("");
const user = ref(null);

const change = (e) => username(e.target.value);
// console.log(change);
const { currentUser } = defineStore(useStore);

const handleSearch = async () => {
  const q = query(
    collection(db, "users"),
    where("displayName", "==", username)
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user(doc.data());
    });
  } catch (err) {
    err.value(true);
  }
};

const handleKey = (e) => {
  e.code === "Enter" && handleSearch();
};
// console.log(handleKey);
const handleSelect = async () => {
  //check whether the group(chats in firestore) exists, if not create
  const combinedId =
    currentUser.uid > user.value.uid
      ? currentUser.uid + user.value.uid
      : user.value.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.value.uid,
          displayName: user.value.displayName,
          photoURL: user.value.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.value.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (err) {
    err.value(true);
  }
  console.log(handleSelect);
  username("");
};
</script>
