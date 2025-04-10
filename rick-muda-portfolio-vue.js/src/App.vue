<script setup>
import { reactive, ref } from 'vue'

const counter = reactive({ count: 0 })
const message = ref('Hello World!')
const title = ref('title')
const count =  ref(0)
const text = ref('')
const verynice = ref(false)

function toggle() {
  verynice.value = !verynice.value
}
</script>

<template>
  <h1 :class="title">{{ message }}</h1>
  <p>Count is: {{ counter.count }}</p>
  <button @click="counter.count++">UP</button>
  <button @click="counter.count--">DOWN</button>
  <input v-model="text" placeholder="Type here">
    <p>{{ text }}</p>
  <button @click="toggle">Toggle</button>
  <h1 v-if="verynice">69</h1>
  <h1 v-else>68 or 70</h1>
</template>

<style>
.title {
  color: red;
  font-family: 'Times New Roman', Times, serif;
}
</style>