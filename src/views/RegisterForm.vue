<template>
  <div class="formContainer">
    <div class="formWrapper">
      <span class="logo">MY Chat</span>
      <span class="title">Register</span>
      <form @submit-capture="handleSubmit">
        <input type="text" placeholder="display name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input style="display: none" type="file" id="file" />
        <label for="file">
          <img src="../assets/camera.png" alt="img" />
          <span>Add an image</span>
        </label>
        <button>Sign up</button>
      </form>
      <p>
        You already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import router from "@/router";

const handleSubmit = async (e) => {
  e.preventDefault();
  const displayName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const file = e.target[3].files[0];
  console.log(displayName);
  console.log(email);
  console.log(password);
  console.log(file);
  try {
    //Create user
    const res = await createUserWithEmailAndPassword(auth, email, password);

    //Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          // create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          // create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          router.push("/");
        } catch (error) {
          console.log(error.code);
          alert(error.message);
        }
      });
    });
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

      label {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #8da4f1;
        font-size: 12px;
        cursor: pointer;

        img {
          width: 32px;
        }
      }
    }
    p {
      color: #5d5b8d;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
