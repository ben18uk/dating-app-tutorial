<template>
  <section class="playground">
  <h1>{{title}}</h1>

  <battery-icon size="2x"></battery-icon>

  <ul>
    <li v-for="user of users">{{user.id}} - {{user.userName}}</li>
  </ul>
</section>
</template>

<script lang="ts">

import axios from 'axios';
import { defineComponent } from 'vue';
import { BatteryIcon } from '@zhuowenli/vue-feather-icons'

interface User {
    id: number,
    userName: string
}

export default defineComponent({
  name: 'playground',
  components: { BatteryIcon },
  props: [],
  data () {
    return {
      title: "Title",
      users: null as User[]
    }
  },
  mounted () {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get('https://localhost:5001/api/users')
        .then(response => (this.users = response.data))
        .catch(error => console.error(error))
    }
  }
  
})
</script>