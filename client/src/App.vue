<template>
  <div>
    <Navbar></Navbar>

    <Login></Login> 
    <Home></Home>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Navbar from './components/Navbar.vue'
import { User } from './models/user-model';
import { accountService } from './services/account.service';


export default defineComponent({
  name: 'App',
  components: {
    Login,
    Home,
    Navbar
  },
  data () {
    return {

    }
  },
  mounted () {
    this.setCurrentUser();
  },
  methods: {
    setCurrentUser() {
      let userstring = localStorage.getItem('user');

      if (userstring !== null) {
        let user: User = JSON.parse(userstring);
        accountService.setCurrentUser(user);
      }
    },
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f0f0f0;
}
</style>