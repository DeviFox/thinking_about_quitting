<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {UsersDataResponse} from "@/models/users-data-response";

const users = ref<UsersDataResponse[]>([]);


onBeforeMount(() => {
  getUsers();
})

async function getUsers() {
  return fetch("https://thinking-about-quitting-backend.onrender.com/users").then((response) => {
    return response.json();
  }).then((data) => {
    users.value = data;
  })
}

async function clickBtn(id: number) {
  return fetch("https://thinking-about-quitting-backend.onrender.com/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id}),
  }).then((response) => {
    return response.json();
  }).then((data) => {
    users.value = users.value.map(u => (u.id === data.id ? data : u))
  })
}


function getDayPostfix(n: number): string {
  const abs = Math.abs(n) % 100;
  const lastDigit = abs % 10;

  if (abs > 10 && abs < 20) {
    return 'дней'
  }

  if (lastDigit === 1) {
    return 'день'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня'
  }

  return 'дней';
}

</script>

<template>
  <div class="layout">
    <h1 class="title">Без мыслей об увольнении</h1>
    <div class="users">
      <div class="users__list">
        <div class="user" v-for="user in users">
          <div class="user__days"> {{ user.daysCount + ' ' + getDayPostfix(user.daysCount) }}</div>
          <img class="user__img" src="./assets/chelik.png"/>
          <div class="user__name"> {{ user.name }}</div>
          <button class="user__button" @click="clickBtn(user.id)"> ЖМЯК</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  padding-top: 150px;
}

.title {
  text-align: center;
}

.users {
  padding-top: 50px;

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 16px;
  }
}

.user {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  &__days {
    font-size: 32px;
  }

  &__img {
    width: 100px;
    height: 100px;
  }

  &__name {
    font-size: 18px;
  }

  &__button {
    border-radius: 8px;
    border: none;
    padding: 5px 15px;
    background-color: steelblue;
  }
}
</style>
