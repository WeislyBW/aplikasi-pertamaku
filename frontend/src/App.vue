<script setup>
import { ref } from 'vue';
import CommentSection from './components/CommentSection.vue';

const userId = ref('');
const users = ref(null);
const newEmail = ref('');
const authToken = 'contoh-auth-token'; // contoh, perlu diganti dengan token yang valid

const getUser = async () => {
  const response = await fetch(`https://yourdomain.com/api/user/${userId.value}`, {
    headers: {
      Authorization: `Bearer ${authToken}`, // authorization header
    },
  });
  users.value = await response.json();
};

const changeEmail = async () => {
  await fetch('http://localhost:3000/api/change-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `email=${newEmail.value}`,
  });
};
</script>

<template>
  <div id="app">
    <h1>User Dashboard</h1>
    <div>
      <input v-model="userId" placeholder="Enter User ID" />
      <button @click="getUser">Get User Info</button>
    </div>
    <div v-if="users">
      <template v-for="user in users">
        <h2>{{ user.name }}</h2>
        <hr />
      </template>
    </div>
    <CommentSection />
    <form @submit.prevent="changeEmail">
      <h3>Change Email</h3>
      <input v-model="newEmail" placeholder="New Email" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
