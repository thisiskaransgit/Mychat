<template>
    <h1>
        Register
    </h1>
    <p><input type="text"  placeholder="Email" v-model="email"/></p>
    <p><input type="text"  placeholder="Password" v-model="password"/></p>
    <p><input type="text"  placeholder="Email" v-model="email"/></p>
    <p><button @click="register">Submit</button></p>
</template>

<script setup>
import {  ref } from " vue"
import {getAuth, createUserWithEmailAndPassword}from "firebase/auth"
import { useRouter } from "vue-router"
const email = ref("");
const register = () =>{
createUserWithEmailAndPassword(getAuth(),email.value, password.value) 
    .then((data) =>{
        console.log("Successfully registered! ");
        router.push('/Home')
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    });
};

const signinWithGoogle = () =>{

}

</script>