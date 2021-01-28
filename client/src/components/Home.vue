<template>
  <div class="min-h-screen text-black text-xl flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    
    <div v-if="!registerMode" class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1>Find your match</h1>
        <p class="lead">Come on in to view your matches... all you need to do is sign up!</p>
        <div class="text-center mt-5">
          <button @click="toggleRegisterMode" class="group relative mb-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
          <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 btn-lg">Learn more</button>
        </div>
      </div>
    </div>

    <div v-if="registerMode" class="max-w-md w-full space-y-8">
      <div class="text-center">
        <Register @cancelRegister="toggleRegisterMode()"></Register>
      </div>
    </div>

    
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import Register from "./Register.vue";

export default defineComponent({
  name: 'home',
  components: { 
    Register
  },
  props: [],
  data () {
    return {
      registerMode: false
    }
  },
  mounted () {

  },
  methods: {
    toggleRegisterMode(){this.registerMode = !this.registerMode}
  }
})
</script>