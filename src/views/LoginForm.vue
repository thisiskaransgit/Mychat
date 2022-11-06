<template>
  <div class="formContainer">
    <div class="formWrapper">
      <span class="logo">MY Chat</span>
      <span class="title">Login</span>
      <form @submit-capture="handleSubmit">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </form>
      <p>Don't have an account?</p>
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";
import { auth } from "../firebase";
const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  console.log(email);
  console.log(password);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/");
  } catch (error) {
    console.log(error.code);
    alert(error.message);
  }
};
</script>
<style lang="scss">
.formContainer {
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .formWrapper {
    background-color: white;
    padding: 20px 60px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    .logo {
      color: #5d5b8d;
      font-weight: bold;
      font-size: 24px;
    }

    .title {
      color: #5d5b8d;
      font-size: 12px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;

      input {
        padding: 15px;
        border: none;
        width: 250px;
        border-bottom: 1px solid #a7bcff;
        &::placeholder {
          color: rgb(175, 175, 175);
        }
      }

      button {
        background-color: #7b96ec;
        color: white;
        padding: 10px;
        font-weight: bold;
        border: none;
        cursor: pointer;
      }
    }
  }
  p {
    color: #5d5b8d;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
