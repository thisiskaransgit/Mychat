<template>
  <div class="navbar">
    <span class="logo">My Chat</span>
    <div class="user">
      <button @click="signOut(auth)">logout</button>
    </div>
  </div>
</template>

<script setup>
import { auth } from "@/firebase";
import { signOut } from "@firebase/auth";
</script>
